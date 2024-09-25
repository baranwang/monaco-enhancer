import { withMonacoJsonEditor } from '@monaco-editor-enhancer/json-editor';
import MonacoEditor, { type MonacoEditorProps } from 'react-monaco-editor';

const JsonEditor = withMonacoJsonEditor<MonacoEditorProps>((setInterface, props) => (
  <MonacoEditor
    {...props}
    editorDidMount={(editor, monaco) => {
      setInterface(monaco, editor.getModel());
      props.editorDidMount?.(editor, monaco);
    }}
  />
));

const App = () => {
  const schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
    },
  };
  return <JsonEditor height={320} schemaUri="json-schema://user" schemaContent={schema} />;
};

export default App;
