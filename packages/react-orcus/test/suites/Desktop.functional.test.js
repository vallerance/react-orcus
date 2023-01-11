/* eslint-disable no-undef */
/* eslint-disable strict */
/* Desktop.functional.test.js
 * Tests functionality of Desktop component
 * Dependencies: assert, jquery, react-testing-library, react-hyperscript modules, mocha context
 * Author: Joshua Carter
 * Created: December 7, 2019
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
    } = require('../../../../dist/packages/react-orcus/build/index.js');

//begin mocha tests
describe('<Desktop /> should render', function () {
    var extraProps = {
            className: 'custom-class',
            id: 'custom-id',
            'data-prop': 'prop-val',
        },
        appProps = {
            slug: 'test-app',
            name: 'Test App',
            className: 'custom-class',
            id: 'custom-app-id',
            icon: 'fa:home',
        },
        desktopWrapper = null;

    beforeEach(function () {
        var renderResult = rtl.render(
            h(Desktop, Object.assign({}, extraProps))
        );
        desktopWrapper = jQuery(renderResult.container);
    });

    afterEach(function () {
        //destroy wrappers
        desktopWrapper = null;
        //cleanup
        rtl.cleanup();
    });

    describe('Desktop with', function () {
        it('Library class names', function () {
            assert.lengthOf(
                desktopWrapper.find('.orcus-desktop'),
                1,
                'Missing node with orcus-desktop class'
            );
            assert.lengthOf(
                desktopWrapper.find('.orcus-desktop-content'),
                1,
                'Missing node with orcus-desktop-content class'
            );
        });

        it('Transfered class name', function () {
            assert.include(
                desktopWrapper.find('.orcus-desktop').get(0).className,
                extraProps.className
            );
        });

        it('Other transfered props', function () {
            assert.equal(
                desktopWrapper.find('.orcus-desktop').eq(0).data('prop'),
                extraProps['data-prop']
            );
            assert.equal(
                desktopWrapper.find('.orcus-desktop')[0].id,
                extraProps.id
            );
        });

        it('Default id', function () {
            //render desktop with no given id
            var renderResult = rtl.render(h(Desktop, {}));
            //should include default id
            assert.include(
                renderResult.container.firstChild.id,
                'orcus-desktop-'
            );
        });

        it('Unique default id', function () {
            //render two desktops with no given id
            var renderResult1 = rtl.render(h(Desktop, {})),
                renderResult2 = rtl.render(h(Desktop, {}));
            //should include default id
            assert.notEqual(
                renderResult1.container.firstChild.id,
                renderResult2.container.firstChild.id
            );
        });
    });

    describe('Program Menu', function () {
        var menuWrapper = null;

        beforeEach(function () {
            var renderResult = rtl.render(
                h(Desktop, Object.assign({}, extraProps))
            );
            menuWrapper = jQuery(renderResult.container);
        });

        afterEach(function () {
            //destroy wrapper
            menuWrapper = null;
        });

        it('With class name', function () {
            assert.lengthOf(
                menuWrapper.find('.orcus-program-menu'),
                1,
                'Missing node with orcus-program-menu class'
            );
        });

        it('Unless prop is false', function () {
            //render desktop with no program menu
            var renderResult = rtl.render(h(Desktop, { programMenu: false }));
            //should contain no program menu
            assert.lengthOf(
                jQuery(renderResult.container.firstChild).find(
                    '.orcus-program-menu'
                ),
                0,
                'Found unexpected node with orcus-program-menu class'
            );
        });
    });

    describe('<App /> components', function () {
        var appsWrapper = null;

        beforeEach(function () {
            var renderResult = rtl.render(
                h(
                    Desktop,
                    Object.assign({}, extraProps),
                    h(App, Object.assign({ initialOpened: true }, appProps))
                )
            );
            appsWrapper = jQuery(renderResult.container);
        });

        afterEach(function () {
            //destroy wrapper
            appsWrapper = null;
        });

        it('With class name', function () {
            assert.lengthOf(
                appsWrapper.find('.orcus-app'),
                1,
                'Missing node with orcus-app class'
            );
        });
    });
});
