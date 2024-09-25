# @monaco-editor-enhancer/json-editor

Enhance your Monaco Editor with advanced JSON schema support, including Zod schema integration.

## Features

- Seamless integration with Monaco Editor
- Support for remote JSON schemas (HTTP/HTTPS)
- Integration with Zod schemas
- Custom JSON schema support
- Flexible schema validation options

## Installation

```bash
npm add @monaco-editor-enhancer/json-editor
pnpm add @monaco-editor-enhancer/json-editor
yarn add @monaco-editor-enhancer/json-editor
bun add @monaco-editor-enhancer/json-editor
```

## Usage

### Basic Usage

```tsx
import { Editor, type EditorProps } from '@monaco-editor/react';
import { withMonacoJsonEditor } from '@monaco-editor-enhancer/json-editor';
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

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const App = () => {
  return <JsonEditor height={320} schemaUri='zod://myschema' schemaContent={schema} />;
};
```

### API

The `withMonacoJsonEditor` HOC accepts a component factory function and returns a new component with enhanced JSON editing capabilities. The resulting component accepts the following props:

- `schemaUri`: A string specifying the type and location of the schema. Can be one of:
  - `http://` or `https://`: For remote JSON schemas
  - `json-schema://`: For local JSON schemas
  - `zod://`: For Zod schemas
- `schemaContent`: The actual schema content (for Zod and local JSON schemas)
- `schemaRequestService`: (Optional) A custom function to fetch remote schemas
- `schemaValidation`: (Optional) Validation mode: 'error', 'warning', or 'ignore'
- `tabSize`: (Optional) The size of a tab in spaces

All other props are passed through to the underlying Monaco Editor component.

### Schema Types

1. Remote JSON Schema:

   ```typescript
   <JsonEditor schemaUri='https://example.com/schema.json' schemaValidation='error' />
   ```

2. Local JSON Schema:

   ```typescript
   const mySchema = {
     type: 'object',
     properties: {
       name: { type: 'string' },
       age: { type: 'number' },
     },
   };

   <JsonEditor schemaUri='json-schema://myschema' schemaContent={mySchema} />;
   ```

3. Zod Schema:

   ```typescript
   import { z } from 'zod';

   const zodSchema = z.object({
     name: z.string(),
     age: z.number(),
   });

   <JsonEditor schemaUri='zod://myschema' schemaContent={zodSchema} />;
   ```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
