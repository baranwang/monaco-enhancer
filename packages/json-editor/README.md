# @monaco-editor-enhancer/json-editor

[![NPM Version](https://img.shields.io/npm/v/@monaco-editor-enhancer/json-editor)](https://npmjs.com/package/@monaco-editor-enhancer/json-editor)
[![NPM Downloads](https://img.shields.io/npm/dm/@monaco-editor-enhancer/json-editor)](https://npmcharts.com/compare/@monaco-editor-enhancer/json-editor?minimal=true)
![NPM License](https://img.shields.io/npm/l/@monaco-editor-enhancer/json-editor)

Enhance your Monaco Editor with advanced JSON schema support, including Zod schema integration.

## Features

- Seamless integration with Monaco Editor
- Support for remote JSON schemas (HTTP/HTTPS)
- Integration with Zod schemas
- Custom JSON schema support
- Flexible schema validation options
- Easy-to-use Higher-Order Components (HOCs) for quick integration

## Installation

```bash
npm add @monaco-editor-enhancer/json-editor
pnpm add @monaco-editor-enhancer/json-editor
yarn add @monaco-editor-enhancer/json-editor
bun add @monaco-editor-enhancer/json-editor
```

## Usage

### Basic Usage with `withJsonEditor`

```tsx
import { Editor } from '@monaco-editor/react';
import { withJsonEditor } from '@monaco-editor-enhancer/json-editor';
import { z } from 'zod';

const JsonEditor = withJsonEditor(Editor, 'onMount');

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const App = () => {
  return <JsonEditor height={320} schemaUri='zod://user' schemaContent={schema} />;
};
```

### Advanced Usage with `withMonacoJsonEditor`

```tsx
import { Editor, type EditorProps } from '@monaco-editor/react';
import { withMonacoJsonEditor } from '@monaco-editor-enhancer/json-editor';
import { z } from 'zod';

const JsonEditor = withMonacoJsonEditor<EditorProps>((initEditor, props) => (
  <Editor
    {...props}
    onMount={(editor, monaco) => {
      initEditor(monaco, editor.getModel());
      props.onMount?.(editor, monaco);
    }}
  />
));

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const App = () => {
  return <JsonEditor height={320} schemaUri='zod://user' schemaContent={schema} />;
};
```

### API

The library provides two main HOCs:

1. `withJsonEditor`: A simplified HOC for quick integration.
2. `withMonacoJsonEditor`: A more flexible HOC for advanced use cases.

Both HOCs create components that accept the following props:

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
