/* App.headless.test.js
 * Tests <Orcus.App /> functionality in headless browser environment
 * Dependencies: assert, sinon, stainless-player, react, react-testing-library modules, mocha context
 * Author: Joshua Carter
 * Created: March 1, 2020
 */
"use strict";

var assert = require('../util/extendedChai.util.js').assert,
    jQuery = require('jquery'),
    h = require('react-hyperscript'),
    rtl = require("@testing-library/react"),
    //rtl = require("react-testing-library"),
    TestRenderer = require('react-test-renderer'),
    {Desktop, App} = require('../../build/index.js'),
    {Provider} = require("react-redux");

var renderApp = function (...args) {
        //mount dekstop
        var mountedDesktop = TestRenderer.create(
            h(
                Desktop, {}, h(...args)
            )
        );
        //render app, wrapped in a provider
        return rtl.render(h(
            Provider,
            {store: mountedDesktop.getInstance().reduxStore},
            h(
                "div",
                {style: {position: "relative"}},
                h(...args)
            )
        ));        
    },
    simulateDrag = function (
        elem,
        {
            left: startLeft=0,
            top: startTop=0
        },
        {
            left: endLeft=100,
            top: endTop=100
        },
        steps=5
    ) {
        //calculate step
        var moveStep = {
            left: (endLeft - startLeft)/steps,
            top: (endTop - startTop)/steps,
        };
        //start the drag
        rtl.fireEvent.mouseDown(elem, {
            bubbles: true,
            clientX: startLeft,
            clientY: startTop
        });
        //perform the drag over the specified number of steps
        for (let i=0; i<steps; i++) {
            //perform current step
            rtl.fireEvent.mouseMove(elem, {
                bubbles: true,
                clientX: Math.round(startLeft + moveStep.left * (i+1)),
                clientY: Math.round(startTop + moveStep.top * (i+1))
            });
        }
        //end the drag
        rtl.fireEvent.mouseUp(elem, {
            bubbles: true,
            clientX: endLeft,
            clientY: endTop
        });
    };

describe ('<App /> in browser should render', function () {
    var reqProps = {
            name: "Test App",
            slug: "test-app"
        },
        extraProps = Object.assign({}, reqProps, {
            className: "custom-class",
            id: "custom-id",
            "data-prop": "prop-val",
            initialPosition: [50, 75, 200, 150]
        }),
        reqPropsOpened = Object.assign({initialOpened: true}, reqProps),
        extraPropsOpened = Object.assign({initialOpened: true}, extraProps),
        appWrapper = null;
            
    beforeEach (function () {
        var renderResult = renderApp(App, extraPropsOpened);
        appWrapper = jQuery(renderResult.container);
        // set dimensions of wrapper
        appWrapper.width(500);
        appWrapper.height(500);
        // set relative positioning of wrapper
        //appWrapper.css("position", "relative");
    });

    afterEach (function () {
        //destroy wrappers
        appWrapper = null;
        //cleanup
        rtl.cleanup();
    });

    describe ('App that', function () {
        it ("Can be resized", function () {
            //get app 
            var app = appWrapper.find(".orcus-app"),
                //get size of app
                appSize = {
                    width: app.width(),
                    height: app.height()
                },
                //get resize handles
                rightHandle = app.find(".orcus-resize-handle.right"),
                rightPos = rightHandle.offset(),
                bottomHandle = app.find(".orcus-resize-handle.bottom"),
                bottomPos = bottomHandle.offset(),
                topLeftHandle = app.find(".orcus-resize-handle.top.left"),
                topLeftPos = topLeftHandle.offset(),
                sizeTolerance = 2;
            //perform a drag on the right handle, 200px over
            simulateDrag(
                rightHandle.get(0),
                {left: rightPos.left+2, top: rightPos.top+20},
                {left: rightPos.left+202, top: rightPos.top+20}
            );
            //app should be wider
            assert.isAbout(app.width(), appSize.width + 200, sizeTolerance);
            //perform a drag on the bottom handle, 100px down
            simulateDrag(
                bottomHandle.get(0),
                {left: bottomPos.left+20, top: bottomPos.top+2},
                {left: bottomPos.left+20, top: bottomPos.top+102}
            );
            //app should be taller
            assert.isAbout(app.height(), appSize.height + 100, sizeTolerance);
            //update app size
            appSize = {
                width: app.width(),
                height: app.height()
            };  
            //perform a drag on the top left handle, 100px over, 50px down
            simulateDrag(
                topLeftHandle.get(0),
                {left: topLeftPos.left+2, top: topLeftPos.top+2},
                {left: topLeftPos.left+102, top: topLeftPos.top+52}
            );
            //app should be narrower and shorter
            assert.isAbout(app.width(), appSize.width - 100, sizeTolerance);
            assert.isAbout(app.height(), appSize.height - 50, sizeTolerance);
        });
        
        it ("Can NOT be dragged from anywhere BUT the title bar", function () {
            //get app 
            var app = appWrapper.find(".orcus-app"),
                //get position of app
                appPos = app.offset(),
                //get client area and position
                clientArea = app.find(".orcus-client-area"),
                clientPos = clientArea.offset();
            //perform a drag on the client area, 200px over, 100px down
            simulateDrag(
                clientArea.get(0),
                {left: clientPos.left+50, top: clientPos.top+10},
                {left: clientPos.left+250, top: clientPos.top+110}
            );
            //app should NOT have moved
            assert.isAbout(app.offset().left, appPos.left);
            assert.isAbout(app.offset().top, appPos.top);
        });
        
        it ("Has the correct size and position", function () {
            var [testLeft, testTop, testWidth, testHeight] = extraProps.initialPosition,
                //get wrapper pos
                wrapperPos = appWrapper.offset(),
                //get app 
                app = appWrapper.find(".orcus-app"),
                //get position of app
                appPos = app.offset(),
                //get size of app
                appSize = {
                    width: app.width(),
                    height: app.height()
                };
            assert.equal(appPos.left - wrapperPos.left, testLeft);
            assert.equal(appPos.top - wrapperPos.top, testTop);
            assert.equal(appSize.width, testWidth);
            assert.equal(appSize.height, testHeight);
        });
    });
    
    describe ('Title bar that', function () {
        it ("Moves the app window when dragged", function () {
            //get app 
            var app = appWrapper.find(".orcus-app"),
                //get position of app
                appPos = app.offset(),
                //get title bar and position
                titleBar = app.find(".orcus-title-bar"),
                barPos = titleBar.offset();
            //perform a drag, 200px over, 100px down
            simulateDrag(
                titleBar.get(0),
                {left: barPos.left+50, top: barPos.top+10},
                {left: barPos.left+250, top: barPos.top+110}
            );
            //app should have moved
            assert.isAbout(app.offset().left, appPos.left + 200);
            assert.isAbout(app.offset().top, appPos.top + 100);
        });
    })
});


