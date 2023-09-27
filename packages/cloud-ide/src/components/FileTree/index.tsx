import { useRef, Ref } from 'react';
import { Tree, UncontrolledTreeEnvironment, TreeEnvironmentRef } from 'react-complex-tree';
import { EventEmitter } from 'react-complex-tree/src/EventEmitter';
import { getDirAsTree } from '../../libs/webcontainer';
import { debounce } from '../../libs/debounce';

import type * as RCT from 'react-complex-tree';
import type { FileSystemAPI } from '@webcontainer/api';

interface FileTreeProps {
  fs: FileSystemAPI,
  onRenameItem: (path: string, name: string) => void,
  onTriggerItem: (path: string, name: string) => void,
}

const root: RCT.TreeItem<string> = {
  index: 'root',
  data: 'root',
  isFolder: true,
  canMove: false,
  canRename: false,
  children: [],
};

export const FileTreeState = {
  refresh: new Function(),
  treeEnv: null as Ref<TreeEnvironmentRef<any, never>>
}

export function FileTree(props: FileTreeProps) {
  const treeEnv = useRef() as Ref<TreeEnvironmentRef<any, never>>
  const provider = useRef<TreeProvider<string>>(new TreeProvider({root}));

  const refresh = async (updateMessage?: string) => {
    console.log('refresh updateMessage', updateMessage);
    const data = await getDirAsTree(props.fs, '.', 'root', Object.assign({}, root, {children: []}), {});
    console.log('refresh getDirAsTree', data);
    provider.current.updateItems(data);
  };
  
  // TODO: find a better way to call "refresh" outside of component
  Object.assign(FileTreeState, {treeEnv, refresh: debounce(refresh, 300)});

  const renderItem = (item: RCT.TreeItem<any>) => {
    return (
      <span>
        {item.data}
      </span>
    );
  };

  return (
    <div style={{ overflow: 'scroll' }}>
      <div className={'rct-dark'}>
        <UncontrolledTreeEnvironment
          ref={treeEnv}
          canRename
          canSearch
          canDragAndDrop
          canDropOnFolder
          canSearchByStartingTyping
          dataProvider={provider.current}
          getItemTitle={item => item.data}
          renderItemTitle={(props) => renderItem(props.item)}
          onPrimaryAction={item => props.onTriggerItem(item.index.toString(), item.data)}
          onRenameItem={(item, name) => props.onRenameItem(item.index.toString(), name)}
          // onExpandItem={(item) => {console.log('expand', item)}}
          viewState={{filetree: {}}}>
          <Tree treeId="filetree" treeLabel="Explorer" rootItem="root"/>
        </UncontrolledTreeEnvironment>
      </div>
    </div>
  );
}

class TreeProvider<T = any> implements RCT.TreeDataProvider {
  private data: RCT.ExplicitDataSource;
  private onDidChangeTreeDataEmitter = new EventEmitter<RCT.TreeItemIndex[]>();

  constructor(items: Record<RCT.TreeItemIndex, RCT.TreeItem<T>>) {
    console.log('TreeProvider constructor', items);
    this.data = {items};
  }

  public async updateItems(items: Record<RCT.TreeItemIndex, RCT.TreeItem<T>>) {
    console.log('updateItems items', items)
    this.data = {items};
    this.onDidChangeTreeDataEmitter.emit(Object.keys(items));
  }

  public async getTreeItem(itemId: RCT.TreeItemIndex): Promise<RCT.TreeItem> {
    console.log('getTreeItem', itemId, this.data.items[itemId]);
    return this.data.items[itemId];
  }
  
  public onDidChangeTreeData(listener: (changedItemIds: RCT.TreeItemIndex[]) => void): RCT.Disposable {
    console.log('onDidChangeTreeData items', this.data.items);
    const handlerId = this.onDidChangeTreeDataEmitter.on(payload => listener(payload));
    return {dispose: () => this.onDidChangeTreeDataEmitter.off(handlerId)};
  }
}
