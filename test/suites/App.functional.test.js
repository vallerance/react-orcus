/* App.functional.test.js
 * Tests functionality of App component
 * Dependencies: assert, jquery, react-testing-library, react-hyperscript modules, mocha context
 * Author: Joshua Carter
 * Created: December 7, 2019
 */
"use strict";
//include dependencies
var assert = require('chai').assert,
    jQuery = require('jquery'),
    h = require('react-hyperscript'),
    rtl = require("@testing-library/react"),
    //rtl = require("react-testing-library"),
    enzyme = require('enzyme'),
    {App, Desktop} = require('../../build/index.js'),
    //include redux store
    {configureStore} = require("@reduxjs/toolkit"),
    {Provider} = require("react-redux"),
    {default: ormReducer} = require('../../build/redux/ormReducer.js');
    
var renderApp = function (...args) {
    //mount dekstop
    var mountedDesktop = enzyme.mount(h(Desktop, {}, h(...args)));
    //render app, wrapped in a provider
    return rtl.render(h(
        Provider,
        {store: mountedDesktop.instance().reduxStore},
        h(...args)
    ));        
}

//begin mocha tests
describe ('<App /> should render', function () {
    var reqProps = {
            name: "Test App",
            slug: "test-app"
        },
        extraProps = Object.assign({}, reqProps, {
            className: "custom-class",
            id: "custom-id",
            "data-prop": "prop-val",
        }),
        reqPropsOpened = Object.assign({initialOpened: true}, reqProps),
        extraPropsOpened = Object.assign({initialOpened: true}, extraProps),
        appWrapper = null;
            
    beforeEach (function () {
        var renderResult = renderApp(App, extraPropsOpened);
        appWrapper = jQuery(renderResult.container);
    });

    afterEach (function () {
        //destroy wrappers
        appWrapper = null;
        //cleanup
        rtl.cleanup();
    });

    describe ("App with", function () {
        it ("Library class names", function () {
            assert.lengthOf(appWrapper.find(".orcus-app"), 1, "Missing node with orcus-app class");
            assert.lengthOf(appWrapper.find(".orcus-window"), 1, "Missing node with orcus-window class");
        });

        it ("Transfered class name", function () {
            assert.include(appWrapper.find(".orcus-app").get(0).className, extraProps.className);
        });

        it ("Other transfered props", function () {
            assert.equal(appWrapper.find(".orcus-app").eq(0).data("prop"), extraProps["data-prop"]);
            assert.equal(appWrapper.find(".orcus-app")[0].id, extraProps.id);
        });

        it ("Default id", function () {
            //render app with no given id
            var renderResult = renderApp(App, reqPropsOpened);
            //should include default id
            assert.include(renderResult.container.firstChild.id, "orcus-app-");
        });

        it ("Unique default id", function () {
            //render two apps with no given id
            var renderResult1 = renderApp(App, reqPropsOpened),
                renderResult2 = renderApp(App, reqPropsOpened);
            //default ids should be different
            assert.notEqual(
                renderResult1.container.firstChild.id,
                renderResult2.container.firstChild.id
            );
        });
        
        it ("Nothing if closed", function () {
            //render app that is closed (default)
            var renderResult = renderApp(App, Object.assign({}, extraProps));
            assert.isNotOk(renderResult.container.firstChild);
        });
    });
    
    describe ("Title bar with", function () {
        var titleBarWrapper = null;

        beforeEach (function () {
            var renderResult = renderApp(
                App,
                extraPropsOpened
            );
            titleBarWrapper = jQuery(renderResult.container); 
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
                "Missing node with orcus-title class"
            );
            //check for content
            assert.include(
                titleBarWrapper.find(".orcus-title-bar .orcus-title").text(),
                extraProps.name
            );
        });
        
        describe ("Window controls section that has", function () {
            it ("Class name", function () {
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-controls"),
                    1,
                    "Missing node with orcus-controls class"
                );
            });
            
            it ("Initial control buttons", function () {
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-controls .orcus-ui.orcus-button.orcus-minimize"),
                    1,
                    "Missing node with orcus-minimize class"
                );
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-controls .orcus-ui.orcus-button.orcus-maximize"),
                    1,
                    "Missing node with orcus-maximize class"
                );
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-controls .orcus-ui.orcus-button.orcus-close"),
                    1,
                    "Missing node with orcus-close class"
                );
            });
            
            it ("Close button that closes the app", function () {
                //render app that will be closed
                var renderResult = renderApp(App, reqPropsOpened);
                //should currently be open
                assert.isOk(renderResult.container.firstChild);
                // click close button
                rtl.fireEvent.click(
                    jQuery(renderResult.container.firstChild)
                        .find(".orcus-title-bar .orcus-ui.orcus-button.orcus-close")
                        .get(0)
                );
                //app should now be closed
                assert.isNotOk(renderResult.container.firstChild);
            });
            
            it ("Restore button if maximized", function () {
                // click maximize button
                rtl.fireEvent.click(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-maximize").get(0)
                );
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
            
            it ("Maximize button if maximized then restored", function () {
                // click maximize button
                rtl.fireEvent.click(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-maximize").get(0)
                );
                rtl.fireEvent.click(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-restore").get(0)
                );
                // restore button should be replaced
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-maximize"),
                    1,
                    "Missing node with orcus-restore class"
                );
                assert.lengthOf(
                    titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-restore"),
                    0,
                    "Unexpected node with orcus-maximize class"
                );
            });
        });
        
    });
    
    describe ("Client area with", function () {
        var clientAreaWrapper = null;

        beforeEach (function () {
            var renderResult = renderApp(
                App,
                extraPropsOpened,
                h("div", {className: "child-class"})
            );
            clientAreaWrapper = jQuery(renderResult.container); 
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
                var renderResult = renderApp(App, reqProps, h("div", {className: "child-class"}));
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
