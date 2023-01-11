/* eslint-disable no-undef */
/* eslint-disable strict */
/* DesktopShortcuts.functional.test.js
 * Tests functionality of Desktop component
 * Dependencies: assert, jquery, react-testing-library, react-hyperscript modules, mocha context
 * Author: Joshua Carter
 * Created: Februrary 23, 2020
 */
'use strict';
//include dependencies
var assert = require('chai').assert,
    jQuery = require('jquery'),
    //h = require('react-hyperscript'),
    rtl = require('@testing-library/react'),
    //rtl = require("react-testing-library"),
    {
        Desktop,
        App,
    } = require('../../../../dist/packages/react-orcus/build/index.js'),
    behavior = require('../behavior/Shortcut.behavior.js');

//begin mocha tests
describe('<Desktop /> should render shortcuts', function () {
    var extraProps = {
            className: 'custom-class',
            id: 'custom-desktop-id',
            'data-prop': 'prop-val',
        },
        appPropsNoId = {
            slug: 'test-app',
            name: 'Test App',
            className: 'custom-class',
            icon: 'fa:adjust',
        },
        appProps = Object.assign(
            {
                id: 'custom-id',
            },
            appPropsNoId
        ),
        shortcutsWrapper = null;

    beforeEach(function () {
        var renderResult = rtl.render(
            h(Desktop, Object.assign({}, extraProps))
        );
        shortcutsWrapper = jQuery(renderResult.container);
    });

    afterEach(function () {
        //destroy wrapper
        shortcutsWrapper = null;
        //cleanup
        rtl.cleanup();
    });

    it('With class name', function () {
        assert.lengthOf(
            shortcutsWrapper.find('.orcus-desktop-content .orcus-shortcuts'),
            1,
            'Missing node with orcus-shortcuts class'
        );
    });

    it('Unless prop is false', function () {
        //render desktop with no shortcuts
        var renderResult = rtl.render(h(Desktop, { shortcuts: false }));
        //should contain no shortcuts
        assert.lengthOf(
            jQuery(renderResult.container).find(
                '.orcus-desktop-content .orcus-shortcuts'
            ),
            0,
            'Found unexpected node with orcus-shortcuts class'
        );
    });

    describe('That for every app', function () {
        var appsShortcutsWrapper = null,
            context = {
                type: 'desktop',
                parentSelector: '.orcus-desktop-content',
                appProps: appProps,
                extraProps: extraProps,
                appPropsNoId: appPropsNoId,
                appsWrapper: appsShortcutsWrapper,
            };

        beforeEach(function () {
            var renderResult = rtl.render(
                h(Desktop, Object.assign({}, extraProps), h(App, appProps))
            );
            appsShortcutsWrapper = context.appsWrapper = jQuery(
                renderResult.container
            );
        });

        afterEach(function () {
            //destroy wrapper
            appsShortcutsWrapper = context.appsWrapper = null;
        });

        behavior.behavesLikeAShortcut(context);

        it('Is selected when clicked', function () {
            //shortcut should not be selected
            assert.lengthOf(
                appsShortcutsWrapper.find(
                    '.orcus-desktop-content .orcus-shortcut.selected'
                ),
                0,
                'Unexpected node with selected class'
            );
            //click shortcut
            rtl.fireEvent.click(
                appsShortcutsWrapper
                    .find('.orcus-desktop-content .orcus-shortcut')
                    .get(0)
            );
            //shortcut should now be selected
            assert.lengthOf(
                appsShortcutsWrapper.find(
                    '.orcus-desktop-content .orcus-shortcut.selected'
                ),
                1,
                'Missing node with selected class'
            );
        });

        it('Opens app when double clicked', function () {
            //app should not be open
            assert.lengthOf(
                appsShortcutsWrapper.find('.orcus-app'),
                0,
                'Unexpected node with orcus-app class'
            );
            //double click shortcut
            rtl.fireEvent.dblClick(
                appsShortcutsWrapper
                    .find('.orcus-desktop-content .orcus-shortcut')
                    .get(0)
            );
            assert.lengthOf(
                appsShortcutsWrapper.find('.orcus-app'),
                1,
                'Missing node with orcus-app class'
            );
        });
    });
});
