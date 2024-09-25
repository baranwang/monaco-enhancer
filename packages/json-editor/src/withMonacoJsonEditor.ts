import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type { EditorInitializerFunc, JsonEditorComponentFactory, JsonEditorProps, Monaco } from './types';

export function withMonacoJsonEditor<T>(func: JsonEditorComponentFactory<T>) {
  return ({
    schemaUri,
    schemaValidation = 'ignore',
    // @ts-expect-error
    schemaContent,
    // @ts-expect-error
    schemaRequestService,
    tabSize,
    ...editorProps
  }: JsonEditorProps<T>) => {
    const [monaco, setMonaco] = useState<Monaco | null>(null);
    const [model, setModel] = useState<editor.ITextModel | null>(null);
    const [schema, setSchema] = useState<any>(schemaContent);

    const initializeEditor = useCallback<EditorInitializerFunc>((monacoInterface, editorModel) => {
      setMonaco(monacoInterface);
      setModel(editorModel);
    }, []);

    useEffect(() => {
      if (!schemaUri) {
        setSchema(null);
        return;
      }

      const loadSchema = async () => {
        if (schemaUri.startsWith('http://') || schemaUri.startsWith('https://')) {
          try {
            if (schemaRequestService) {
              const jsonSchema = await schemaRequestService(schemaUri);
              setSchema(jsonSchema);
            } else {
              const response = await fetch(schemaUri);
              const jsonSchema = await response.json();
              setSchema(jsonSchema);
            }
          } catch (error) {
            console.error('[monaco-json-enhancer] Error loading JSON schema:', error);
            setSchema(null);
          }
        } else if (schemaUri.startsWith('zod://') && schemaContent) {
          setSchema(zodToJsonSchema(schemaContent));
        } else if (schemaUri.startsWith('json-schema://') && schemaContent) {
          setSchema(schemaContent);
        } else {
          setSchema(null);
        }
      };

      loadSchema();
    }, [schemaUri, schemaContent, schemaRequestService]);

    useEffect(() => {
      model?.updateOptions({ tabSize });
    }, [model, tabSize]);

    useEffect(() => {
      if (monaco && model) {
        monaco.editor.setModelLanguage(model, 'json');
      }
    }, [monaco, model]);

    useEffect(() => {
      if (!monaco || !model || !schemaUri || !schema) {
        return;
      }
      const modelUri = model.uri.toString();
      const { diagnosticsOptions } = monaco.languages.json.jsonDefaults;
      const schemas = diagnosticsOptions.schemas || [];

      const schemaIndex = schemas.findIndex((item) => item.uri === schemaUri);
      if (schemaIndex !== -1) {
        const schemaContent = schemas[schemaIndex];
        schemas[schemaIndex] = { ...schemaContent, fileMatch: [...(schemaContent.fileMatch ?? []), modelUri], schema };
      } else {
        schemas.push({
          uri: schemaUri,
          fileMatch: [modelUri],
          schema,
        });
      }
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        ...diagnosticsOptions,
        validate: true,
        schemas,
        schemaValidation,
      });
    }, [monaco, model, schemaUri, schema, schemaValidation]);

    return func(initializeEditor, editorProps as T);
  };
}
