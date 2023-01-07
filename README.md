React Orcus
====

[![npm](https://img.shields.io/npm/v/react-orcus)](https://www.npmjs.com/package/react-orcus) [![Codefresh build status](https://g.codefresh.io/api/badges/pipeline/joshuacwebdeveloper/react-orcus%2Fgithub-test-hook?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NWU2NGIwZDk4ZTc3MDkyNWRlMzk4NTY4.1RyVgiNLIw7YYzkLCJLcJtK-p6zRYarO3sCielzfkP4&type=cf-1)](https://g.codefresh.io/public/accounts/joshuacwebdeveloper/pipelines/5e65bd75d7e4d02008a90182)

React library for creating an app with a windowed desktop interface.

- [Installation/Setup](#installation)
- [Examples](#examples)
- [API](#api)
- [Development](#development)

![Demo GIF](demo.gif)

## <a name="installation"></a>Installation/Setup
Run:

`npm install react-orcus`

and then import it in your app:

`import Orcus from 'react-orcus';`

-- OR --

Include it in your HTML header:

`<script type="text/javascript" src="./react-orcus/dist/react-orcus.min.js"></script>`

Then, in your React component:
```JavaScript
var Desktop = (
    
    <Orcus.Desktop taskbar="right">
        <Orcus.App
            slug="file-manager"
            name="File Manager"
            icon="fa:folder"
            initialOpened={true}
            initialPosition={[150, 200, 500, 300]}    // [x, y, w, h]
        >
            <h1>Welcome to my File Manager</h1>

            <p>Yeah so.... building a file manager is really hard.
            But please enjoy this complimentary welcome paragraph!</p>
        </Orcus.App>

        <Orcus.App
            slug="tetris"
            name="Tetris"
            icon="fa:th-large"
            initialPosition={[550, 200, 280, 450]}    // [x, y, w, h]
        >
            <p>Does anyone know how to build a tetris game?</p>
        </Orcus.App>
    </Orcus.Desktop>
    
);
```

## <a name="examples"></a>Examples

## <a name="api"></a>API

## <a name="development"></a>Development & Contributions

#### Branches

The `master` branch contains the latest production release. The `develop` branch
contains the latest stable build. Most PRs should be submitted to the `develop`
branch in order to ensure they are based on the most recent version of the code.
Most PRs submitted to `master` will be rebased onto `develop`. Exceptions
include changes like critical bugfixes that need to be pushed ahead of the next
planned release.

#### Roadmap

- [x] Taskbar ([#53][i53])
- [ ] Grid layout ([#104][i104])
- [ ] Program menu ([#55][i55])
- [ ] Themes ([#43][i43])
- [ ] App Groups ([#48][i48])

[i53]: https://github.com/vallerance/react-orcus/issues/53
[i55]: https://github.com/vallerance/react-orcus/issues/55
[i43]: https://github.com/vallerance/react-orcus/issues/43
[i48]: https://github.com/vallerance/react-orcus/issues/48

#### Environment Setup

##### nvm

Run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

##### Autoenv

Installing autoenv eliminates the need to run `nvm use` every time you `cd`
into the project.

Run:

```bash
curl -#fLo- 'https://raw.githubusercontent.com/hyperupcall/autoenv/master/scripts/install.sh' | sh
```

The above command will append a line to your `~/.bashrc` file that sources
`autoenv/activate.sh`. Add the following variables to your `~/.bashrc` file
immediately _before_ the source line:

```bash
AUTOENV_ENABLE_LEAVE=yes
AUTOENV_ENV_FILENAME=.autoenv
AUTOENV_ENV_LEAVE_FILENAME=.autoenv.leave
```

##### Project

Once all above dependencies are installed, run:

```bash
nvm use

npm install
```

#### Building and testing

Run `npm install` to install/update dependencies.

Run `npm run build` to build the app.

Run `npm test` to run the tests.

Run `npm start` to run the demo example.
