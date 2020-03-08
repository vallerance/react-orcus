/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: 
    - modules: react, prop-types, reselect, react-rnd
    - components: OrcusUiButton
    - other: OrcusApp class, reduxConventionalConnect function
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { Rnd } from 'react-rnd';
//import redux models and actions
import AppModel, { updateApp, closeApp, DEFAULT_ID } from './redux/models/OrcusApp.js';
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
        opened: PropTypes.bool,
        //dispatch props
        closeApp: PropTypes.func.isRequired,
        updateApp: PropTypes.func.isRequired
    };

    //define selectors
    static selectApp = (state, ownProps) => AppModel.select.app(state, ownProps.slug);
    static selectAppProps = createSelector(
        [
            this.selectApp,
            (state, ownProps) => ownProps
        ],
        function (app, ownProps) {
            var {
                opened
            } = app || AppModel.getInitialStateFromProps(ownProps);
            return {
                opened
            };
        }
    );
    
    //map dispatch and state to props
    static mapDispatchToProps = { updateApp, closeApp };
    static mapStateToProps = this.selectAppProps;
    
    //INSTANCE PROPS
    //bind event handlers
    #handleMaximizeClick = this.handleMaximizeClick.bind(this);
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
            props = this.props;
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
    }
    
    render () {
        var className = "orcus-app orcus-window " + this.props.className,
            //get id, either property or default
            id = (this.props.id == DEFAULT_ID) ? this.#defaultId : this.props.id,
            {
                slug, name, icon, initialOpened, initialPosition,
                opened, updateApp, closeApp,
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
                <OrcusUiButton className="orcus-restore" onClick={this.#handleRestoreClick}>
                    <span className="glyphicon glyphicon-resize-small" />
                </OrcusUiButton>
            );
        }
        else {
            //show maximize button
            restoreMaximizeContent = (
                <OrcusUiButton className="orcus-maximize" onClick={this.#handleMaximizeClick}>
                    <span className="glyphicon glyphicon-resize-full" />
                </OrcusUiButton>
            );
        }
        
        //render
        return (
            <Rnd
                {...props} className={className} id={id}
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
            >
                <header className="orcus-title-bar">
                    <h2 className="orcus-title">
                        {this.props.name}
                    </h2>
                    
                    <p className="orcus-controls">
                        <OrcusUiButton className="orcus-minimize">
                            <span className="glyphicon glyphicon-minus" />
                        </OrcusUiButton>
            
                        {restoreMaximizeContent}
            
                        <OrcusUiButton className="orcus-close" onClick={this.#handleCloseClick}>
                            <span className="glyphicon glyphicon-remove" />
                        </OrcusUiButton>
                    </p>
                </header>
                
                <section className="orcus-client-area">
                    {this.props.children}
                </section>
            </Rnd>
        );
    }
    
    handleMaximizeClick (e) {
        this.setState({maximized: true});
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
