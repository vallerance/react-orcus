/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: 
    - modules: react, prop-types, iconify, reselect, react-rnd
    - components: OrcusUiButton
    - other: OrcusApp class, reduxConventionalConnect function
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
import Iconify from '@iconify/iconify';
import { createSelector } from 'reselect';
import { Rnd } from 'react-rnd';
//import redux models and actions
import Desktop, { focusApp, blurApp } from './redux/models/Desktop.js';
import AppModel, { closeApp, minimizeApp, updateApp, DEFAULT_ID } from './redux/models/OrcusApp.js';
//import components
import { OrcusUiButton } from './OrcusUiButton.js';
//import functions
import { reduxConventionalConnect } from './util/reduxConventionalConnect.js';
//create our OrcusApp class
var OrcusApp = class extends React.Component {
    
    //define default props
    static defaultProps = {
        className: "",
        id: DEFAULT_ID,
        
        icon: "fa:home",
        initialOpened: false,
        initialPosition: [0, 0, 100, 100],
        
        focused: false,
        minimized: false,
        opened: false
    };
    //define props
    static propTypes = {
        //custom html props
        className: PropTypes.string,
        id: PropTypes.string,
        //component props
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        initialOpened: PropTypes.bool,
        initialPosition: PropTypes.arrayOf(PropTypes.number),
        //state props
        focused: PropTypes.bool,
        minimized: PropTypes.bool,
        opened: PropTypes.bool,
        desktopModelId: PropTypes.string.isRequired,
        //dispatch props
        closeApp: PropTypes.func.isRequired,
        minimizeApp: PropTypes.func.isRequired,
        updateApp: PropTypes.func.isRequired,
        focusApp: PropTypes.func.isRequired,
        blurApp: PropTypes.func.isRequired
    };

    //define selectors
    static selectApp = (state, ownProps) => AppModel.select.app(state, ownProps.slug);
    static selectDesktop = state => Desktop.select.singleDesktop(state)
    static selectFocusedApp = createSelector(
        state => state,
        this.selectDesktop,
        (state, desktop) => Desktop.select.focusedApp(state, desktop.id)
    );  
    static selectAppProps = createSelector(
        this.selectApp,
        this.selectDesktop,
        this.selectFocusedApp,
        (state, ownProps) => ownProps,
        function (app, desktop, focusedApp, ownProps) {
            var {
                    minimized, opened
                } = app || AppModel.getInitialStateFromProps(ownProps),
                focused = focusedApp && app.slug == focusedApp.slug,
                desktopModelId = desktop.id;
            return {
                desktopModelId, focused, minimized, opened
            };
        }
    );
    
    //map dispatch and state to props
    static mapDispatchToProps = { closeApp, minimizeApp, updateApp, focusApp, blurApp };
    static mapStateToProps = this.selectAppProps;
    
    //INSTANCE PROPS
    //bind event handlers
    #handleFocus = this.handleFocus.bind(this);
    #handleBlur = this.handleBlur.bind(this);
    #handleMaximizeClick = this.handleMaximizeClick.bind(this);
    #handleMinimizeClick = this.handleMinimizeClick.bind(this);
    #handleRestoreClick = this.handleRestoreClick.bind(this);
    #handleCloseClick = this.handleCloseClick.bind(this);
    //init state
    state = {
        maximized: false
    };
    //create default id
    #defaultId = "orcus-app-" + Math.floor(Math.random() * 10000);
    
    componentDidUpdate (prevProps) {
        var update = {},
            props = this.props,
            element = document.getElementById(this.getId());
        // check for prop changes
        ["name", "icon", "id"].forEach(function (prop) {
            if (props[prop] != prevProps[prop]) {
                update[prop] = props[prop];
            }
        });
        // if we have updates, update our store
        if (Object.keys(update).length > 0) {
            this.props.updateApp({
                slug: this.props.slug,
                props: update
            });
        }
        // check for state prop changes
        // focus/blur
        if (props.focused != prevProps.focused) {
            // if our state is focused, but our element is NOT
            if (props.focused && element != document.activeElement) {
                // then focus our element
                element.focus();
            }
            // if our state is NOT focused, but our element is
            if (!props.focused && element == document.activeElement) {
                // then blur our element
                element.blur();
            }
        }
        /*
        // restore
        if (prevProps.minimized && !props.minimized) {
            // focus ourselves when we are restored
            element.focus();
        }
        // open
        if (!prevProps.opened && props.opened) {
            // focus ourselves when we are opened
            
        }
        */
    }

    getId () {
        return (this.props.id == DEFAULT_ID) ? this.#defaultId : this.props.id;
    }
    
    render () {
        var className = "orcus-app orcus-window " + this.props.className,
            //get id, either property or default
            id = this.getId(),
            {
                slug, name, icon, initialOpened, initialPosition,
                desktopModelId, focused, minimized, opened,
                closeApp, minimizeApp, updateApp, focusApp, blurApp,
                ...props
            } = this.props,
            [x, y, width, height] = initialPosition,
            restoreMaximizeContent = "";
        
        //if we are closed
        if (!this.props.opened) {
            //render nothing
            return null;
        }
        
        //if we are maximized
        if (this.state.maximized) {
            //show restore button
            restoreMaximizeContent = (
                <OrcusUiButton
                    className="orcus-restore" key="restore"
                    onClick={this.#handleRestoreClick}
                >
                    <i className="iconify" data-icon="fa:window-restore" />    
                </OrcusUiButton>
            );
        }
        else {
            //show maximize button
            restoreMaximizeContent = (
                <OrcusUiButton
                    className="orcus-maximize" key="maximize"
                    onClick={this.#handleMaximizeClick}
                >
                    <i className="iconify" data-icon="fa:window-maximize" />    
                </OrcusUiButton>
            );
        }
        
        //if we are minimized
        if (this.props.minimized) {
            //add minimize class
            className += " minimized";
        }
        
        //render
        return (
            <Rnd
                {...props} className={className} id={id} tabIndex="0"
                default={{x, y, width, height}}
                dragHandleClassName="orcus-title-bar"
                resizeHandleClasses={{
                    top: "orcus-resize-handle top",
                    right: "orcus-resize-handle right",
                    bottom: "orcus-resize-handle bottom",
                    left: "orcus-resize-handle left",
                    topRight: "orcus-resize-handle top right",
                    bottomRight: "orcus-resize-handle bottom right",
                    bottomLeft: "orcus-resize-handle bottom left",
                    topLeft: "orcus-resize-handle top left"
                }}
                onFocus={this.#handleFocus}
                onBlur={this.#handleBlur}
            >
                <header className="orcus-title-bar">
                    <h2 className="orcus-title">
                        {this.props.name}
                    </h2>
                    
                    <p className="orcus-controls">
                        <OrcusUiButton
                            className="orcus-minimize"
                            onClick={this.#handleMinimizeClick}
                        >
                            <i className="iconify" data-icon="fa:window-minimize" />    
                        </OrcusUiButton>
            
                        {restoreMaximizeContent}
            
                        <OrcusUiButton className="orcus-close" onClick={this.#handleCloseClick}>
                            <i className="iconify" data-icon="fa:close" />    
                        </OrcusUiButton>
                    </p>
                </header>
                
                <section className="orcus-client-area">
                    {this.props.children}
                </section>
            </Rnd>
        );
    }
    
    handleFocus (e) {
        //if we are NOT currently focused
        if (!this.props.focused) {
            //we need to be
            this.props.focusApp({
                id: this.props.desktopModelId,
                slug: this.props.slug
            });
        }
    }
    
    handleBlur (e) {
        //first, check if this is a valid blur
        //if the element gaining focus is a taskbar shortcut
        if (
            e.relatedTarget instanceof window.Element &&
            e.relatedTarget.closest(".orcus-taskbar .orcus-shortcut")
        ) {
            //If it is ours, then it should not steal focus from us. If it is
            //another app's, it is fine to retain focus for now; the click
            //handler of the shortcut will focus the other app shortly
            e.preventDefault();
            e.target.focus();
            return;
        }
        //else, if we are losing focus to ourselves
        if (e.relatedTarget == e.target) {
            //this is probably because we are being focused by the above code
            //get out of this loop
            return;
        }   //else, we are legitimately losing focus 
        //if we are currently focused
        if (this.props.focused) {
            //relax
            this.props.blurApp({
                id: this.props.desktopModelId,
                slug: this.props.slug
            });
        }
    }
    
    handleMaximizeClick (e) {
        this.setState({maximized: true});
    }

    handleMinimizeClick (e) {
        //dispatch minimize action
        this.props.minimizeApp({slug: this.props.slug});
    }
    
    handleRestoreClick (e) {
        this.setState({maximized: false});
    }

    handleCloseClick (e) {
        //dispatch close action
        this.props.closeApp({slug: this.props.slug});
    }
};
//export OrcusApp class
var Connected = reduxConventionalConnect(OrcusApp);
export { Connected as OrcusApp, OrcusApp as OrcusAppUnit };
