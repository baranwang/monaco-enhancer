import { useCallback, useMemo } from 'react';
import type { CoreEditorProps, MountFunc } from './types';
import { withMonacoJsonEditor } from './withMonacoJsonEditor';

export function withJsonEditor<
  ElementType extends React.ElementType,
  Props extends CoreEditorProps<React.ComponentProps<ElementType>>,
  MountKey extends string & keyof Props,
>(Component: ElementType, mountKey: MountKey) {
  return withMonacoJsonEditor<Props>((initEditor, props) => {
    const handleMount = useCallback<MountFunc>(
      (editor, monaco, ...rest) => {
        initEditor(monaco, editor.getModel());
        props[mountKey as unknown as keyof typeof props]?.(editor, monaco, ...rest);
      },
      [initEditor, props, mountKey],
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const componentProps = useMemo(() => {
      return {
        ...props,
        [mountKey]: handleMount,
      } as Props;
    }, [props, handleMount]);

    return <Component {...(componentProps as any)} />;
  });
}
