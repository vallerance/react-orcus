/* eslint-disable no-undef */
/* eslint-disable strict */
/* DesktopTaskbar.functional.test.js
 * Tests functionality of Desktop component
 * Dependencies: assert, jquery, react-testing-library, react-hyperscript modules, mocha context
 * Author: Joshua Carter
 * Created: April 4, 2020
 */
"use strict";
//include dependencies
var assert = require('chai').assert,
    jQuery = require('jquery'),
    //h = require('react-hyperscript'),
    rtl = require("@testing-library/react"),
    {Desktop, App} = require('../../../../dist/packages/react-orcus/build/index.js'),
    testDom = require("../util/testDom.util.js"),
    behavior = require("../behavior/Shortcut.behavior.js");

//begin mocha tests
describe ('<Desktop /> should render taskbar', function () {
    var extraProps = {
            className: "custom-class",
            id: "custom-desktop-id",
            "data-prop": "prop-val"
        },
        appPropsNoId = {
            slug: "test-app",
            name: "Test App",
            className: "custom-class",
            icon: "fa:adjust"
        },
        appProps = Object.assign({
            id: "custom-id"
        }, appPropsNoId),
        taskbarWrapper = null;

    beforeEach (function () {
        var renderResult = rtl.render(h(Desktop, Object.assign({}, extraProps)));
        taskbarWrapper = jQuery(renderResult.container); 
    });

    afterEach (function () {
        //destroy wrapper
        taskbarWrapper = null;
        //cleanup
        rtl.cleanup();
    });

    it ("With class names", function () {
        assert.lengthOf(taskbarWrapper.find(".orcus-taskbar"), 1, "Missing node with orcus-taskbar class");
        assert.lengthOf(taskbarWrapper.find(".orcus-taskbar .orcus-shortcuts"), 1, "Missing node with orcus-shortcuts class");
    });

    it ("Unless prop is false", function () {
        //render desktop with no taskbar
        var renderResult = rtl.render(h(Desktop, {taskbar: false}));
        //should contain no taskbar
        assert.lengthOf(
            jQuery(renderResult.container.firstChild).find(".orcus-taskbar"),
            0,
            "Found unexpected node with orcus-taskbar class"
        );
    });
    
    it ("In the correct location", function () {
        //render desktop taskbar at top
        var renderResult = rtl.render(h(Desktop, {taskbar: "top"}));
        //should contain top taskbar
        assert.lengthOf(
            jQuery(renderResult.container).find(".orcus-desktop.taskbar-top"),
            1,
            "Missing node with .orcus-desktop.taskbar-top class"
        );
        //should be at bottom by default
        assert.lengthOf(
            taskbarWrapper.find(".orcus-desktop.taskbar-bottom"),
            1,
            "Missing node with .orcus-desktop.taskbar-bottom class"
        );
    });
    
    describe ("That", function () {
        it ("Doesn't show closed apps", function () {
            // render desktop with no open apps
            var renderResult = rtl.render(h(
                Desktop,
                Object.assign({}, extraProps),
                h(App, appProps)
            ));
            //should contain no taskbar shortcuts
            assert.lengthOf(
                jQuery(renderResult.container).find(".orcus-taskbar .orcus-shortcut"),
                0,
                "Found unexpected node with orcus-shortcut class"
            );
        });
        
        describe ("Shows which app is focused", function () {
            var appsWrapper = null;
            
            beforeEach (function () {
                var renderResult = rtl.render(h(
                    Desktop,
                    Object.assign({}, extraProps),
                    [
                        h(App, Object.assign({}, appPropsNoId, {initialOpened: true, id: "first-app", slug: "first-app"})),
                        h(App, Object.assign({}, appPropsNoId, {initialOpened: true, id: "second-app", slug: "second-app"}))
                    ]
                ));
                appsWrapper = jQuery(renderResult.container); 
            });

            afterEach (function () {
                //destroy wrapper
                appsWrapper = null;
            });
            
            it ("When two apps are open", function () {
                // focus first app
                testDom.focusApp(appsWrapper.find("#first-app").get(0));
                // first app should be active in taskbar
                assert.lengthOf(
                    appsWrapper.find("#orcus-taskbar-shortcut-first-app.active"),
                    1,
                    "Missing node with active class"
                );
                // focus second app
                testDom.focusApp(appsWrapper.find("#second-app").get(0));
                // first app should NOT be active in taskbar
                assert.lengthOf(
                    appsWrapper.find("#orcus-taskbar-shortcut-first-app.active"),
                    0,
                    "Found unexpected node with active class"
                );
            });
        
            it ("When apps are closed and re-opened", function () {
                // focus first app
                testDom.focusApp(appsWrapper.find("#first-app").get(0));
                // first app should be active in taskbar
                assert.lengthOf(
                    appsWrapper.find("#orcus-taskbar-shortcut-first-app.active"),
                    1,
                    "Missing node with active class"
                );
                // close both apps
                testDom.click(
                    appsWrapper.find(
                        "#first-app .orcus-title-bar " +
                        ".orcus-ui.orcus-button.orcus-close"
                    ).get(0)
                );
                testDom.click(
                    appsWrapper.find(
                        "#second-app .orcus-title-bar " +
                        ".orcus-ui.orcus-button.orcus-close"
                    ).get(0)
                );
                // open first app
                rtl.fireEvent.dblClick(
                    appsWrapper.find("#orcus-desktop-shortcut-first-app").get(0)
                );
                // first app should now be focused
                testDom.assertFocused(appsWrapper, "#first-app");
                // open second app
                rtl.fireEvent.dblClick(
                    appsWrapper.find("#orcus-desktop-shortcut-second-app").get(0)
                );
                // second app should be active in taskbar
                assert.lengthOf(
                    appsWrapper.find("#orcus-taskbar-shortcut-second-app.active"),
                    1,
                    "Missing node with active class"
                );
            });
        });

        describe ("For every open app has a shortcut that", function () {
            var appsWrapper = null,
                context = {
                    type: "taskbar",
                    parentSelector: ".orcus-taskbar",
                    appProps: Object.assign({initialOpened: true}, appProps),
                    extraProps: extraProps,
                    appPropsNoId: Object.assign({initialOpened: true}, appPropsNoId),
                    appsWrapper: appsWrapper
                };

            beforeEach (function () {
                var renderResult = rtl.render(h(
                    Desktop,
                    Object.assign({}, extraProps),
                    h(App, Object.assign({initialOpened: true}, appProps))
                ));
                appsWrapper = context.appsWrapper = jQuery(renderResult.container); 
            });

            afterEach (function () {
                //destroy wrapper
                appsWrapper = context.appsWrapper = null;
            });

            behavior.behavesLikeAShortcut(context);

            it ("Minimizes focused app when clicked", function () {
                // focus the app
                testDom.focusApp(appsWrapper.find("#"+appProps.id).get(0));
                // app should now be focused
                testDom.assertFocused(appsWrapper, `#${appProps.id}`);
                // click app in taskbar
                testDom.click(
                    appsWrapper.find(".orcus-taskbar .orcus-shortcut").get(0)
                );
                // app should be minimized
                assert.lengthOf(
                    appsWrapper.find(".orcus-window.minimized"),
                    1,
                    "Missing node with .orcus-window.minimized class"
                );
            });

            it ("Restores minimized app when clicked", function () {
                // click minimize button
                testDom.click(
                    appsWrapper.find(".orcus-title-bar .orcus-ui.orcus-button.orcus-minimize").get(0)
                );
                // app should be minimized
                assert.lengthOf(
                    appsWrapper.find(".orcus-window.minimized"),
                    1,
                    "Missing node with .orcus-window.minimized class"
                );
                // click app in taskbar
                testDom.click(
                    appsWrapper.find(".orcus-taskbar .orcus-shortcut").get(0)
                );
                // app should be restored
                assert.lengthOf(
                    appsWrapper.find(".orcus-window.minimized"),
                    0,
                    "Found unexpected node with .orcus-window.minimized class"
                );
                //restoring app should also focus app
                // app should now be focused
                testDom.assertFocused(appsWrapper, ".orcus-app");
            });

            it ("Focuses app when clicked", function () {
                // render desktop with two open apps
                var renderResult = rtl.render(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        [
                            h(App, Object.assign({}, appPropsNoId, {initialFocused: 1, initialOpened: true, id: "first-app", slug: "first-app"})),
                            h(App, Object.assign({}, appPropsNoId, {initialFocused: 2, initialOpened: true, id: "second-app", slug: "second-app"})),
                            h(App, Object.assign({}, appPropsNoId, {initialFocused: 3, initialOpened: true, id: "third-app", slug: "third-app"})),
                            h(App, Object.assign({}, appPropsNoId, {initialFocused: 4, initialOpened: true, id: "fourth-app", slug: "fourth-app"}))
                        ]
                    )),
                    appsWrapper = jQuery(renderResult.container);
                // focus third app                          -> 3rd, 1st, 2nd, 4th
                testDom.focusApp(appsWrapper.find("#third-app").get(0));
                // first app should NOT be focused
                assert.lengthOf(
                    appsWrapper.find("#first-app:focus"),
                    0,
                    "Found unexpected focused app"
                );
                //first app should be second place in queue
                testDom.assertFocusedIndex(appsWrapper, "#first-app", 1);
                // click on the fourth app in the taskbar   -> 4th, 3rd, 1st, 2nd
                testDom.click(
                    appsWrapper.find("#orcus-taskbar-shortcut-fourth-app").get(0)
                );
                // fourth app should now be focused
                testDom.assertFocused(appsWrapper, "#fourth-app");
                //first app should be third place in queue
                testDom.assertFocusedIndex(appsWrapper, "#first-app", 2);
            });
        });
    });
});
