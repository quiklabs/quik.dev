import styled from "styled-components";

export const FileExplorerContainer = styled.div`
    max-width: 300px; 
    border-right: 1px solid #333;
    overflow-y: auto;
    height: 100%;
`;

export const FileList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

export const FileItem = styled.li`
    padding: 8px 16px;
    cursor: pointer;
    border-bottom: 1px solid #333;
    
    &:hover {
        background-color: #272727;
    }
`;