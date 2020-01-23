/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: react, prop-types modules, OrcusUiButton components
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
//import components
import { OrcusUiButton } from './OrcusUiButton.js';
//define constants
const DEFAULT_ID = "ORCUS_APP_DEFAULT_ID_VALUE_68142";
//create our OrcusApp class
var OrcusApp = class extends React.Component {
    constructor (props, context) {
        super(props, context);
        
        //bind event handlers
        this.handleMaximizeClick = this.handleMaximizeClick.bind(this);
        this.handleRestoreClick = this.handleRestoreClick.bind(this);
        
        //init state
        this.state = {
            opened: this.props.initialOpened,
            maximized: false
        };
        
        //create default id
        this.defaultId = "orcus-app-" + Math.floor(Math.random() * 10000);
    }
    
    render () {
        var className = "orcus-app orcus-window " + this.props.className,
            //get id, either property or default
            id = (this.props.id == DEFAULT_ID) ? this.defaultId : this.props.id,
            {slug, name, icon, initialOpened, initialPosition, ...props} = this.props,
            restoreMaximizeContent = "";
        
        //if we are closed
        if (!this.state.opened) {
            //render nothing
            return null;
        }
        
        //if we are maximized
        if (this.state.maximized) {
            //show restore button
            restoreMaximizeContent = (
                <OrcusUiButton className="orcus-restore" onClick={this.handleRestoreClick}>
                    <span className="glyphicon glyphicon-resize-small" />
                </OrcusUiButton>
            );
        }
        else {
            //show maximize button
            restoreMaximizeContent = (
                <OrcusUiButton className="orcus-maximize" onClick={this.handleMaximizeClick}>
                    <span className="glyphicon glyphicon-resize-full" />
                </OrcusUiButton>
            );
        }
        
        //render
        return (
            <div {...props} className={className} id={id}>
                <header className="orcus-title-bar">
                    <h2 className="orcus-title">
                        {this.props.name}
                    </h2>
                    
                    <p className="orcus-controls">
                        <OrcusUiButton className="orcus-minimize">
                            <span className="glyphicon glyphicon-minus" />
                        </OrcusUiButton>
            
                        {restoreMaximizeContent}
            
                        <OrcusUiButton className="orcus-close">
                            <span className="glyphicon glyphicon-remove" />
                        </OrcusUiButton>
                    </p>
                </header>
                
                <section className="orcus-client-area">
                    {this.props.children}
                </section>
            </div>
        );
    }
    
    handleMaximizeClick (e) {
        this.setState({maximized: true});
    }
    
    handleRestoreClick (e) {
        this.setState({maximized: false});
    }
};
//define default props
OrcusApp.defaultProps = {
    icon: "th-large",
    initialOpened: false,
    initialPosition: [0, 0, 100, 100],
    
    className: "",
    id: DEFAULT_ID
};
//define props
OrcusApp.propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    initialOpened: PropTypes.bool,
    initialPosition: PropTypes.arrayOf(PropTypes.number),
    
    className: PropTypes.string,
    id: PropTypes.string
};
//define context
OrcusApp.contextTypes = {
    
};
//export OrcusApp class
export { OrcusApp };
