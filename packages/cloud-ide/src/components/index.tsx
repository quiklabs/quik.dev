import { useRef } from 'react';
import * as panels from '../libs/panels';

import { DockviewReact, GridviewReact, PaneviewReact } from 'dockview';

import type {
    DockviewApi,
    GridviewApi,
    PaneviewApi,
    PanelCollection,
    IGridviewPanelProps,
    IPaneviewPanelProps,
    IDockviewPanelProps
} from 'dockview';

import useStartup from "../hooks/useStartup";
import Editor from "./Editor";
import Terminal from "./Terminal";
import { FileTree } from "./FileTree";

import type { FileSystemAPI } from '@webcontainer/api';
import type { ShellInstance } from '../hooks/useShell';
import type { CollabInstance } from '../hooks/useCollab';
import Watermark from "./WaterMark";


const dockComponents: PanelCollection<IDockviewPanelProps> = {
    editor: (props: IDockviewPanelProps<{fs: FileSystemAPI, path: string, sync: CollabInstance}>) => (
        <Editor fs={props.params.fs} path={props.params.path} sync={props.params.sync}/>
    ),
    preview: (props: IDockviewPanelProps<{url: string}>) => (
        // @ts-ignore
        <iframe src={props.params.url} allow="cross-origin-isolated" credentialless/>
    ),
};

const gridComponents: PanelCollection<IGridviewPanelProps> = {
    dock: (props: IGridviewPanelProps<{api: React.MutableRefObject<DockviewApi>}>) => (
        <DockviewReact
            watermarkComponent={Watermark}
            components={dockComponents}
            onReady={event => {props.params.api.current = event.api}}
        />
    ),
    panes: (props: IGridviewPanelProps<{api: React.MutableRefObject<PaneviewApi>}>) => (
        <PaneviewReact
            components={paneComponents}
            onReady={event => {props.params.api.current = event.api}}
        />
    ),
    terminal: (props: IGridviewPanelProps<{dock: DockviewApi, shell: ShellInstance}>) => (
        <Terminal
            shell={props.params.shell}
            panelApi={props.api}
            onServerReady={panels.createPreviewOpener(props.params.dock)}
        />
    ),
};

const paneComponents: PanelCollection<IPaneviewPanelProps> = {
    filetree: (props: IPaneviewPanelProps<{dock: DockviewApi, fs: FileSystemAPI, sync: CollabInstance}>) => (
        <FileTree
            fs={props.params.fs}
            onRenameItem={panels.createFileRenameHandler(props.params.dock, props.params.fs)}
            onTriggerItem={panels.createFileOpener(props.params.dock, props.params.fs, props.params.sync)}
        />
    ),
};


const Dock = () =>  {
    const grid = useRef<GridviewApi>();
    const dock = useRef<DockviewApi>();
    const panes = useRef<PaneviewApi>();

    const { loading } = useStartup(grid, dock, panes);

    return (
        <GridviewReact
            components={gridComponents}
            proportionalLayout={false}
            onReady={(event: any) => {
                grid.current = event.api;
                panels.openDock(event.api, dock);
                panels.openPanes(event.api, panes);
            }}
        />
    );
}



export default Dock;