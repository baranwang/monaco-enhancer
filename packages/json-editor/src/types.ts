import type { editor } from 'monaco-editor';
import type * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import type { z } from 'zod';

export type CoreEditorProps<T> = Omit<T, 'language'>;

type HttpSchemaUri = `http://${string}` | `https://${string}`;
type JsonSchemaUri = `json-schema://${string}`;
type ZodSchemaUri = `zod://${string}`;

type BaseJsonEditorProps<T> = {
  schemaValidation?: 'error' | 'warning' | 'ignore';
  tabSize?: number;
} & CoreEditorProps<T>;

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
  props: CoreEditorProps<T>,
) => React.ReactNode;


export type Monaco = typeof monacoEditor;

export type MountFunc = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: Monaco) => void;
