/* App.functional.test.js
 * Tests functionality of App component
 * Dependencies: assert, jquery, react-testing-library, react-hyperscript modules, mocha context
 * Author: Joshua Carter
 * Created: December 7, 2018
 */
"use strict";
//include dependencies
var assert = require('chai').assert,
    jQuery = require('jquery'),
    h = require('react-hyperscript'),
    //rtl = require("@testing-library/react"),
    rtl = require("react-testing-library"),
    {App} = require('../../build/index.js');

//begin mocha tests
describe ('<App /> should render', function () {
    var extraProps = {
            className: "custom-class",
            id: "custom-id",
            "data-prop": "prop-val",
            name: "Test App",
            key: "test-app"
        },
        appWrapper = null;
            
    beforeEach (function () {
        var renderResult = rtl.render(h(App, Object.assign({initialOpened: true}, extraProps)));
        appWrapper = jQuery(renderResult.container.firstChild);
    });

    afterEach (function () {
        //destroy wrappers
        appWrapper = null;
        //cleanup
        rtl.cleanup();
    });

    describe ("App with", function () {
        it ("Library class names", function () {
            assert.include(appWrapper.get(0).className, "orcus-app");
            assert.include(appWrapper.get(0).className, "orcus-window");
        });

        it ("Transfered class name", function () {
            assert.include(appWrapper.get(0).className, extraProps.className);
        });

        it ("Other transfered props", function () {
            assert.equal(appWrapper.eq(0).data("prop"), extraProps["data-prop"]);
            assert.equal(appWrapper[0].id, extraProps.id);
        });

        it ("Default id", function () {
            //render app with no given id
            var renderResult = rtl.render(h(App, {}));
            //should inculde default id
            assert.include(renderResult.container.firstChild.id, "orcus-app-");
        });

        it ("Unique default id", function () {
            //render two apps with no given id
            var renderResult1 = rtl.render(h(App, {})),
                renderResult2 = rtl.render(h(App, {}));
            //should inculde default id
            assert.notEqual(
                renderResult1.container.firstChild.id,
                renderResult2.container.firstChild.id
            );
        });
        
        it ("Nothing if closed", function () {
            //render app that is closed (default)
            var renderResult = rtl.render(h(App, Object.assign({}, extraProps))),
                closedWrapper = jQuery(renderResult.container.firstChild);
            //no class names
            assert.notInclude(closedWrapper.get(0).className, "orcus-app");
            assert.notInclude(closedWrapper.get(0).className, "orcus-window");
            assert.notInclude(closedWrapper.get(0).className, extraProps.className);
            // no id
            assert.notInclude(closedWrapper.container.firstChild.id, "orcus-app-");
        });
    });
    
    describe ("Title bar with", function () {
        var titleBarWrapper = null;

        beforeEach (function () {
            var renderResult = rtl.render(h(
                App,
                Object.assign({initialOpened: true}, extraProps)
            ));
            titleBarWrapper = jQuery(renderResult.container.firstChild); 
        });

        afterEach (function () {
            //destroy wrapper
            titleBarWrapper = null;
        });

        it ("Class name", function () {
            assert.lengthOf(
                titleBarWrapper.find(".orcus-title-bar"),
                1,
                "Missing node with orcus-title-bar class"
            );
        });
        
        it ("Application name", function () {
            //check for class
            assert.lengthOf(
                titleBarWrapper.find(".orcus-title-bar .orcus-title"),
                1,
                "Missing node with orcus-window-title class"
            );
            //check for content
            assert.include(titleBarWrapper.find(".orcus-window-title").text(), extraProps.name);
        });
        
        describe ("Window controls section that has", function () {
            it ("Initial control buttons", function () {
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-minimize"),
                    1,
                    "Missing node with orcus-minimize class"
                );
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-maximize"),
                    1,
                    "Missing node with orcus-maximize class"
                );
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-close"),
                    1,
                    "Missing node with orcus-close class"
                );
            });
            
            it ("Restore button if maximized", function () {
                // click maximize button
                rtl.fireEvent.click(titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-maximize"));
                // maximize button should be replaced
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-restore"),
                    1,
                    "Missing node with orcus-restore class"
                );
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-maximize"),
                    0,
                    "Unexpected node with orcus-maximize class"
                );
            });
        });
        
    });
    
    describe ("Client area with", function () {
        var clientAreaWrapper = null;

        beforeEach (function () {
            var renderResult = rtl.render(h(
                App,
                Object.assign({initialOpened: true}, extraProps),
                h("div", {className: "child-class"})
            ));
            clientAreaWrapper = jQuery(renderResult.container.firstChild); 
        });

        afterEach (function () {
            //destroy wrapper
            clientAreaWrapper = null;
        });

        it ("Class name", function () {
            assert.lengthOf(
                clientAreaWrapper.find(".orcus-client-area"),
                1,
                "Missing node with orcus-client-area class"
            );
        });
        
        describe ("Children that are", function () {
            it ("Rendered if opened", function () {
                // test rendering of children in open app
                assert.lengthOf(
                    clientAreaWrapper.find(".child-class"),
                    1,
                    "Missing node with child-class class"
                );
            });
            
            it ("Not rendered if closed", function () {
                //render app that is closed (default)
                var renderResult = rtl.render(h(App, {}, h("div", {className: "child-class"})));
                //should not have children
                assert.lengthOf(
                    jQuery(renderResult.container.firstChild).find(".child-class"),
                    0,
                    "Found unexpected node with child-class class"
                );
            });
        });
    });
});
