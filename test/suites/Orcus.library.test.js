/* Orcus.library.test.js
 * Tests module inclusion
 * Dependencies: assert, jsdom modules, mocha context
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//include dependencies
var assert = require('assert'),
    JSDOM = require('jsdom').JSDOM;
    
// Create a fake DOM for testing with $.ajax
global.window = new JSDOM().window;
global.document = window.document;

//begin mocha tests
describe('Orcus', function () {
    describe('Can be included via', function () {
        var testScriptTag = function (filename, done) {
            //include the file via a script tag
            var dom = new JSDOM(
                `
<html><head>
    <script src="../node_modules/react/umd/react.development.js"></script>
    <script src="../node_modules/react-dom/umd/react-dom.development.js"></script>
    <script src="${filename}"></script>
</head></html>
                `, 
                {
                    url: `file://${__dirname}`,
                    runScripts: "dangerously",
                    resources: "usable"
                }
            );
            //wait for script to load
            dom.window.document.onload = function () {
                try {
                    //console.log("loaded");
                    assert.equal(typeof dom.window.Orcus, "object");
                    assert.equal(typeof dom.window.Orcus.Desktop, "function");
                    done();
                }
                catch (e) {
                    done(e);
                }
            };

        };

        it ("A script tag", function (done) {
            testScriptTag("../dist/react-orcus.js", done);
        });

        it ("A script tag using minified script", function (done) {
            testScriptTag("../dist/react-orcus.min.js", done);
        });

        it ("CommonJS", function () {
            //include using CommonJS
            var OrcusInc = require('../../build/index.js');
            //should have been imported
            assert.equal(typeof OrcusInc.Desktop, "function");
        });
        
        it ("CommonJS using default export", function () {
            //include using CommonJS
            var OrcusInc = require('../../build/index.js');
            //should have been imported
            assert.equal(typeof OrcusInc.default, "object");
            assert.equal(typeof OrcusInc.default.Desktop, "function");
        });
        
        it ("RequireJS", function (done) {
            //include the file via a script tag
            var dom = new JSDOM(
                `
<html><head>
    <script src="../node_modules/requirejs/require.js"></script>
    <script>
        //setup dependencies
        requirejs.config({
            paths: {
                'react': '../node_modules/react/umd/react.development',
                'react-dom': '../node_modules/react-dom/umd/react-dom.development',
            }
        });
        
        //include using RequireJS
        requirejs(['../dist/react-orcus.js'], function (OrcusInc) {
            window.onOrcusLoad(OrcusInc);
        });
    </script>
</head></html>
                `, 
                {
                    url: `file://${__dirname}`,
                    runScripts: "dangerously",
                    resources: "usable"
                }
            );
            //wait for script to load
            dom.window.onOrcusLoad = function (OrcusInc) {
                try {
                    //console.log("loaded");
                    assert.equal(typeof OrcusInc, "object");
                    assert.equal(typeof OrcusInc.Desktop, "function");
                    done();
                }
                catch (e) {
                    done(e);
                }
            };
        });
    });
});
