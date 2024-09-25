import { Editor, type EditorProps } from '@monaco-editor/react';
import { withMonacoJsonEditor } from 'monaco-json-enhancer';
import { z } from 'zod';

const JsonEditor = withMonacoJsonEditor<EditorProps>((setInterface, props) => (
  <Editor
    {...props}
    onMount={(editor, monaco) => {
      setInterface(monaco, editor.getModel());
      props.onMount?.(editor, monaco);
    }}
  />
));

const App = () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
  });
  return <JsonEditor height={320} schemaUri="zod://user" schemaContent={schema} />;
};

export default App;
