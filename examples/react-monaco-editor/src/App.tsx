import { withMonacoJsonEditor } from 'monaco-json-enhancer';
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
    allowTrailingCommas: true,
    allOf: [
      {
        $ref: '#/definitions/compilerOptionsDefinition',
      },
      {
        $ref: '#/definitions/compileOnSaveDefinition',
      },
      {
        $ref: '#/definitions/typeAcquisitionDefinition',
      },
      {
        $ref: '#/definitions/extendsDefinition',
      },
      {
        $ref: '#/definitions/watchOptionsDefinition',
      },
      {
        $ref: '#/definitions/buildOptionsDefinition',
      },
      {
        $ref: '#/definitions/tsNodeDefinition',
      },
      {
        anyOf: [
          {
            $ref: '#/definitions/filesDefinition',
          },
          {
            $ref: '#/definitions/excludeDefinition',
          },
          {
            $ref: '#/definitions/includeDefinition',
          },
          {
            $ref: '#/definitions/referencesDefinition',
          },
        ],
      },
    ],
    definitions: {
      '//': {
        explainer: 'https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#overview',
        reference: 'https://www.typescriptlang.org/tsconfig',
        'reference metadata':
          'https://github.com/microsoft/TypeScript-Website/blob/v2/packages/tsconfig-reference/scripts/tsconfigRules.ts',
      },
      filesDefinition: {
        properties: {
          files: {
            $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
            description:
              "If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. When a 'files' property is specified, only those files and those specified by 'include' are included.",
            type: ['array', 'null'],
            uniqueItems: true,
            items: {
              type: ['string', 'null'],
            },
          },
        },
      },
      excludeDefinition: {
        properties: {
          exclude: {
            $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
            description:
              "Specifies a list of files to be excluded from compilation. The 'exclude' property only affects the files included via the 'include' property and not the 'files' property. Glob patterns require TypeScript version 2.0 or later.",
            type: ['array', 'null'],
            uniqueItems: true,
            items: {
              type: ['string', 'null'],
            },
          },
        },
      },
      includeDefinition: {
        properties: {
          include: {
            $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
            description:
              "Specifies a list of glob patterns that match files to be included in compilation. If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. Requires TypeScript version 2.0 or later.",
            type: ['array', 'null'],
            uniqueItems: true,
            items: {
              type: ['string', 'null'],
            },
          },
        },
      },
      compileOnSaveDefinition: {
        properties: {
          compileOnSave: {
            description: 'Enable Compile-on-Save for this project.',
            type: ['boolean', 'null'],
          },
        },
      },
      extendsDefinition: {
        properties: {
          extends: {
            description:
              'Path to base configuration file to inherit from (requires TypeScript version 2.1 or later), or array of base files, with the rightmost files having the greater priority (requires TypeScript version 5.0 or later).',
            oneOf: [
              {
                default: '',
                type: 'string',
              },
              {
                default: [],
                items: {
                  type: 'string',
                },
                type: 'array',
              },
            ],
          },
        },
      },
      buildOptionsDefinition: {
        properties: {
          buildOptions: {
            properties: {
              dry: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: '~',
                type: ['boolean', 'null'],
                default: false,
              },
              force: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Build all projects, including those that appear to be up to date',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Build all projects, including those that appear to be up to date\n\nSee more: https://www.typescriptlang.org/tsconfig#force',
              },
              verbose: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable verbose logging',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Enable verbose logging\n\nSee more: https://www.typescriptlang.org/tsconfig#verbose',
              },
              incremental: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Save .tsbuildinfo files to allow for incremental compilation of projects.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Save .tsbuildinfo files to allow for incremental compilation of projects.\n\nSee more: https://www.typescriptlang.org/tsconfig#incremental',
              },
              assumeChangesOnlyAffectDirectDependencies: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.\n\nSee more: https://www.typescriptlang.org/tsconfig#assumeChangesOnlyAffectDirectDependencies',
              },
              traceResolution: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Log paths used during the `moduleResolution` process.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Log paths used during the `moduleResolution` process.\n\nSee more: https://www.typescriptlang.org/tsconfig#traceResolution',
              },
            },
          },
        },
      },
      watchOptionsDefinition: {
        properties: {
          watchOptions: {
            $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
            type: ['object', 'null'],
            description: 'Settings for the watch mode in TypeScript.',
            properties: {
              force: {
                description: '~',
                type: ['string', 'null'],
              },
              watchFile: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify how the TypeScript watch mode works.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify how the TypeScript watch mode works.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchFile',
              },
              watchDirectory: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify how directories are watched on systems that lack recursive file-watching functionality.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify how directories are watched on systems that lack recursive file-watching functionality.\n\nSee more: https://www.typescriptlang.org/tsconfig#watchDirectory',
              },
              fallbackPolling: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify what approach the watcher should use if the system runs out of native file watchers.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify what approach the watcher should use if the system runs out of native file watchers.\n\nSee more: https://www.typescriptlang.org/tsconfig#fallbackPolling',
              },
              synchronousWatchDirectory: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.\n\nSee more: https://www.typescriptlang.org/tsconfig#synchronousWatchDirectory',
              },
              excludeFiles: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Remove a list of files from the watch mode's processing.",
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
                markdownDescription:
                  "Remove a list of files from the watch mode's processing.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeFiles",
              },
              excludeDirectories: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Remove a list of directories from the watch process.',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
                markdownDescription:
                  'Remove a list of directories from the watch process.\n\nSee more: https://www.typescriptlang.org/tsconfig#excludeDirectories',
              },
            },
          },
        },
      },
      compilerOptionsDefinition: {
        properties: {
          compilerOptions: {
            $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
            type: ['object', 'null'],
            description: 'Instructs the TypeScript compiler how to compile .ts files.',
            properties: {
              allowArbitraryExtensions: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable importing files with any extension, provided a declaration file is present.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Enable importing files with any extension, provided a declaration file is present.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions',
              },
              allowImportingTsExtensions: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.",
                type: ['boolean', 'null'],
                markdownDescription:
                  "Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowImportingTsExtensions",
              },
              charset: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'No longer supported. In early versions, manually set the text encoding for reading files.',
                type: ['string', 'null'],
                markdownDescription:
                  'No longer supported. In early versions, manually set the text encoding for reading files.\n\nSee more: https://www.typescriptlang.org/tsconfig#charset',
              },
              composite: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable constraints that allow a TypeScript project to be used with project references.',
                type: ['boolean', 'null'],
                default: true,
                markdownDescription:
                  'Enable constraints that allow a TypeScript project to be used with project references.\n\nSee more: https://www.typescriptlang.org/tsconfig#composite',
              },
              customConditions: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Conditions to set in addition to the resolver-specific defaults when resolving imports.',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
                markdownDescription:
                  'Conditions to set in addition to the resolver-specific defaults when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#customConditions',
              },
              declaration: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Generate .d.ts files from TypeScript and JavaScript files in your project.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Generate .d.ts files from TypeScript and JavaScript files in your project.\n\nSee more: https://www.typescriptlang.org/tsconfig#declaration',
              },
              declarationDir: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify the output directory for generated declaration files.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify the output directory for generated declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationDir',
              },
              diagnostics: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Output compiler performance information after building.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Output compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#diagnostics',
              },
              disableReferencedProjectLoad: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Reduce the number of projects loaded automatically by TypeScript.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Reduce the number of projects loaded automatically by TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableReferencedProjectLoad',
              },
              noPropertyAccessFromIndexSignature: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enforces using indexed accessors for keys declared using an indexed type',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Enforces using indexed accessors for keys declared using an indexed type\n\nSee more: https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature',
              },
              emitBOM: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitBOM',
              },
              emitDeclarationOnly: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Only output d.ts files and not JavaScript files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Only output d.ts files and not JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDeclarationOnly',
              },
              exactOptionalPropertyTypes: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Differentiate between undefined and not present when type checking',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Differentiate between undefined and not present when type checking\n\nSee more: https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes',
              },
              incremental: {
                description: 'Enable incremental compilation. Requires TypeScript version 3.4 or later.',
                type: ['boolean', 'null'],
              },
              tsBuildInfoFile: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify the folder for .tsbuildinfo incremental compilation files.',
                default: '.tsbuildinfo',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify the folder for .tsbuildinfo incremental compilation files.\n\nSee more: https://www.typescriptlang.org/tsconfig#tsBuildInfoFile',
              },
              inlineSourceMap: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Include sourcemap files inside the emitted JavaScript.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Include sourcemap files inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSourceMap',
              },
              inlineSources: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Include source code in the sourcemaps inside the emitted JavaScript.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Include source code in the sourcemaps inside the emitted JavaScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#inlineSources',
              },
              jsx: {
                description: 'Specify what JSX code is generated.',
                enum: ['preserve', 'react', 'react-jsx', 'react-jsxdev', 'react-native'],
              },
              reactNamespace: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.',
                type: ['string', 'null'],
                default: 'React',
                markdownDescription:
                  'Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.\n\nSee more: https://www.typescriptlang.org/tsconfig#reactNamespace',
              },
              jsxFactory: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'",
                type: ['string', 'null'],
                default: 'React.createElement',
                markdownDescription:
                  "Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFactory",
              },
              jsxFragmentFactory: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.",
                type: ['string', 'null'],
                default: 'React.Fragment',
                markdownDescription:
                  "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxFragmentFactory",
              },
              jsxImportSource: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.',
                type: ['string', 'null'],
                default: 'react',
                markdownDescription:
                  'Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx`.\n\nSee more: https://www.typescriptlang.org/tsconfig#jsxImportSource',
              },
              listFiles: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Print all of the files read during the compilation.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Print all of the files read during the compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listFiles',
              },
              mapRoot: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify the location where debugger should locate map files instead of generated locations.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify the location where debugger should locate map files instead of generated locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#mapRoot',
              },
              module: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify what module code is generated.',
                type: ['string', 'null'],
                anyOf: [
                  {
                    enum: [
                      'CommonJS',
                      'AMD',
                      'System',
                      'UMD',
                      'ES6',
                      'ES2015',
                      'ES2020',
                      'ESNext',
                      'None',
                      'ES2022',
                      'Node16',
                      'NodeNext',
                      'Preserve',
                    ],
                  },
                  {
                    pattern:
                      '^([Cc][Oo][Mm][Mm][Oo][Nn][Jj][Ss]|[AaUu][Mm][Dd]|[Ss][Yy][Ss][Tt][Ee][Mm]|[Ee][Ss]([356]|20(1[567]|2[02])|[Nn][Ee][Xx][Tt])|[Nn][Oo][dD][Ee]16|[Nn][Oo][Dd][Ee][Nn][Ee][Xx][Tt]|[Nn][Oo][Nn][Ee]|[Pp][Rr][Ee][Ss][Ee][Rr][Vv][Ee])$',
                  },
                ],
                markdownDescription:
                  'Specify what module code is generated.\n\nSee more: https://www.typescriptlang.org/tsconfig#module',
              },
              moduleResolution: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify how TypeScript looks up a file from a given module specifier.',
                type: ['string', 'null'],
                anyOf: [
                  {
                    enum: ['Classic', 'Node', 'Node10', 'Node16', 'NodeNext', 'Bundler'],
                    markdownEnumDescriptions: [
                      'It’s recommended to use `"Node16"` instead',
                      'Deprecated, use `"Node10"` in TypeScript 5.0+ instead',
                      'It’s recommended to use `"Node16"` instead',
                      'This is the recommended setting for libraries and Node.js applications',
                      'This is the recommended setting for libraries and Node.js applications',
                      'This is the recommended setting in TypeScript 5.0+ for applications that use a bundler',
                    ],
                  },
                  {
                    pattern: '^(([Nn]ode)|([Nn]ode1[06])|([Nn]ode[Nn]ext)|([Cc]lassic)|([Bb]undler))$',
                  },
                ],
                markdownDescription:
                  'Specify how TypeScript looks up a file from a given module specifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#moduleResolution',
              },
              newLine: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Set the newline character for emitting files.',
                type: ['string', 'null'],
                anyOf: [
                  {
                    enum: ['crlf', 'lf'],
                  },
                  {
                    pattern: '^(CRLF|LF|crlf|lf)$',
                  },
                ],
                markdownDescription:
                  'Set the newline character for emitting files.\n\nSee more: https://www.typescriptlang.org/tsconfig#newLine',
              },
              noEmit: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable emitting file from a compilation.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable emitting file from a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmit',
              },
              noEmitHelpers: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable generating custom helper functions like `__extends` in compiled output.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable generating custom helper functions like `__extends` in compiled output.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitHelpers',
              },
              noEmitOnError: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable emitting files if any type checking errors are reported.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable emitting files if any type checking errors are reported.\n\nSee more: https://www.typescriptlang.org/tsconfig#noEmitOnError',
              },
              noImplicitAny: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable error reporting for expressions and declarations with an implied `any` type..',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Enable error reporting for expressions and declarations with an implied `any` type..\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitAny',
              },
              noImplicitThis: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable error reporting when `this` is given the type `any`.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Enable error reporting when `this` is given the type `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitThis',
              },
              noUnusedLocals: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Enable error reporting when a local variable isn't read.",
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  "Enable error reporting when a local variable isn't read.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedLocals",
              },
              noUnusedParameters: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Raise an error when a function parameter isn't read",
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  "Raise an error when a function parameter isn't read\n\nSee more: https://www.typescriptlang.org/tsconfig#noUnusedParameters",
              },
              noLib: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable including any library files, including the default lib.d.ts.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable including any library files, including the default lib.d.ts.\n\nSee more: https://www.typescriptlang.org/tsconfig#noLib',
              },
              noResolve: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project.\n\nSee more: https://www.typescriptlang.org/tsconfig#noResolve',
              },
              noStrictGenericChecks: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable strict checking of generic signatures in function types.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable strict checking of generic signatures in function types.\n\nSee more: https://www.typescriptlang.org/tsconfig#noStrictGenericChecks',
              },
              skipDefaultLibCheck: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Skip type checking .d.ts files that are included with TypeScript.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Skip type checking .d.ts files that are included with TypeScript.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipDefaultLibCheck',
              },
              skipLibCheck: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Skip type checking all .d.ts files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Skip type checking all .d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#skipLibCheck',
              },
              outFile: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.\n\nSee more: https://www.typescriptlang.org/tsconfig#outFile',
              },
              outDir: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify an output folder for all emitted files.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify an output folder for all emitted files.\n\nSee more: https://www.typescriptlang.org/tsconfig#outDir',
              },
              preserveConstEnums: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable erasing `const enum` declarations in generated code.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable erasing `const enum` declarations in generated code.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveConstEnums',
              },
              preserveSymlinks: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable resolving symlinks to their realpath. This correlates to the same flag in node.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable resolving symlinks to their realpath. This correlates to the same flag in node.\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveSymlinks',
              },
              preserveValueImports: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Preserve unused imported values in the JavaScript output that would otherwise be removed',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Preserve unused imported values in the JavaScript output that would otherwise be removed\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveValueImports',
              },
              preserveWatchOutput: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable wiping the console in watch mode',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Disable wiping the console in watch mode\n\nSee more: https://www.typescriptlang.org/tsconfig#preserveWatchOutput',
              },
              pretty: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable color and formatting in output to make compiler errors easier to read',
                type: ['boolean', 'null'],
                default: true,
                markdownDescription:
                  'Enable color and formatting in output to make compiler errors easier to read\n\nSee more: https://www.typescriptlang.org/tsconfig#pretty',
              },
              removeComments: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable emitting comments.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable emitting comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#removeComments',
              },
              rootDir: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify the root folder within your source files.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify the root folder within your source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDir',
              },
              isolatedModules: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Ensure that each file can be safely transpiled without relying on other imports.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Ensure that each file can be safely transpiled without relying on other imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedModules',
              },
              sourceMap: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Create source map files for emitted JavaScript files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Create source map files for emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceMap',
              },
              sourceRoot: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify the root path for debuggers to find the reference source code.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify the root path for debuggers to find the reference source code.\n\nSee more: https://www.typescriptlang.org/tsconfig#sourceRoot',
              },
              suppressExcessPropertyErrors: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable reporting of excess property errors during the creation of object literals.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable reporting of excess property errors during the creation of object literals.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressExcessPropertyErrors',
              },
              suppressImplicitAnyIndexErrors: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Suppress `noImplicitAny` errors when indexing objects that lack index signatures.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Suppress `noImplicitAny` errors when indexing objects that lack index signatures.\n\nSee more: https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors',
              },
              stripInternal: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable emitting declarations that have `@internal` in their JSDoc comments.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Disable emitting declarations that have `@internal` in their JSDoc comments.\n\nSee more: https://www.typescriptlang.org/tsconfig#stripInternal',
              },
              target: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Set the JavaScript language version for emitted JavaScript and include compatible library declarations.',
                type: ['string', 'null'],
                default: 'ES3',
                anyOf: [
                  {
                    enum: [
                      'ES3',
                      'ES5',
                      'ES6',
                      'ES2015',
                      'ES2016',
                      'ES2017',
                      'ES2018',
                      'ES2019',
                      'ES2020',
                      'ES2021',
                      'ES2022',
                      'ES2023',
                      'ESNext',
                    ],
                  },
                  {
                    pattern: '^([Ee][Ss]([356]|(20(1[56789]|2[0123]))|[Nn][Ee][Xx][Tt]))$',
                  },
                ],
                markdownDescription:
                  'Set the JavaScript language version for emitted JavaScript and include compatible library declarations.\n\nSee more: https://www.typescriptlang.org/tsconfig#target',
              },
              useUnknownInCatchVariables: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Default catch clause variables as `unknown` instead of `any`.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Default catch clause variables as `unknown` instead of `any`.\n\nSee more: https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables',
              },
              watch: {
                description: 'Watch input files.',
                type: ['boolean', 'null'],
              },
              fallbackPolling: {
                description:
                  "Specify the polling strategy to use when the system runs out of or doesn't support native file watchers. Requires TypeScript version 3.8 or later.",
                enum: [
                  'fixedPollingInterval',
                  'priorityPollingInterval',
                  'dynamicPriorityPolling',
                  'fixedInterval',
                  'priorityInterval',
                  'dynamicPriority',
                  'fixedChunkSize',
                ],
              },
              watchDirectory: {
                description:
                  'Specify the strategy for watching directories under systems that lack recursive file-watching functionality. Requires TypeScript version 3.8 or later.',
                enum: ['useFsEvents', 'fixedPollingInterval', 'dynamicPriorityPolling', 'fixedChunkSizePolling'],
                default: 'useFsEvents',
              },
              watchFile: {
                description:
                  'Specify the strategy for watching individual files. Requires TypeScript version 3.8 or later.',
                enum: [
                  'fixedPollingInterval',
                  'priorityPollingInterval',
                  'dynamicPriorityPolling',
                  'useFsEvents',
                  'useFsEventsOnParentDirectory',
                  'fixedChunkSizePolling',
                ],
                default: 'useFsEvents',
              },
              experimentalDecorators: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable experimental support for TC39 stage 2 draft decorators.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Enable experimental support for TC39 stage 2 draft decorators.\n\nSee more: https://www.typescriptlang.org/tsconfig#experimentalDecorators',
              },
              emitDecoratorMetadata: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Emit design-type metadata for decorated declarations in source files.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Emit design-type metadata for decorated declarations in source files.\n\nSee more: https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata',
              },
              allowUnusedLabels: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable error reporting for unused labels.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Disable error reporting for unused labels.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnusedLabels',
              },
              noImplicitReturns: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable error reporting for codepaths that do not explicitly return in a function.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Enable error reporting for codepaths that do not explicitly return in a function.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitReturns',
              },
              noUncheckedIndexedAccess: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Add `undefined` to a type when accessed using an index.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Add `undefined` to a type when accessed using an index.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess',
              },
              noFallthroughCasesInSwitch: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable error reporting for fallthrough cases in switch statements.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Enable error reporting for fallthrough cases in switch statements.\n\nSee more: https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch',
              },
              noImplicitOverride: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Ensure overriding members in derived classes are marked with an override modifier.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Ensure overriding members in derived classes are marked with an override modifier.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitOverride',
              },
              allowUnreachableCode: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable error reporting for unreachable code.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Disable error reporting for unreachable code.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUnreachableCode',
              },
              forceConsistentCasingInFileNames: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Ensure that casing is correct in imports.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Ensure that casing is correct in imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames',
              },
              generateCpuProfile: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Emit a v8 CPU profile of the compiler run for debugging.',
                type: ['string', 'null'],
                default: 'profile.cpuprofile',
                markdownDescription:
                  'Emit a v8 CPU profile of the compiler run for debugging.\n\nSee more: https://www.typescriptlang.org/tsconfig#generateCpuProfile',
              },
              baseUrl: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify the base directory to resolve non-relative module names.',
                type: ['string', 'null'],
                markdownDescription:
                  'Specify the base directory to resolve non-relative module names.\n\nSee more: https://www.typescriptlang.org/tsconfig#baseUrl',
              },
              paths: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify a set of entries that re-map imports to additional lookup locations.',
                type: ['object', 'null'],
                additionalProperties: {
                  $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                  type: ['array', 'null'],
                  uniqueItems: true,
                  items: {
                    $comment:
                      "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                    type: ['string', 'null'],
                    description: 'Path mapping to be computed relative to baseUrl option.',
                  },
                },
                markdownDescription:
                  'Specify a set of entries that re-map imports to additional lookup locations.\n\nSee more: https://www.typescriptlang.org/tsconfig#paths',
              },
              plugins: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify a list of language service plugins to include.',
                type: ['array', 'null'],
                items: {
                  $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                  type: ['object', 'null'],
                  properties: {
                    name: {
                      description: 'Plugin name.',
                      type: ['string', 'null'],
                    },
                  },
                },
                markdownDescription:
                  'Specify a list of language service plugins to include.\n\nSee more: https://www.typescriptlang.org/tsconfig#plugins',
              },
              rootDirs: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Allow multiple folders to be treated as one when resolving modules.',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
                markdownDescription:
                  'Allow multiple folders to be treated as one when resolving modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#rootDirs',
              },
              typeRoots: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify multiple folders that act like `./node_modules/@types`.',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
                markdownDescription:
                  'Specify multiple folders that act like `./node_modules/@types`.\n\nSee more: https://www.typescriptlang.org/tsconfig#typeRoots',
              },
              types: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Specify type package names to be included without being referenced in a source file.',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
                markdownDescription:
                  'Specify type package names to be included without being referenced in a source file.\n\nSee more: https://www.typescriptlang.org/tsconfig#types',
              },
              traceResolution: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable tracing of the name resolution process. Requires TypeScript version 2.0 or later.',
                type: ['boolean', 'null'],
                default: false,
              },
              allowJs: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowJs',
              },
              noErrorTruncation: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable truncating types in error messages.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable truncating types in error messages.\n\nSee more: https://www.typescriptlang.org/tsconfig#noErrorTruncation',
              },
              allowSyntheticDefaultImports: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Allow 'import x from y' when a module doesn't have a default export.",
                type: ['boolean', 'null'],
                markdownDescription:
                  "Allow 'import x from y' when a module doesn't have a default export.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports",
              },
              noImplicitUseStrict: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Disable adding 'use strict' directives in emitted JavaScript files.",
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  "Disable adding 'use strict' directives in emitted JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#noImplicitUseStrict",
              },
              listEmittedFiles: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Print the names of emitted files after a compilation.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Print the names of emitted files after a compilation.\n\nSee more: https://www.typescriptlang.org/tsconfig#listEmittedFiles',
              },
              disableSizeLimit: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSizeLimit',
              },
              lib: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify a set of bundled library declaration files that describe the target runtime environment.',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                  type: ['string', 'null'],
                  anyOf: [
                    {
                      enum: [
                        'ES5',
                        'ES6',
                        'ES2015',
                        'ES2015.Collection',
                        'ES2015.Core',
                        'ES2015.Generator',
                        'ES2015.Iterable',
                        'ES2015.Promise',
                        'ES2015.Proxy',
                        'ES2015.Reflect',
                        'ES2015.Symbol.WellKnown',
                        'ES2015.Symbol',
                        'ES2016',
                        'ES2016.Array.Include',
                        'ES2017',
                        'ES2017.Intl',
                        'ES2017.Object',
                        'ES2017.SharedMemory',
                        'ES2017.String',
                        'ES2017.TypedArrays',
                        'ES2018',
                        'ES2018.AsyncGenerator',
                        'ES2018.AsyncIterable',
                        'ES2018.Intl',
                        'ES2018.Promise',
                        'ES2018.Regexp',
                        'ES2019',
                        'ES2019.Array',
                        'ES2019.Intl',
                        'ES2019.Object',
                        'ES2019.String',
                        'ES2019.Symbol',
                        'ES2020',
                        'ES2020.BigInt',
                        'ES2020.Promise',
                        'ES2020.String',
                        'ES2020.Symbol.WellKnown',
                        'ESNext',
                        'ESNext.Array',
                        'ESNext.AsyncIterable',
                        'ESNext.BigInt',
                        'ESNext.Collection',
                        'ESNext.Intl',
                        'ESNext.Object',
                        'ESNext.Promise',
                        'ESNext.Regexp',
                        'ESNext.String',
                        'ESNext.Symbol',
                        'DOM',
                        'DOM.AsyncIterable',
                        'DOM.Iterable',
                        'ScriptHost',
                        'WebWorker',
                        'WebWorker.AsyncIterable',
                        'WebWorker.ImportScripts',
                        'Webworker.Iterable',
                        'ES7',
                        'ES2021',
                        'ES2020.SharedMemory',
                        'ES2020.Intl',
                        'ES2020.Date',
                        'ES2020.Number',
                        'ES2021.Promise',
                        'ES2021.String',
                        'ES2021.WeakRef',
                        'ESNext.WeakRef',
                        'ES2021.Intl',
                        'ES2022',
                        'ES2022.Array',
                        'ES2022.Error',
                        'ES2022.Intl',
                        'ES2022.Object',
                        'ES2022.String',
                        'ES2022.SharedMemory',
                        'ES2022.RegExp',
                        'ES2023',
                        'ES2023.Array',
                        'Decorators',
                        'Decorators.Legacy',
                        'ES2017.Date',
                        'ES2023.Collection',
                        'ESNext.Decorators',
                        'ESNext.Disposable',
                      ],
                    },
                    {
                      pattern: '^[Ee][Ss]5|[Ee][Ss]6|[Ee][Ss]7$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss]2015(\\.([Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Cc][Oo][Rr][Ee]|[Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Pp][Rr][Oo][Xx][Yy]|[Rr][Ee][Ff][Ll][Ee][Cc][Tt]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$',
                    },
                    {
                      pattern: '^[Ee][Ss]2016(\\.[Aa][Rr][Rr][Aa][Yy]\\.[Ii][Nn][Cc][Ll][Uu][Dd][Ee])?$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss]2017(\\.([Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Tt][Yy][Pp][Ee][Dd][Aa][Rr][Rr][Aa][Yy][Ss]|[Dd][Aa][Tt][Ee]))?$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss]2018(\\.([Aa][Ss][Yy][Nn][Cc][Gg][Ee][Nn][Ee][Rr][Aa][Tt][Oo][Rr]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss]2019(\\.([Aa][Rr][Rr][Aa][Yy]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]))?$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss]2020(\\.([Bb][Ii][Gg][Ii][Nn][Tt]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]\\.[Ww][Ee][Ll][Ll][Kk][Nn][Oo][Ww][Nn]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Ii][Nn][Tt][Ll]|[Dd][Aa][Tt][Ee]|[Nn][Uu][Mm][Bb][Ee][Rr]))?$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss]2021(\\.([Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]))?$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss]2022(\\.([Aa][Rr][Rr][Aa][Yy]|[Ee][Rr][Rr][Oo][Rr]|[Ii][Nn][Tt][Ll]|[Oo][Bb][Jj][Ee][Cc][Tt]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Hh][Aa][Rr][Ee][Dd][Mm][Ee][Mm][Oo][Rr][Yy]|[Rr][Ee][Gg][Ee][Xx][Pp]))?$',
                    },
                    {
                      pattern: '^[Ee][Ss]2023(\\.([Aa][Rr][Rr][Aa][Yy]|[Cc][Oo][Ll][Ll][Ee][Cc][Tt][Ii][Oo][Nn]))?$',
                    },
                    {
                      pattern:
                        '^[Ee][Ss][Nn][Ee][Xx][Tt](\\.([Aa][Rr][Rr][Aa][Yy]|[Aa][Ss][Yy][Nn][Cc][Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]|[Bb][Ii][Gg][Ii][Nn][Tt]|[Ii][Nn][Tt][Ll]|[Pp][Rr][Oo][Mm][Ii][Ss][Ee]|[Ss][Tt][Rr][Ii][Nn][Gg]|[Ss][Yy][Mm][Bb][Oo][Ll]|[Ww][Ee][Aa][Kk][Rr][Ee][Ff]|[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss]|[Dd][Ii][Ss][Pp][Oo][Ss][Aa][Bb][Ll][Ee]))?$',
                    },
                    {
                      pattern: '^[Dd][Oo][Mm](\\.([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee])?$',
                    },
                    {
                      pattern: '^[Ss][Cc][Rr][Ii][Pp][Tt][Hh][Oo][Ss][Tt]$',
                    },
                    {
                      pattern:
                        '^[Ww][Ee][Bb][Ww][Oo][Rr][Kk][Ee][Rr](\\.([Ii][Mm][Pp][Oo][Rr][Tt][Ss][Cc][Rr][Ii][Pp][Tt][Ss]|([Aa][Ss][Yy][Nn][Cc])?[Ii][Tt][Ee][Rr][Aa][Bb][Ll][Ee]))?$',
                    },
                    {
                      pattern: '^[Dd][Ee][Cc][Oo][Rr][Aa][Tt][Oo][Rr][Ss](\\.([Ll][Ee][Gg][Aa][Cc][Yy]))?$',
                    },
                  ],
                },
                markdownDescription:
                  'Specify a set of bundled library declaration files that describe the target runtime environment.\n\nSee more: https://www.typescriptlang.org/tsconfig#lib',
              },
              moduleDetection: {
                description: 'Specify how TypeScript determine a file as module.',
                enum: ['auto', 'legacy', 'force'],
              },
              strictNullChecks: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'When type checking, take into account `null` and `undefined`.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'When type checking, take into account `null` and `undefined`.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictNullChecks',
              },
              maxNodeModuleJsDepth: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.',
                type: ['number', 'null'],
                default: 0,
                markdownDescription:
                  'Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.\n\nSee more: https://www.typescriptlang.org/tsconfig#maxNodeModuleJsDepth',
              },
              importHelpers: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Allow importing helper functions from tslib once per project, instead of including them per-file.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Allow importing helper functions from tslib once per project, instead of including them per-file.\n\nSee more: https://www.typescriptlang.org/tsconfig#importHelpers',
              },
              importsNotUsedAsValues: {
                description: 'Specify emit/checking behavior for imports that are only used for types.',
                default: 'remove',
                enum: ['remove', 'preserve', 'error'],
              },
              alwaysStrict: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Ensure 'use strict' is always emitted.",
                type: ['boolean', 'null'],
                markdownDescription:
                  "Ensure 'use strict' is always emitted.\n\nSee more: https://www.typescriptlang.org/tsconfig#alwaysStrict",
              },
              strict: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable all strict type checking options.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Enable all strict type checking options.\n\nSee more: https://www.typescriptlang.org/tsconfig#strict',
              },
              strictBindCallApply: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Check that the arguments for `bind`, `call`, and `apply` methods match the original function.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Check that the arguments for `bind`, `call`, and `apply` methods match the original function.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBindCallApply',
              },
              downlevelIteration: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Emit more compliant, but verbose and less performant JavaScript for iteration.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Emit more compliant, but verbose and less performant JavaScript for iteration.\n\nSee more: https://www.typescriptlang.org/tsconfig#downlevelIteration',
              },
              checkJs: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable error reporting in type-checked JavaScript files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Enable error reporting in type-checked JavaScript files.\n\nSee more: https://www.typescriptlang.org/tsconfig#checkJs',
              },
              strictFunctionTypes: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'When assigning functions, check to ensure parameters and the return values are subtype-compatible.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'When assigning functions, check to ensure parameters and the return values are subtype-compatible.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictFunctionTypes',
              },
              strictPropertyInitialization: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Check for class properties that are declared but not set in the constructor.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Check for class properties that are declared but not set in the constructor.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictPropertyInitialization',
              },
              esModuleInterop: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.\n\nSee more: https://www.typescriptlang.org/tsconfig#esModuleInterop',
              },
              allowUmdGlobalAccess: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Allow accessing UMD globals from modules.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Allow accessing UMD globals from modules.\n\nSee more: https://www.typescriptlang.org/tsconfig#allowUmdGlobalAccess',
              },
              keyofStringsOnly: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Make keyof only return strings instead of string, numbers or symbols. Legacy option.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Make keyof only return strings instead of string, numbers or symbols. Legacy option.\n\nSee more: https://www.typescriptlang.org/tsconfig#keyofStringsOnly',
              },
              useDefineForClassFields: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Emit ECMAScript-standard-compliant class fields.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Emit ECMAScript-standard-compliant class fields.\n\nSee more: https://www.typescriptlang.org/tsconfig#useDefineForClassFields',
              },
              declarationMap: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Create sourcemaps for d.ts files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Create sourcemaps for d.ts files.\n\nSee more: https://www.typescriptlang.org/tsconfig#declarationMap',
              },
              resolveJsonModule: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable importing .json files',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Enable importing .json files\n\nSee more: https://www.typescriptlang.org/tsconfig#resolveJsonModule',
              },
              resolvePackageJsonExports: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Use the package.json 'exports' field when resolving package imports.",
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  "Use the package.json 'exports' field when resolving package imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonExports",
              },
              resolvePackageJsonImports: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: "Use the package.json 'imports' field when resolving imports.",
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  "Use the package.json 'imports' field when resolving imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#resolvePackageJsonImports",
              },
              assumeChangesOnlyAffectDirectDependencies: {
                description:
                  "Have recompiles in '--incremental' and '--watch' assume that changes within a file will only affect files directly depending on it. Requires TypeScript version 3.8 or later.",
                type: ['boolean', 'null'],
              },
              extendedDiagnostics: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Output more detailed compiler performance information after building.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Output more detailed compiler performance information after building.\n\nSee more: https://www.typescriptlang.org/tsconfig#extendedDiagnostics',
              },
              listFilesOnly: {
                description: 'Print names of files that are part of the compilation and then stop processing.',
                type: ['boolean', 'null'],
              },
              disableSourceOfProjectReferenceRedirect: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Disable preferring source files instead of declaration files when referencing composite projects',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Disable preferring source files instead of declaration files when referencing composite projects\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSourceOfProjectReferenceRedirect',
              },
              disableSolutionSearching: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Opt a project out of multi-project reference checking when editing.',
                type: ['boolean', 'null'],
                markdownDescription:
                  'Opt a project out of multi-project reference checking when editing.\n\nSee more: https://www.typescriptlang.org/tsconfig#disableSolutionSearching',
              },
              verbatimModuleSyntax: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.",
                type: ['boolean', 'null'],
                markdownDescription:
                  "Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.\n\nSee more: https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax",
              },
              noCheck: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Disable full type checking (only critical parse and emit errors will be reported)',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Disable full type checking (only critical parse and emit errors will be reported)\n\nSee more: https://www.typescriptlang.org/tsconfig#noCheck',
              },
              isolatedDeclarations: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Require sufficient annotation on exports so other tools can trivially generate declaration files.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Require sufficient annotation on exports so other tools can trivially generate declaration files.\n\nSee more: https://www.typescriptlang.org/tsconfig#isolatedDeclarations',
              },
              noUncheckedSideEffectImports: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Check side effect imports.',
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  'Check side effect imports.\n\nSee more: https://www.typescriptlang.org/tsconfig#noUncheckedSideEffectImports',
              },
              strictBuiltinIteratorReturn: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.",
                type: ['boolean', 'null'],
                default: false,
                markdownDescription:
                  "Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'.\n\nSee more: https://www.typescriptlang.org/tsconfig#strictBuiltinIteratorReturn",
              },
            },
          },
        },
      },
      typeAcquisitionDefinition: {
        properties: {
          typeAcquisition: {
            $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
            type: ['object', 'null'],
            description:
              'Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later.',
            properties: {
              enable: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description: 'Enable auto type acquisition',
                type: ['boolean', 'null'],
                default: false,
              },
              include: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specifies a list of type declarations to be included in auto type acquisition. Ex. ["jquery", "lodash"]',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
              },
              exclude: {
                $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                description:
                  'Specifies a list of type declarations to be excluded from auto type acquisition. Ex. ["jquery", "lodash"]',
                type: ['array', 'null'],
                uniqueItems: true,
                items: {
                  type: ['string', 'null'],
                },
              },
            },
          },
        },
      },
      referencesDefinition: {
        properties: {
          references: {
            $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
            type: ['array', 'null'],
            uniqueItems: true,
            description: 'Referenced projects. Requires TypeScript version 3.0 or later.',
            items: {
              $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
              type: ['object', 'null'],
              description: 'Project reference.',
              properties: {
                path: {
                  $comment: "The value of 'null' is UNDOCUMENTED (https://github.com/microsoft/TypeScript/pull/18058).",
                  type: ['string', 'null'],
                  description: 'Path to referenced tsconfig or to folder containing tsconfig.',
                },
              },
            },
          },
        },
      },
      tsNodeModuleTypes: {
        type: ['object', 'null'],
      },
      tsNodeDefinition: {
        properties: {
          'ts-node': {
            description:
              'ts-node options.  See also: https://typestrong.org/ts-node/docs/configuration\n\nts-node offers TypeScript execution and REPL for node.js, with source map support.',
            properties: {
              compiler: {
                default: 'typescript',
                description: 'Specify a custom TypeScript compiler.',
                type: ['string', 'null'],
              },
              compilerHost: {
                default: false,
                description: "Use TypeScript's compiler host API instead of the language service API.",
                type: ['boolean', 'null'],
              },
              compilerOptions: {
                additionalProperties: true,
                allOf: [
                  {
                    $ref: '#/definitions/compilerOptionsDefinition/properties/compilerOptions',
                  },
                ],
                description: 'JSON object to merge with TypeScript `compilerOptions`.',
                properties: {},
                type: ['object', 'null'],
              },
              emit: {
                default: false,
                description: 'Emit output files into `.ts-node` directory.',
                type: ['boolean', 'null'],
              },
              esm: {
                description:
                  'Enable native ESM support.\n\nFor details, see https://typestrong.org/ts-node/docs/imports#native-ecmascript-modules',
                type: ['boolean', 'null'],
              },
              experimentalReplAwait: {
                description:
                  "Allows the usage of top level await in REPL.\n\nUses node's implementation which accomplishes this with an AST syntax transformation.\n\nEnabled by default when tsconfig target is es2018 or above. Set to false to disable.\n\n**Note**: setting to `true` when tsconfig target is too low will throw an Error.  Leave as `undefined`\nto get default, automatic behavior.",
                type: ['boolean', 'null'],
              },
              experimentalResolver: {
                description:
                  'Enable experimental features that re-map imports and require calls to support:\n`baseUrl`, `paths`, `rootDirs`, `.js` to `.ts` file extension mappings,\n`outDir` to `rootDir` mappings for composite projects and monorepos.\n\nFor details, see https://github.com/TypeStrong/ts-node/issues/1514',
                type: ['boolean', 'null'],
              },
              experimentalSpecifierResolution: {
                description:
                  "Like node's `--experimental-specifier-resolution`, , but can also be set in your `tsconfig.json` for convenience.\n\nFor details, see https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#customizing-esm-specifier-resolution-algorithm",
                enum: ['explicit', 'node'],
                type: ['string', 'null'],
              },
              files: {
                default: false,
                description:
                  'Load "files" and "include" from `tsconfig.json` on startup.\n\nDefault is to override `tsconfig.json` "files" and "include" to only include the entrypoint script.',
                type: ['boolean', 'null'],
              },
              ignore: {
                default: ['(?:^|/)node_modules/'],
                description:
                  'Paths which should not be compiled.\n\nEach string in the array is converted to a regular expression via `new RegExp()` and tested against source paths prior to compilation.\n\nSource paths are normalized to posix-style separators, relative to the directory containing `tsconfig.json` or to cwd if no `tsconfig.json` is loaded.\n\nDefault is to ignore all node_modules subdirectories.',
                items: {
                  type: ['string', 'null'],
                },
                type: ['array', 'null'],
              },
              ignoreDiagnostics: {
                description: 'Ignore TypeScript warnings by diagnostic code.',
                items: {
                  type: ['string', 'number'],
                },
                type: ['array', 'null'],
              },
              logError: {
                default: false,
                description: 'Logs TypeScript errors to stderr instead of throwing exceptions.',
                type: ['boolean', 'null'],
              },
              moduleTypes: {
                $ref: '#/definitions/tsNodeModuleTypes',
                description:
                  'Override certain paths to be compiled and executed as CommonJS or ECMAScript modules.\nWhen overridden, the tsconfig "module" and package.json "type" fields are overridden, and\nthe file extension is ignored.\nThis is useful if you cannot use .mts, .cts, .mjs, or .cjs file extensions;\nit achieves the same effect.\n\nEach key is a glob pattern following the same rules as tsconfig\'s "include" array.\nWhen multiple patterns match the same file, the last pattern takes precedence.\n\n`cjs` overrides matches files to compile and execute as CommonJS.\n`esm` overrides matches files to compile and execute as native ECMAScript modules.\n`package` overrides either of the above to default behavior, which obeys package.json "type" and\ntsconfig.json "module" options.',
              },
              preferTsExts: {
                default: false,
                description:
                  "Re-order file extensions so that TypeScript imports are preferred.\n\nFor example, when both `index.js` and `index.ts` exist, enabling this option causes `require('./index')` to resolve to `index.ts` instead of `index.js`",
                type: ['boolean', 'null'],
              },
              pretty: {
                default: false,
                description: 'Use pretty diagnostic formatter.',
                type: ['boolean', 'null'],
              },
              require: {
                description:
                  "Modules to require, like node's `--require` flag.\n\nIf specified in `tsconfig.json`, the modules will be resolved relative to the `tsconfig.json` file.\n\nIf specified programmatically, each input string should be pre-resolved to an absolute path for\nbest results.",
                items: {
                  type: ['string', 'null'],
                },
                type: ['array', 'null'],
              },
              scope: {
                default: false,
                description: 'Scope compiler to files within `scopeDir`.',
                type: ['boolean', 'null'],
              },
              scopeDir: {
                default:
                  'First of: `tsconfig.json` "rootDir" if specified, directory containing `tsconfig.json`, or cwd if no `tsconfig.json` is loaded.',
                type: ['string', 'null'],
              },
              skipIgnore: {
                default: false,
                description:
                  'Skip ignore check, so that compilation will be attempted for all files with matching extensions.',
                type: ['boolean', 'null'],
              },
              swc: {
                description:
                  "Transpile with swc instead of the TypeScript compiler, and skip typechecking.\n\nEquivalent to setting both `transpileOnly: true` and `transpiler: 'ts-node/transpilers/swc'`\n\nFor complete instructions: https://typestrong.org/ts-node/docs/transpilers",
                type: ['boolean', 'null'],
              },
              transpileOnly: {
                default: false,
                description: "Use TypeScript's faster `transpileModule`.",
                type: ['boolean', 'null'],
              },
              transpiler: {
                anyOf: [
                  {
                    items: [
                      {
                        type: ['string', 'null'],
                      },
                      {
                        additionalProperties: true,
                        properties: {},
                        type: ['object', 'null'],
                      },
                    ],
                    maxItems: 2,
                    minItems: 2,
                    type: ['array', 'null'],
                  },
                  {
                    type: ['string', 'null'],
                  },
                ],
                description: 'Specify a custom transpiler for use with transpileOnly',
              },
              typeCheck: {
                default: true,
                description: '**DEPRECATED** Specify type-check is enabled (e.g. `transpileOnly == false`).',
                type: ['boolean', 'null'],
              },
            },
            type: ['object', 'null'],
          },
        },
      },
    },
    id: 'https://json.schemastore.org/tsconfig',
    title: "JSON schema for the TypeScript compiler's configuration file",
    type: 'object',
  };
  return <JsonEditor height={320} schemaUri="json-schema://tsconfig" schemaContent={schema} />;
};

export default App;