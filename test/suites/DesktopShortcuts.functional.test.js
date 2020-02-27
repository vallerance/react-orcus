/* DesktopShortcuts.functional.test.js
 * Tests functionality of Desktop component
 * Dependencies: assert, jquery, react-testing-library, react-hyperscript modules, mocha context
 * Author: Joshua Carter
 * Created: Februrary 23, 2020
 */
"use strict";
//include dependencies
var assert = require('chai').assert,
    jQuery = require('jquery'),
    h = require('react-hyperscript'),
    rtl = require("@testing-library/react"),
    //rtl = require("react-testing-library"),
    {Desktop, App} = require('../../build/index.js');

//begin mocha tests
describe ('<Desktop /> should render shortcuts', function () {
    var extraProps = {
            className: "custom-class",
            id: "custom-id",
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
        shortcutsWrapper = null;

    beforeEach (function () {
        var renderResult = rtl.render(h(Desktop, Object.assign({}, extraProps)));
        shortcutsWrapper = jQuery(renderResult.container); 
    });

    afterEach (function () {
        //destroy wrapper
        shortcutsWrapper = null;
        //cleanup
        rtl.cleanup();
    });

    it ("With class name", function () {
        assert.lengthOf(
            shortcutsWrapper.find(".orcus-shortcuts"),
            1,
            "Missing node with orcus-shortcuts class"
        );
    });

    it ("Unless prop is false", function () {
        //render desktop with no shortcuts
        var renderResult = rtl.render(h(Desktop, {shortcuts: false}));
        //should contain no shortcuts
        assert.lengthOf(
            jQuery(renderResult.container).find(".orcus-shortcuts"),
            0,
            "Found unexpected node with orcus-shortcuts class"
        );
    });

    describe ("That for every app", function () {
        var appsShortcutsWrapper = null;

        beforeEach (function () {
            var renderResult = rtl.render(h(
                Desktop,
                Object.assign({}, extraProps),
                h(App, appProps)
            ));
            appsShortcutsWrapper = jQuery(renderResult.container); 
        });

        afterEach (function () {
            //destroy wrapper
            appsShortcutsWrapper = null;
        });

        describe ("Has", function () {
            it ("Class name", function () {
                assert.lengthOf(
                    appsShortcutsWrapper.find(".orcus-desktop-shortcut"),
                    1,
                    "Missing node with orcus-desktop-shortcut class"
                );
            });

            it ("Custom id", function () {
                assert.equal(
                    appsShortcutsWrapper.find(".orcus-desktop-shortcut")[0].id,
                    `orcus-desktop-shortcut-${appProps.id}`
                );
            });

            it ("Unique default id", function () {
                //render two apps with no given id
                var renderResult1 = rtl.render(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        h(App, appPropsNoId)
                    )),
                    wrapper1 = jQuery(renderResult1.container.firstChild),
                    renderResult2 = rtl.render(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        h(App, appPropsNoId)
                    )),
                    wrapper2 = jQuery(renderResult2.container.firstChild);
                //should include default id
                assert.include(wrapper1.find(".orcus-desktop-shortcut")[0].id, "orcus-desktop-shortcut-");
                //should inculde default id
                assert.notEqual(
                    wrapper1.find(".orcus-desktop-shortcut")[0].id,
                    wrapper2.find(".orcus-desktop-shortcut")[0].id
                );
            });

            describe ("Icon with", function () {
                it ("Class name", function () {
                    assert.lengthOf(
                        appsShortcutsWrapper.find(".orcus-desktop-shortcut .orcus-ui.orcus-icon"),
                        1,
                        "Missing node with orcus-icon class"
                    );
                });

                it ("Iconify icon", function () {
                    var selector = ".orcus-desktop-shortcut .orcus-ui.orcus-icon .iconify";
                    assert.lengthOf(
                        appsShortcutsWrapper.find(selector),
                        1,
                        "Missing node with iconify class"
                    );
                    assert.equal(appsShortcutsWrapper.find(selector).data("icon"), appProps.icon);
                });
                
                it ("Ability to update", function () {
                    var renderResult = rtl.render(h(
                            Desktop,
                            Object.assign({}, extraProps),
                            h(App, appProps)
                        )),
                        selector = ".orcus-desktop-shortcut .orcus-ui.orcus-icon .iconify",
                        newIcon = "fa:apple";
                    assert.equal(
                        jQuery(renderResult.container).find(selector).data("icon"),
                        appProps.icon
                    );
                    renderResult.rerender(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        h(App, Object.assign({}, appProps, {icon: newIcon}))
                    ));
                    assert.equal(
                        jQuery(renderResult.container)
                            .find(selector)
                            .get(0).dataset.icon,
                        newIcon
                    );
                });
            });

            describe ("Title with", function () {
                it ("Class name", function () {
                    assert.lengthOf(
                        appsShortcutsWrapper.find(".orcus-desktop-shortcut .orcus-title"),
                        1,
                        "Missing node with orcus-title class"
                    );
                });

                it ("Name of app", function () {
                    assert.equal(
                        appsShortcutsWrapper.find(".orcus-desktop-shortcut .orcus-title").text(),
                        appProps.name
                    );
                });
                
                it ("Ability to update", function () {
                    var renderResult = rtl.render(h(
                            Desktop,
                            Object.assign({}, extraProps),
                            h(App, appProps)
                        )),
                        newTitle = "I'm an Apple";
                    assert.equal(
                        jQuery(renderResult.container)
                            .find(".orcus-desktop-shortcut .orcus-title")
                            .text(),
                        appProps.name
                    );
                    renderResult.rerender(h(
                        Desktop,
                        Object.assign({}, extraProps),
                        h(App, Object.assign({}, appProps, {name: newTitle}))
                    ));
                    assert.equal(
                        jQuery(renderResult.container)
                            .find(".orcus-desktop-shortcut .orcus-title")
                            .text(),
                        newTitle
                    );
                });
            });
        });

        it ("Is selected when clicked", function () {
            //shortcut should not be selected
            assert.lengthOf(
                appsShortcutsWrapper.find(".orcus-desktop-shortcut.selected"),
                0,
                "Unexpected node with selected class"
            );
            //click shortcut
            rtl.fireEvent.click(
                appsShortcutsWrapper.find(".orcus-desktop-shortcut").get(0)
            );
            //shortcut should now be selected
            assert.lengthOf(
                appsShortcutsWrapper.find(".orcus-desktop-shortcut.selected"),
                1,
                "Missing node with selected class"
            );
        });

        it ("Opens app when double clicked", function () {
            //app should not be open
            assert.lengthOf(
                appsShortcutsWrapper.find(".orcus-app"),
                0,
                "Unexpected node with orcus-app class"
            );
            //double click shortcut
            rtl.fireEvent.dblClick(
                appsShortcutsWrapper.find(".orcus-desktop-shortcut").get(0)
            );
            assert.lengthOf(
                appsShortcutsWrapper.find(".orcus-app"),
                1,
                "Missing node with orcus-app class"
            );
        });
    });
});
