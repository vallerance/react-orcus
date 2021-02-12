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
    //TestRenderer = require('react-test-renderer'),
    reactDomInstance = require('react-dom-instance'),
    testDom = require("../util/testDom.util.js"),
    {App, Desktop} = require('../../build/index.js'),
    //include redux store
    {Provider} = require("react-redux");
    
var renderApp = function (...args) {
    //mount dekstop
    //var mountedDesktop = TestRenderer.create(h(Desktop, {}, h(...args)));
    var desktopId = "mounted-desktop",
        mountedDesktop = reactDomInstance.findInstance(
            jQuery(
                rtl
                    .render(h(Desktop, {id: desktopId}, h(...args)))
                    .container
            ).find("#" + desktopId).get(0)
        );
    //render app, wrapped in a provider
    return rtl.render(h(
        Provider,
        {store: mountedDesktop.reduxStore},
        h(...args)
    ));        
};

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
        
        it ("Resize handles", function () {
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.top"), 3, "Missing 3 nodes with .orcus-resize-handle.top class");
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.right"), 3, "Missing 3 nodes with .orcus-resize-handle.right class");
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.bottom"), 3, "Missing 3 nodes with .orcus-resize-handle.bottom class");
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.left"), 3, "Missing 3 nodes with .orcus-resize-handle.left class");
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.top.right"), 1, "Missing node with .orcus-resize-handle.top.right class");
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.bottom.right"), 1, "Missing node with .orcus-resize-handle.bottom.right class");
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.bottom.left"), 1, "Missing node with .orcus-resize-handle.bottom.left class");
            assert.lengthOf(appWrapper.find(".orcus-resize-handle.top.left"), 1, "Missing node with .orcus-resize-handle.top.left class");
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
    
    describe ("Focused state", function () {
        var focusedWrapper = null,
            render = function (initialFocused=[]) {
                var initialFocused = Object.assign([false, false, false, false], initialFocused),
                    renderResult = rtl.render(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        [
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: initialFocused[0], id: "first-app", slug: "first-app"})),
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: initialFocused[1], id: "second-app", slug: "second-app"})),
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: initialFocused[2], id: "third-app", slug: "third-app"})),
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: initialFocused[3], id: "fourth-app", slug: "fourth-app"}))
                        ]
                    ));
                focusedWrapper = jQuery(renderResult.container); 
            };
            
        beforeEach (function () {
        
        });

        afterEach (function () {
            //destroy wrapper
            focusedWrapper = null;
        });
        
        describe ("According to initialFocus prop with value of", function () {

            it ("1 or true", function () {
                //render with first app focused
                render([1]);
                //first app should be focused
                testDom.assertFocused(focusedWrapper, "#first-app");
                //render again with second app focused
                render([false, true]);
                //second app should be focused
                testDom.assertFocused(focusedWrapper, "#second-app");
            });

            it ("0 or false", function () {
                //render with first app NOT focused
                render([0, 1, 2, 3]);
                // first app should NOT be focused
                assert.lengthOf(
                    focusedWrapper.find("#first-app:focus"),
                    0,
                    "Found unexpected focused app"
                );
                // first app should be at end of queue
                testDom.assertFocusedIndex(focusedWrapper, "#first-app", -1);
                //render again with second app NOT focused
                render([true, false]);
                //second app shouldNOT be focused
                assert.lengthOf(
                    focusedWrapper.find("#second-app:focus"),
                    0,
                    "Found unexpected focused app"
                );
            });

            it ("default (false)", function () {
                //render three apps
                var renderResult = rtl.render(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        [
                            h(App, Object.assign({}, reqPropsOpened, {id: "first-app", slug: "first-app"})),
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: 2, id: "second-app", slug: "second-app"})),
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: 3, id: "third-app", slug: "third-app"}))
                        ]
                    )),
                    wrapper = jQuery(renderResult.container);
                
                // first app should NOT be focused
                assert.lengthOf(
                    wrapper.find("#first-app:focus"),
                    0,
                    "Found unexpected focused app"
                );
                // first app should be at end of queue
                testDom.assertFocusedIndex(wrapper, "#first-app", -1);
            });

            it ("2 or higher", function () {
                //render with first app NOT focused
                render([0, 2, 1, 4]);
                //third app should be focused
                testDom.assertFocused(focusedWrapper, "#third-app");
                //second app should be second place in queue
                testDom.assertFocusedIndex(focusedWrapper, "#second-app", 1);
                //fourth app should be third place in queue
                testDom.assertFocusedIndex(focusedWrapper, "#fourth-app", 2);
                // first app should be at end of queue
                testDom.assertFocusedIndex(focusedWrapper, "#first-app", -1);
            });
        });
        
        it ("That updates when app is clicked", function () {
            //render initial order      -> 1st, 2nd, 3rd, 4th
            render([1, 2, 3, 4]);
            //second app should be second place in queue
            testDom.assertFocusedIndex(focusedWrapper, "#second-app", 1);
            //fourth app should be fourth place in queue
            testDom.assertFocusedIndex(focusedWrapper, "#fourth-app", 3);
            //click the second app      -> 2nd, 1st, 3rd, 4th
            testDom.click(
                focusedWrapper.find("#second-app").get(0)
            );
            //second app should be focused
            testDom.assertFocused(focusedWrapper, "#second-app");
            //first app should be second place in queue
            testDom.assertFocusedIndex(focusedWrapper, "#first-app", 1);
            //click the fourth app      -> 4th, 2nd, 1st, 3rd
            testDom.click(
                focusedWrapper.find("#fourth-app").get(0)
            );
            //first app should be third place in queue
            testDom.assertFocusedIndex(focusedWrapper, "#first-app", 2);
            //third app should be fourth place in queue
            testDom.assertFocusedIndex(focusedWrapper, "#third-app", 3);
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
            var testFocusReplacement = function (removeApp = function () {}) {
                //render three apps
                var renderResult = rtl.render(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        [
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: 2, id: "first-app", slug: "first-app"})),
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: 2, id: "second-app", slug: "second-app"})),
                            h(App, Object.assign({}, reqPropsOpened, {initialFocused: 3, id: "third-app", slug: "third-app"}))
                        ]
                    )),
                    wrapper = jQuery(renderResult.container);

                // fire callback that will remove app
                removeApp(wrapper, "#first-app");
                //second app should be focused
                testDom.assertFocused(wrapper, "#second-app");
                //third app should be second place in queue
                testDom.assertFocusedIndex(wrapper, "#third-app", 1);
            };
            
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
            
            describe ("Close button that", function () {
                it ("Closes the app", function () {
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
                
                it ("Focuses app directly beneath it", function () {
                    // render three apps, close the first one, test focus replacement
                    testFocusReplacement(function (wrapper, selector) {
                        // click close button of first app
                        testDom.click(
                            wrapper
                                .find(`${selector} .orcus-title-bar .orcus-ui.orcus-button.orcus-close`)
                                .get(0)
                        );
                    });
                });
            });
            
                        
            describe ("Minimize button that", function () {
                it ("Minimizes the app", function () {
                    // click minimize button
                    rtl.fireEvent.click(
                        titleBarWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-minimize").get(0)
                    );
                    // app should be minimized
                    assert.lengthOf(
                        titleBarWrapper.find(".orcus-window.minimized"),
                        1,
                        "Missing node with .orcus-window.minimized class"
                    );
                });
                
                it ("Focuses app directly beneath it", function () {
                    // render three apps, close the first one, test focus replacement
                    testFocusReplacement(function (wrapper, selector) {
                        // click close button of first app
                        testDom.click(
                            wrapper
                                .find(`${selector} .orcus-title-bar .orcus-ui.orcus-button.orcus-minimize`)
                                .get(0)
                        );
                    });
                });
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
