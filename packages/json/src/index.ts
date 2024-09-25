import type { editor } from 'monaco-editor';
import type * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { useCallback, useEffect, useState } from 'react';
import type { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export type Monaco = typeof monacoEditor;

type EditorProps<T> = Omit<T, 'language'>;

type HttpSchemaUri = `http://${string}` | `https://${string}`;
type JsonSchemaUri = `json-schema://${string}`;
type ZodSchemaUri = `zod://${string}`;
type SchemaUriType = HttpSchemaUri | JsonSchemaUri | ZodSchemaUri;

type BaseJsonEditorProps<T> = {
  schemaValidation?: 'error' | 'warning' | 'ignore';
  tabSize?: number;
} & EditorProps<T>;

type HttpJsonEditorProps<T> = BaseJsonEditorProps<T> & {
  schemaUri: HttpSchemaUri;
  schemaRequestService?: (uri: string) => Promise<any>;
};

type JsonSchemaEditorProps<T> = BaseJsonEditorProps<T> & {
  schemaUri: JsonSchemaUri;
  schemaContent: any;
};

type ZodJsonEditorProps<T> = BaseJsonEditorProps<T> & {
  schemaUri: ZodSchemaUri;
  schemaContent: z.ZodType<any>;
};

export type JsonEditorProps<T> = HttpJsonEditorProps<T> | JsonSchemaEditorProps<T> | ZodJsonEditorProps<T>;

export type EditorInitializerFunc = (monaco: Monaco, model: editor.ITextModel | null) => void;

export type JsonEditorComponentFactory<T> = (
  initEditor: EditorInitializerFunc,
  props: EditorProps<T>,
) => React.ReactNode;

export function withMonacoJsonEditor<T>(func: JsonEditorComponentFactory<T>) {
  return (props: JsonEditorProps<T>) => {
    const {
      schemaUri,
      schemaValidation = 'ignore',
      tabSize,
      ...editorProps
    } = props;
    const [monaco, setMonaco] = useState<Monaco | null>(null);
    const [model, setModel] = useState<editor.ITextModel | null>(null);
    const [schema, setSchema] = useState<any>('schemaContent' in props ? props.schemaContent : null);

    const initializeEditor = useCallback<EditorInitializerFunc>((monacoInterface, editorModel) => {
      setMonaco(monacoInterface);
      setModel(editorModel);
    }, []);

    useEffect(() => {
      if (!schemaUri) {
        return;
      }

      const loadSchema = async () => {
        if (schemaUri.startsWith('http://') || schemaUri.startsWith('https://')) {
          try {
            if ('schemaRequestService' in props && props.schemaRequestService) {
              const jsonSchema = props.schemaRequestService(schemaUri);
              setSchema(jsonSchema);
            } else {
              const response = await fetch(schemaUri);
              const jsonSchema = await response.json();
              setSchema(jsonSchema);
            }
          } catch (error) {
            console.error('[monaco-json-enhancer] Error loading JSON schema:', error);
          }
        } else if (schemaUri.startsWith('zod://') && 'schemaContent' in props) {
          setSchema(zodToJsonSchema(props.schemaContent));
        } else if (schemaUri.startsWith('json-schema://') && 'schemaContent' in props) {
          setSchema(props.schemaContent);
        }
      };

      loadSchema();
    }, [schemaUri, props]);

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

export default withMonacoJsonEditor;
