import Monaco from '@monaco-editor/react';
import {initEditor} from '../../../modules/monaco';

import type {FileSystemAPI} from '@webcontainer/api';
import type {CollabInstance} from '../../../hooks/useCollab';

interface EditorProps {
  fs: FileSystemAPI,
  path: string,
  sync: CollabInstance,
}

export const Editor = (props: EditorProps) => {
  return (
    <Monaco
      path={props.path}
      theme={'vs-dark'}
      options={{readOnly: true, padding: {top: 10}}}
      onMount={(editor, monaco) => initEditor(editor, monaco, props.fs, props.path, props.sync)}
      onChange={(value) => props.fs.writeFile(props.path, value || '', 'utf-8')}
    />
  );
}
