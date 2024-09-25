import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: {
        bundle: false,
      },
      output: {
        distPath: {
          root: './dist/esm',
        },
      },
    },
    {
      format: 'cjs',
      dts: {
        bundle: false,
      },
      output: {
        distPath: {
          root: './dist/cjs',
        },
      },
    },
  ],
  plugins: [pluginReact()],
});
