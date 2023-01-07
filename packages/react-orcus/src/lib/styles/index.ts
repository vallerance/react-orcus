import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
.orcus-desktop,
.orcus-desktop * {
    box-sizing: border-box;
}

.orcus-desktop {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
}

.orcus-desktop.taskbar-top,
.orcus-desktop.taskbar-bottom {
    flex-direction: column;
}

.orcus-desktop.taskbar-right,
.orcus-desktop.taskbar-left {
    flex-direction: row;
}

.orcus-desktop-content {
    flex: 100%;
    width: 100%;
    height: 100%;
}

.orcus-desktop.taskbar-top .orcus-desktop-content,
.orcus-desktop.taskbar-left .orcus-desktop-content {
    order: 2;
}

.orcus-desktop.taskbar-right .orcus-desktop-content,
.orcus-desktop.taskbar-bottom .orcus-desktop-content {
    order: 1;
}

.orcus-taskbar {
    background-color: #eee;
    border: 0px #000 solid;
    flex: 30px;
    padding: 2px;
    width: 100%;
    height: 100%;
    z-index: 700;
}

.orcus-desktop.taskbar-top .orcus-taskbar,
.orcus-desktop.taskbar-left .orcus-taskbar {
    order: 1;
}

.orcus-desktop.taskbar-right .orcus-taskbar,
.orcus-desktop.taskbar-bottom .orcus-taskbar {
    order: 2;
}

.orcus-desktop.taskbar-top .orcus-taskbar { border-bottom-width: 2px; }
.orcus-desktop.taskbar-right .orcus-taskbar { border-left-width: 2px; }
.orcus-desktop.taskbar-bottom .orcus-taskbar { border-top-width: 2px; }
.orcus-desktop.taskbar-left .orcus-taskbar { border-right-width: 2px; }

.orcus-shortcut,
.orcus-title-bar {
    cursor: default;
    font-family: calibri, sans-serif;
}

.orcus-app,
.orcus-title-bar {
    border: 1px #000 solid;
}

.orcus-app.minimized {
    display: none !important;
}

.orcus-app:focus {
    outline: 0;
    z-index: 500;
}

.orcus-title-bar {
    background-color: #ccc;
    font-size: 13px;
    line-height: 13px;
    overflow: hidden;
    padding: 2px 10px;
    width: 100%;
    height: 20px;
}

.orcus-title-bar .orcus-title {
    float: left;
    font-size: inherit;
    margin: 0;
    padding: 0;
    width: calc(100% - 100px);
}

.orcus-controls {
    float: right;
    margin: 0;
    text-align: right;
    width: 100px;
}

.orcus-controls .orcus-button {
    display: inline-block;
    margin: 0 3px;
    width: 13px;
    height: 13px;
}

.orcus-client-area {
    background-color: #ddd;
    padding: 2px;
    position: relative;
    overflow: auto;
    width: 100%;
    height: calc(100% - 20px);
}

.orcus-resize-handle.top { cursor: n-resize !important; }
.orcus-resize-handle.right { cursor: e-resize !important; }
.orcus-resize-handle.bottom { cursor: s-resize !important; }
.orcus-resize-handle.left { cursor: w-resize !important; }
.orcus-resize-handle.top.right { cursor: ne-resize !important; }
.orcus-resize-handle.bottom.right { cursor: se-resize !important; }
.orcus-resize-handle.bottom.left { cursor: sw-resize !important; }
.orcus-resize-handle.top.left { cursor: nw-resize !important; }

.orcus-desktop-content .orcus-shortcut {
    border: 1px transparent solid;
    margin: 10px;
    outline: none;
    padding: 5px 1px;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    word-break: break-word;
    width: 70px;
}

.orcus-desktop-content .orcus-shortcut.selected {
    background-color: #e0e0e0;
    border-color: #bbb;
}

.orcus-desktop-content .orcus-shortcut .orcus-icon {
    padding: 5px;
}

.orcus-desktop-content .orcus-shortcut .orcus-title {
    font-size: .8em;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
}

.orcus-taskbar .orcus-shortcuts {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    width: 100%;
    height: 100%;
}

.orcus-desktop.taskbar-top .orcus-taskbar .orcus-shortcuts,
.orcus-desktop.taskbar-bottom .orcus-taskbar .orcus-shortcuts {
    flex-direction: row;
}

.orcus-desktop.taskbar-right .orcus-taskbar .orcus-shortcuts,
.orcus-desktop.taskbar-left .orcus-taskbar .orcus-shortcuts {
    flex-direction: column;
}

.orcus-taskbar .orcus-shortcut {
    background-color: #ddd;
    border: 1px #000 solid;
    cursor: default;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    flex-grow: 0;
    flex-shrink: 1;
    overflow: hidden;
    height: 100%;
    width: 100%;
}

.orcus-desktop.taskbar-top .orcus-taskbar .orcus-shortcut,
.orcus-desktop.taskbar-bottom .orcus-taskbar .orcus-shortcut {
    flex-basis: 125px;
    margin: 0 2px;
}

.orcus-desktop.taskbar-right .orcus-taskbar .orcus-shortcut,
.orcus-desktop.taskbar-left .orcus-taskbar .orcus-shortcut {
    flex-basis: 24px;
    margin: 2px 0;
}

.orcus-taskbar .orcus-shortcut.active {
    background-color: #eee;
}

.orcus-taskbar .orcus-shortcut .orcus-ui.orcus-icon {
    display: inline-block;
    margin: auto 3px;
    height: 1.1em;
}

.orcus-taskbar .orcus-shortcut .orcus-title {
    margin: auto 5px auto 0;
    height: 1.2em;
}

.orcus-desktop.taskbar-left .orcus-taskbar .orcus-shortcut .orcus-title,
.orcus-desktop.taskbar-right .orcus-taskbar .orcus-shortcut .orcus-title {
    display: none;
}
`;
