import { withJsonEditor, withMonacoJsonEditor } from '@monaco-editor-enhancer/json-editor';
import { Editor, type EditorProps } from '@monaco-editor/react';
import { z } from 'zod';

// const JsonEditor = withMonacoJsonEditor<EditorProps>((setInterface, props) => (
//   <Editor
//     {...props}
//     onMount={(editor, monaco) => {
//       setInterface(monaco, editor.getModel());
//       props.onMount?.(editor, monaco);
//     }}
//   />
// ));

const JsonEditor = withJsonEditor(Editor, 'onMount');

const App = () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
  });
  return <JsonEditor height={320} schemaUri="zod://user" schemaContent={schema} />;
};

export default App;
