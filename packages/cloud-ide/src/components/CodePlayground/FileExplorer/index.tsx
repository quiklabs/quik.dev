
import React from 'react';
import { FileList, FileItem, FileExplorerContainer } from "./styles";

const files = [
    "index.tsx",
    "App.tsx",
    "Layout.tsx",
    "FileExplorer.tsx",
    "StyledComponents.tsx"
];

const FileExplorer: React.FC = () => {
    return (
        <FileExplorerContainer>
            <FileList>
                {files.map(file => (
                    <FileItem key={file}>
                        {file}
                    </FileItem>
                ))}
            </FileList>
        </FileExplorerContainer>
    );
};

export default FileExplorer;
