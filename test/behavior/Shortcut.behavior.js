/* Shortuct.behavior.js
 * Tests behavior of a shortcut
 * Dependencies: assert, jquery, react-testing-library, react-hyperscript modules, mocha context
 * Author: Joshua Carter
 * Created: April 17, 2020
 */
"use strict";
//include dependencies
var assert = require('chai').assert,
    jQuery = require('jquery'),
    h = require('react-hyperscript'),
    rtl = require("@testing-library/react"),
    {Desktop, App} = require('../../build/index.js');

function behavesLikeAShortcut (context) {

    describe ("Has", function () {
        it ("Class name", function () {
            assert.lengthOf(
                context.appsWrapper.find(`${context.parentSelector} .orcus-shortcuts .orcus-shortcut`),
                1,
                "Missing node with orcus-shortcut class"
            );
        });

        it ("Custom id", function () {
            assert.equal(
                context.appsWrapper.find(`${context.parentSelector} .orcus-shortcut`)[0].id,
                `orcus-${context.type}-shortcut-${context.appProps.id}`
            );
        });

        it ("Unique default id", function () {
            //render two apps with no given id
            var renderResult1 = rtl.render(h(
                    Desktop,
                    Object.assign({}, context.extraProps),
                    h(App, context.appPropsNoId)
                )),
                wrapper1 = jQuery(renderResult1.container.firstChild),
                renderResult2 = rtl.render(h(
                    Desktop,
                    Object.assign({}, context.extraProps),
                    h(App, context.appPropsNoId)
                )),
                wrapper2 = jQuery(renderResult2.container.firstChild);
            //should include default id
            assert.include(wrapper1.find(`${context.parentSelector} .orcus-shortcut`)[0].id, `orcus-${context.type}-shortcut-`);
            //should inculde default id
            assert.notEqual(
                wrapper1.find(`${context.parentSelector} .orcus-shortcut`)[0].id,
                wrapper2.find(`${context.parentSelector} .orcus-shortcut`)[0].id
            );
        });

        describe ("Icon with", function () {
            it ("Class name", function () {
                assert.lengthOf(
                    context.appsWrapper.find(`${context.parentSelector} .orcus-shortcut .orcus-ui.orcus-icon`),
                    1,
                    "Missing node with orcus-icon class"
                );
            });

            it ("Iconify icon", function () {
                var selector = `${context.parentSelector} .orcus-shortcut .orcus-ui.orcus-icon .iconify`;
                assert.lengthOf(
                    context.appsWrapper.find(selector),
                    1,
                    "Missing node with iconify class"
                );
                assert.equal(context.appsWrapper.find(selector).data("icon"), context.appProps.icon);
            });

            it ("Ability to update", function () {
                var renderResult = rtl.render(h(
                        Desktop,
                        Object.assign({}, context.extraProps),
                        h(App, context.appProps)
                    )),
                    selector = `${context.parentSelector} .orcus-shortcut .orcus-ui.orcus-icon .iconify`,
                    newIcon = "fa:apple";
                assert.equal(
                    jQuery(renderResult.container).find(selector).data("icon"),
                    context.appProps.icon
                );
                renderResult.rerender(h(
                    Desktop,
                    Object.assign({}, context.extraProps),
                    h(App, Object.assign({}, context.appProps, {icon: newIcon}))
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
                    context.appsWrapper.find(`${context.parentSelector} .orcus-shortcut .orcus-title`),
                    1,
                    "Missing node with orcus-title class"
                );
            });

            it ("Name of app", function () {
                assert.equal(
                    context.appsWrapper.find(`${context.parentSelector} .orcus-shortcut .orcus-title`).text(),
                    context.appProps.name
                );
            });

            it ("Ability to update", function () {
                var renderResult = rtl.render(h(
                        Desktop,
                        Object.assign({}, context.extraProps),
                        h(App, context.appProps)
                    )),
                    newTitle = "I'm an Apple";
                assert.equal(
                    jQuery(renderResult.container)
                        .find(`${context.parentSelector} .orcus-shortcut .orcus-title`)
                        .text(),
                    context.appProps.name
                );
                renderResult.rerender(h(
                    Desktop,
                    Object.assign({}, context.extraProps),
                    h(App, Object.assign({}, context.appProps, {name: newTitle}))
                ));
                assert.equal(
                    jQuery(renderResult.container)
                        .find(`${context.parentSelector} .orcus-shortcut .orcus-title`)
                        .text(),
                    newTitle
                );
            });
        });
    });
}

exports.behavesLikeAShortcut = behavesLikeAShortcut;
