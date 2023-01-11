import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { OrmState } from 'redux-orm';
import { createSelector } from 'reselect';

import Desktop, { focusApp } from '../redux/models/Desktop';
import { Schema } from '../redux/models/Model';
import AppModel, {
    minimizeApp,
    OrcusApp,
    restoreApp,
} from '../redux/models/OrcusApp';
import { Shortcut } from './Shortcut';

//create selectors
const selectOpenAppSlugs = createSelector(
    [
        state =>
            AppModel.select.app(state) as unknown as OrcusApp &
                {
                    opened: boolean;
                    slug: string;
                }[],
    ],
    function (apps) {
        return apps.filter(it => it.opened).map(it => it.slug);
    }
);
const selectAppMinimized = createSelector(
    [
        (state, slug) =>
            AppModel.select.app(state, slug) as unknown as OrcusApp & {
                minimized: boolean;
            },
    ],
    app => app.minimized
);

type TaskbarShortcutProps = {
    className?: string;
    active?: boolean;
    slug: string;
    desktopModelId: string;
};

//single taskbar shortcut
function TaskbarShortcut(props: TaskbarShortcutProps) {
    let className = props.className;
    const { active: _, desktopModelId: _1, ...shortcutProps } = props,
        //get our dispatch
        dispatch = useDispatch(),
        //get our minimized status
        minimized = useSelector(state => selectAppMinimized(state, props.slug));

    if (props.active) {
        className += ' active ';
    }

    function onClick() {
        if (props.active) {
            dispatch(minimizeApp({ slug: props.slug }));
        } else if (minimized) {
            dispatch(restoreApp({ slug: props.slug }));
        } else {
            dispatch(
                focusApp({
                    id: props.desktopModelId,
                    slug: props.slug,
                })
            );
        }
    }

    //render
    return (
        <Shortcut
            {...shortcutProps}
            className={className}
            idPrefix="orcus-taskbar-shortcut"
            onClick={onClick}
        />
    );
}
//define props
TaskbarShortcut.propTypes = {
    //custom html props
    className: PropTypes.string,
    //component props
    active: PropTypes.bool,
    slug: PropTypes.string.isRequired,
    desktopModelId: PropTypes.string.isRequired,
};
//define default props
TaskbarShortcut.defaultProps = {
    className: '',
    active: false,
};

type TaskbarProps = {
    className?: string;
};

//create our Taskbar component
export const Taskbar = (props: TaskbarProps) => {
    const className = props.className + ' orcus-taskbar ',
        //get a list of our open apps
        openAppSlugs = useSelector(selectOpenAppSlugs, shallowEqual),
        //get our desktop
        desktop = useSelector<OrmState<Schema>>(state =>
            Desktop.select.singleDesktop(state)
        ) as Desktop,
        //get our focused app
        focusedAppSlug = useSelector<OrmState<Schema>>(state =>
            Desktop.select.focusedAppSlug(
                state,
                (desktop as unknown as { id: string }).id
            )
        );
    //render
    return (
        <div className={className}>
            <div className="orcus-shortcuts">
                {openAppSlugs.map(it => {
                    return (
                        <TaskbarShortcut
                            key={it}
                            slug={it}
                            desktopModelId={
                                (desktop as unknown as { id: string }).id
                            }
                            active={
                                focusedAppSlug && it === focusedAppSlug
                                    ? true
                                    : false
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};
//define default props
Taskbar.defaultProps = {
    className: '',
};
//define props
Taskbar.propTypes = {
    //html props
    className: PropTypes.string,
};

//export Taskbar component
export default Taskbar;
