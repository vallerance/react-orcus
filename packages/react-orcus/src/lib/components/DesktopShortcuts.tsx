import PropTypes from 'prop-types';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { OrmState } from 'redux-orm';
import { Schema } from '../redux/models/Model';
import AppModel, { openApp } from '../redux/models/OrcusApp';
import { Shortcut } from './Shortcut';

type DesktopShortcutProps = {
    className?: string;
    slug: string;
};

//individual shortcut
function DesktopShortcut(props: DesktopShortcutProps) {
    let className = props.className;
    //get our dispatch
    const dispatch = useDispatch(),
        //track selected state
        [selected, setSelected] = useState(false);

    if (selected) {
        className += ' selected ';
    }

    function onClick() {
        setSelected(!selected);
    }

    function onDoubleClick() {
        dispatch(openApp({ slug: props.slug }));
    }

    //render
    return (
        <Shortcut
            {...props}
            className={className}
            idPrefix="orcus-desktop-shortcut"
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        />
    );
}
DesktopShortcut.propTypes = {
    //custom html props
    className: PropTypes.string,
    //component props
    slug: PropTypes.string.isRequired,
};
DesktopShortcut.defaultProps = {
    className: '',
};

type DesktopShortcutsProps = {
    className?: string;
};

//create our main Shortcuts component
export const DesktopShortcuts = ({ className = '' }: DesktopShortcutsProps) => {
    //get a list of our apps
    const appSlugs = useSelector(
        (state: OrmState<Schema>) => AppModel.select.appSlug(state),
        shallowEqual
    );
    //render
    return (
        <div className={className + 'orcus-shortcuts'}>
            {appSlugs.map(it => (
                <DesktopShortcut key={it} slug={it} />
            ))}
        </div>
    );
};
//define default props
DesktopShortcuts.defaultProps = {};
//define props
DesktopShortcuts.propTypes = {};

//export Shortcuts component
export default DesktopShortcuts;
