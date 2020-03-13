/* gulpfile.js
 * Glup task-runner configruation for project
 * Dependencies: dev-tasks, gulp, gulp-util modules
 * Author: Joshua Carter
 * Created: June 08, 2019
 */
"use strict";
//include modules
var DevOps = require("dev-tasks"),
    gulp = require("gulp"),
    log = require("fancy-log"),
    path = require("path");

//configure dev-tasks
DevOps.init({
    appName: 'react-orcus',
    bundleDir: "dist",
    bundleName: "react-orcus",
    babelExtOptions: {
        "plugins": [
            ["@babel/plugin-proposal-class-properties", { "loose": true }]
        ]
    },
    wpSingleEntryPoint: "./src/index.js",
    wpExtOptions: {
        output: {
            library: "Orcus",
            libraryTarget: "umd"
        },
        /*
         * The following two blocks of code (`resolve` and `externals`) were
         * taken from the following article:
         * https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f
         * Specifying a map of externals per dependency in `externals` allows
         * us to support multiple environments.
         * It is not clear to me exactly why the `resolve` block is needed, or
         * what its effect is to applications that import this library one way
         * or another.
         */
        resolve: {
            alias: {
                'react': path.resolve(__dirname, './node_modules/react'),
                'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            }
        },
        externals: {
            // Don't bundle react or react-dom
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "react",
                root: "React"
            },
            "react-dom": {
                commonjs: "react-dom",
                commonjs2: "react-dom",
                amd: "react-dom",
                root: "ReactDOM"
            }
        }
    },
    gitCommitterName: 'ReactOrcusDevTasks',
    gitCommitterEmail: 'coosriverjoshua1@outlook.com'
});



//default gulp task: documentation
gulp.task('default', function () {
    log(
`

Available Gulp Commands:
 - lint
 - build
 - bundle
 - minify
 - release major|minor|patch
`
    );
});

//lint code using ESLint
gulp.task('lint', function (cb) {
    DevOps.lint();
    return cb();
});

//transpile code using babel
gulp.task('build', function () {
    //lint first
    DevOps.lint();
    return DevOps.build();
});

//build code using webpack and babel
gulp.task('bundle', function () {
    //lint first
    DevOps.lint();
    return DevOps.bundle();
});

//build our code and minify it using webpack and babili
gulp.task('minify', function () {
    //lint first
    DevOps.lint();
    //run build again
    return DevOps.bundle().then(function () {
        //now minify
        return DevOps.bundle("production", true);
    });
});

//create a new release and push it to master
gulp.task('release', function () {
    return DevOps.release();
});


//create dummy tasks so that we can use non-hyphentated arguments
var dummy = function (cb) {
        return cb();
    },
    dummies = ['patch', 'minor', 'major'];
for (let i=0; i<dummies.length; i++) {
    gulp.task(dummies[i], dummy);
}
