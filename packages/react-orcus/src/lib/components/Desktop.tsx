import { configureStore } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { OrmState } from 'redux-orm';

import DesktopModel from '../redux/models/Desktop';
import { Schema } from '../redux/models/Model';
import AppModel, { createApp, destroyApp } from '../redux/models/OrcusApp';
import ormReducer, { orm } from '../redux/ormReducer';
import Styles from '../styles';
import { DesktopShortcuts } from './DesktopShortcuts';
import { OrcusApp } from './OrcusApp';
import { Taskbar } from './Taskbar';

//define constants
const DEFAULT_ID = 'ORCUS_DESKTOP_DEFAULT_ID_VALUE_392183';

type DesktopProps = {
    //custom html props
    className?: string;
    id?: string;
    //component props
    shortcuts?: boolean;
    taskbar?: boolean | 'top' | 'right' | 'bottom' | 'left';
    programMenu?: boolean;
    children?: ReactElement | ReactElement[];
};

//create our Desktop class
export class Desktop extends React.Component<DesktopProps> {
    //define default props
    static defaultProps = {
        shortcuts: true,
        taskbar: 'bottom',
        programMenu: true,

        className: '',
        id: DEFAULT_ID,
    };
    //define props
    static propTypes = {
        //custom html props
        className: PropTypes.string,
        id: PropTypes.string,
        //component props
        shortcuts: PropTypes.bool,
        taskbar: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
        ]),
        programMenu: PropTypes.bool,
    };

    //define selectors
    static selectAppSlugs = (state: OrmState<Schema>) =>
        AppModel.select.appSlug(state);

    //INSTANCE PROPS

    /*
     * The Redux State Tree
     *
     * Rather than using some sort of singleton pattern for the state tree
     * where all <Desktop /> components in a hypothetical app would share
     * the same tree, I elected to have one separate state tree for each
     * <Desktop /> component. This means that no two <Desktop />
     * components will ever share or communicate state with each other.
     * This will make it easier to allow users of the library to interact
     * with the state tree of a <Desktop /> component down the road.
     *
     * It should be noted that the vast majority of use cases for this
     * library will only include a single <Desktop /> component in the
     * entire app meaning that there would be no functional differences
     * between one shared tree and one tree per <Desktop /> component.
     *
     * Since I am going with having one state tree per <Desktop />
     * component, it makes the most sense to just create the state tree in
     * the constructor of the component itself.
     *
     */

    // create a Desktop instance for our state tree
    #initialState = orm.getEmptyState();
    #session = orm.mutableSession(this.#initialState);
    // another redux-orm method I'm not quite sure how to type
    #__create = this.#session.Desktop.create(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        DesktopModel.getInitialStateFromProps({})
    );
    // create redux store
    reduxStore = configureStore<OrmState<Schema>>({
        reducer: ormReducer,
        preloadedState: this.#initialState,
    });

    //create default id
    #defaultId = 'orcus-desktop-' + Math.floor(Math.random() * 10000000);

    updateAppList(children: React.ReactNode) {
        // get app children
        const childApps = Object.fromEntries(
                React.Children.toArray(children)
                    .filter(it => (it as ReactElement).type === OrcusApp)
                    .map(it => {
                        const props = Object.assign(
                            {},
                            OrcusApp.WrappedComponent.defaultProps,
                            (it as ReactElement).props
                        );
                        return [props.slug, props];
                    })
            ),
            childAppSlugs = Object.keys(childApps),
            //get apps from store
            existingAppSlugs = Desktop.selectAppSlugs(
                this.reduxStore.getState()
            );
        //find and remove old apps
        existingAppSlugs
            //find old apps that have been removed
            .filter(it => !childAppSlugs.includes(it))
            //remove them
            .forEach(slug => this.reduxStore.dispatch(destroyApp({ slug })));
        //find and create new apps
        childAppSlugs
            //find new apps that have just been added
            .filter(it => !existingAppSlugs.includes(it))
            //create them
            .forEach(slug =>
                this.reduxStore.dispatch(
                    createApp(
                        AppModel.getInitialStateFromProps(childApps[slug])
                    )
                )
            );
    }

    override componentDidMount() {
        // update apps
        this.updateAppList(this.props.children);
    }

    override componentDidUpdate() {
        // update apps
        this.updateAppList(this.props.children);
    }

    override render() {
        let className = 'orcus-desktop ' + this.props.className;
        //get id, either property or default
        const id =
            this.props.id === DEFAULT_ID ? this.#defaultId : this.props.id;
        const {
            shortcuts,
            taskbar: taskbarProp,
            programMenu,
            ...props
        } = this.props;
        let taskbar = taskbarProp;
        let shortcutsContent: ReactElement | null = null,
            taskbarContent: ReactElement | null = null,
            programMenuContent: ReactElement | null = null;
        if (shortcuts) {
            shortcutsContent = <DesktopShortcuts />;
        }
        if (taskbarProp === true) {
            taskbar = Desktop.defaultProps.taskbar as 'bottom';
        }
        if (taskbar) {
            className += ' taskbar-' + taskbar;
            taskbarContent = <Taskbar />;
        }
        if (programMenu) {
            programMenuContent = <div className="orcus-program-menu"></div>;
        }
        //render
        return (
            <Provider store={this.reduxStore}>
                <Styles />

                <div {...props} className={className} id={id}>
                    <div className="orcus-desktop-content">
                        {shortcutsContent}

                        {this.props.children}
                    </div>

                    {taskbarContent}

                    {programMenuContent}
                </div>
            </Provider>
        );
    }
}

//export Desktop class
export default Desktop;
