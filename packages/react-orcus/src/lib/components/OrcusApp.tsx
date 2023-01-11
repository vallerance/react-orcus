// We need to import iconify in order for our icons to work
import Iconify from '@iconify/iconify';
import PropTypes from 'prop-types';
import React from 'react';
import { Rnd } from 'react-rnd';
import { OrmState } from 'redux-orm';
import { createSelector } from 'reselect';

import Desktop, { blurApp, focusApp } from '../redux/models/Desktop';
import { Schema } from '../redux/models/Model';
import AppModel, {
    closeApp,
    DEFAULT_ID,
    minimizeApp,
    updateApp,
} from '../redux/models/OrcusApp';
import {
    ConnectedComponent,
    reduxConventionalConnect,
} from '../util/reduxConventionalConnect';
import { OrcusUiButton } from './OrcusUiButton';

const _ = Iconify;

type OrcusAppProps = {
    //custom html props
    className?: string;
    id: string;
    style?: object;
    //component props
    slug: string;
    name: string;
    icon: string;
    initialFocused: boolean | number;
    initialOpened: boolean;
    initialPosition: [number, number, number, number];
    children?: React.ReactNode;
    //state props
    focused: boolean;
    focusIndex: number;
    minimized: boolean;
    opened: boolean;
    position: [number, number, number, number];
    //redux props
    desktopModelId?: string;
    //redux actions
    closeApp: (props: object) => void;
    focusApp: (props: object) => void;
    blurApp: (props: object) => void;
    minimizeApp: (props: object) => void;
    updateApp: (props: object) => void;
};

//create our OrcusApp class
class OrcusApp extends React.Component<OrcusAppProps> {
    //define default props
    static defaultProps = {
        className: '',
        id: DEFAULT_ID,
        style: {},

        icon: 'fa:home',
        initialFocused: false,
        initialOpened: false,
        initialPosition: [0, 0, 100, 100],

        focused: false,
        minimized: false,
        opened: false,
    };
    //define props
    static propTypes = {
        //custom html props
        className: PropTypes.string,
        id: PropTypes.string,
        style: PropTypes.object,
        //component props
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        initialFocused: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        initialOpened: PropTypes.bool,
        initialPosition: PropTypes.arrayOf(PropTypes.number),
        //state props
        focused: PropTypes.bool,
        focusIndex: PropTypes.number,
        minimized: PropTypes.bool,
        opened: PropTypes.bool,
        desktopModelId: PropTypes.string.isRequired,
        //dispatch props
        closeApp: PropTypes.func.isRequired,
        minimizeApp: PropTypes.func.isRequired,
        updateApp: PropTypes.func.isRequired,
        focusApp: PropTypes.func.isRequired,
        blurApp: PropTypes.func.isRequired,
    };

    //define selectors
    static selectApp = (state: OrmState<Schema>, ownProps: OrcusAppProps) =>
        AppModel.select.app(state, ownProps.slug);
    static selectDesktop = (state: OrmState<Schema>) =>
        Desktop.select.singleDesktop(state);
    static selectFocusedSlug = createSelector(
        (state: OrmState<Schema>) => state,
        this.selectDesktop,
        (state, desktop) =>
            Desktop.select.focusedAppSlug(
                state,
                (desktop as unknown as { id: string }).id
            )
    );
    static selectFocusIndex = createSelector(
        (state: OrmState<Schema>) => state,
        (_: unknown, ownProps: OrcusAppProps) => ownProps,
        this.selectDesktop,
        (state, ownProps, desktop) => {
            return Desktop.select.focusIndex(
                state,
                (desktop as unknown as { id: string }).id,
                ownProps.slug
            );
        }
    );
    static selectAppProps = createSelector(
        this.selectApp,
        this.selectDesktop,
        this.selectFocusedSlug,
        this.selectFocusIndex,
        (state: OrmState<Schema>, ownProps: OrcusAppProps) => ownProps,
        function (app, desktop, focusedSlug, focusIndex, ownProps) {
            const { minimized, opened } = (app ||
                    AppModel.getInitialStateFromProps(
                        ownProps
                    )) as unknown as OrcusApp & {
                    minimized: boolean;
                    opened: boolean;
                },
                focused =
                    focusedSlug &&
                    (app as unknown as OrcusApp & { slug: string }).slug ===
                        focusedSlug &&
                    opened,
                desktopModelId = (desktop as unknown as { id: string }).id;
            return {
                desktopModelId,
                focused,
                focusIndex,
                minimized,
                opened,
            };
        }
    );

    //map dispatch and state to props
    static mapDispatchToProps = {
        closeApp,
        minimizeApp,
        updateApp,
        focusApp,
        blurApp,
    };
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
    override state = {
        maximized: false,
    };
    //config
    #focusBaseZIndex = 500;
    //create default id
    #defaultId = 'orcus-app-' + Math.floor(Math.random() * 10000000);

    override componentDidUpdate(prevProps: OrcusAppProps) {
        const update: Partial<OrcusAppProps> = {},
            props = this.props,
            element = document.getElementById(this.getId());
        // check for prop changes
        ['name', 'icon', 'id'].forEach(it => {
            const prop = it as 'name' | 'icon' | 'id';
            if (props[prop] !== prevProps[prop]) {
                update[prop] = props[prop];
            }
        });
        // if we have updates, update our store
        if (Object.keys(update).length > 0) {
            this.props.updateApp({
                slug: this.props.slug,
                props: update,
            });
        }
        // check for state prop changes
        // focus/blur
        if (props.focused !== prevProps.focused) {
            // if our state is focused, but our element is NOT
            if (props.focused && element !== document.activeElement) {
                // if we have been rendered correctly
                if (element) {
                    // then focus our element
                    element.focus({ preventScroll: true });
                } else {
                    console.warn(
                        "ORCUS: Tried to focus an app that wasn't rendered.",
                        Object.assign({}, this.props)
                    );
                }
            }
            // if our state is NOT focused, but our element is
            if (
                !props.focused &&
                element &&
                element === document.activeElement
            ) {
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

    getId() {
        return this.props.id === DEFAULT_ID ? this.#defaultId : this.props.id;
    }

    override render() {
        let className = 'orcus-app orcus-window ' + this.props.className;
        //get id, either property or default
        const id = this.getId(),
            {
                slug: _1,
                name: _2,
                icon: _3,
                initialFocused: _4,
                initialOpened: _5,
                initialPosition,
                desktopModelId: _7,
                focused: _8,
                focusIndex,
                minimized: _9,
                opened: _10,
                position: _11,
                closeApp: _12,
                minimizeApp: _13,
                updateApp: _14,
                focusApp: _15,
                blurApp: _16,
                ...props
            } = this.props,
            [x, y, width, height] = initialPosition;
        let restoreMaximizeContent;
        const style = Object.assign({}, this.props.style, {
            zIndex: this.#focusBaseZIndex + 99 - focusIndex,
        });

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
                    className="orcus-restore"
                    key="restore"
                    onClick={this.#handleRestoreClick}
                >
                    <i className="iconify" data-icon="fa:window-restore" />
                </OrcusUiButton>
            );
        } else {
            //show maximize button
            restoreMaximizeContent = (
                <OrcusUiButton
                    className="orcus-maximize"
                    key="maximize"
                    onClick={this.#handleMaximizeClick}
                >
                    <i className="iconify" data-icon="fa:window-maximize" />
                </OrcusUiButton>
            );
        }

        //if we are minimized
        if (this.props.minimized) {
            //add minimize class
            className += ' minimized';
        }

        //render
        return (
            <Rnd
                {...props}
                className={className}
                id={id}
                style={style}
                tabIndex="0"
                default={{ x, y, width, height }}
                dragHandleClassName="orcus-title-bar"
                resizeHandleClasses={{
                    top: 'orcus-resize-handle top',
                    right: 'orcus-resize-handle right',
                    bottom: 'orcus-resize-handle bottom',
                    left: 'orcus-resize-handle left',
                    topRight: 'orcus-resize-handle top right',
                    bottomRight: 'orcus-resize-handle bottom right',
                    bottomLeft: 'orcus-resize-handle bottom left',
                    topLeft: 'orcus-resize-handle top left',
                }}
                onFocus={this.#handleFocus}
                onBlur={this.#handleBlur}
            >
                <header className="orcus-title-bar">
                    <h2 className="orcus-title">{this.props.name}</h2>

                    <p className="orcus-controls">
                        <OrcusUiButton
                            className="orcus-minimize"
                            onClick={this.#handleMinimizeClick}
                        >
                            <i
                                className="iconify"
                                data-icon="fa:window-minimize"
                            />
                        </OrcusUiButton>

                        {restoreMaximizeContent}

                        <OrcusUiButton
                            className="orcus-close"
                            onClick={this.#handleCloseClick}
                        >
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

    handleFocus() {
        //if we are NOT currently focused
        if (!this.props.focused) {
            //we need to be
            this.props.focusApp({
                id: this.props.desktopModelId,
                slug: this.props.slug,
            });
        }
    }

    handleBlur(e: React.MouseEvent) {
        //first, check if this is a valid blur
        //if the element gaining focus is a taskbar shortcut
        if (
            e.relatedTarget instanceof window.Element &&
            e.relatedTarget.closest('.orcus-taskbar .orcus-shortcut')
        ) {
            //If it is ours, then it should not steal focus from us. If it is
            //another app's, it is fine to retain focus for now; the click
            //handler of the shortcut will focus the other app shortly
            e.preventDefault();
            (e.target as HTMLElement)?.focus();
            return;
        }
        //else, if we are losing focus to ourselves
        if (e.relatedTarget === e.target) {
            //this is probably because we are being focused by the above code
            //get out of this loop
            return;
        } //else, we are legitimately losing focus

        /*
         * Previously, we would blur our state on a DOM blur.
         * However, now bluring our state sends our app backward in the queue.
         * The subsequent focusing of another app would result in our app being
         * sent back twice.
         * For now, we're going to decouple DOM blurs from state blurs.
         *
         
        //if we are currently focused
        if (this.props.focused) {
            //relax
            this.props.blurApp({
                id: this.props.desktopModelId,
                slug: this.props.slug
            });
        }
        
         */
    }

    handleMaximizeClick() {
        this.setState({ maximized: true });
    }

    handleMinimizeClick() {
        //dispatch minimize action
        this.props.minimizeApp({ slug: this.props.slug });
    }

    handleRestoreClick() {
        this.setState({ maximized: false });
    }

    handleCloseClick() {
        //dispatch close action
        this.props.closeApp({ slug: this.props.slug });
    }
}
//export OrcusApp class
const Connected = reduxConventionalConnect(
    OrcusApp as unknown as ConnectedComponent
);
export { Connected as OrcusApp, OrcusApp as OrcusAppUnit };
export default Connected;
