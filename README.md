React Orcus
====

[![Codefresh build status](https://g.codefresh.io/api/badges/pipeline/joshuacwebdeveloper/react-orcus%2Fgithub-test-hook?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NWU2NGIwZDk4ZTc3MDkyNWRlMzk4NTY4.1RyVgiNLIw7YYzkLCJLcJtK-p6zRYarO3sCielzfkP4&type=cf-1)](https://g.codefresh.io/pipelines/github-test-hook/builds?repoOwner=JoshuaCWebDeveloper&repoName=react-orcus&serviceName=JoshuaCWebDeveloper%2Freact-orcus&filter=trigger:build~Build;branch:master;pipeline:5e65bd75d7e4d02008a90182~github-test-hook)

React library for creating an app with a windowed desktop interface.

- [Installation/Setup](#installation)
- [Examples](#examples)
- [API](#api)

## <a name="installation"></a>Installation/Setup
Run:

`npm install react-orcus`

and then import it in your app:

`import Orcus from 'react-orcus';`

-- OR --

Include it in your HTML header:

`<script type="text/javascript" src="./react-orcus/dist/react-orcus.min.js"></script>`

Include `assets/react-orcus.css` in your HTML header (this is not mandatory, but the CSS file contains basic styles needed for the library components to be readable):
`<link rel="stylesheet" href="./react-orcus/assets/react-orcus.css" />`

Then, in your React component:
```JavaScript
var Desktop = (
    
    <Orcus.Desktop
        shortcuts={false}
        taskbar={false}
        programMenu={false}
    />
        <Orcus.App
            slug="file-manager"
            name="File Manager"
            icon="file"
            initialOpened={true}
            initialPosition={[150, 200, 500, 300]}    //{x, y, w, h}
        >
            <h1>Welcome to my File Manager</h1>
            
            <p>Yeah so.... building a file manager is really hard.
            But please enjoy this complimentary welcome paragraph!</p>
        </Orcus.App>
        
        <Orcus.App
            slug="tetris"
            name="Tetris"
            icon="blocks"
            initialPosition={[550, 200, 200, 600]}    //{x, y, w, h}
        >
            <p>Does anyone know how to build a tetris game?</p>
        </Orcus.App>
    </Orcus.Desktop>
    
);
```

## <a name="examples"></a>Examples

## <a name="api"></a>API
