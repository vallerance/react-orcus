import PropTypes from 'prop-types';
import { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { OrmState } from 'redux-orm';

import { Schema } from '../redux/models/Model';
import AppModel, { DEFAULT_ID, OrcusApp } from '../redux/models/OrcusApp';

type ShortcutProps = {
    className?: string;
    idPrefix?: string;
    slug: string;
    onClick?: (e: React.MouseEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
};

//individual shortcut
export const Shortcut = (props: ShortcutProps) => {
    //create defaultId for this component
    const defaultId = useRef(
            props.idPrefix + '-' + Math.floor(Math.random() * 10000)
        ),
        className = 'orcus-shortcut ' + props.className,
        { idPrefix, slug: _slug, ...htmlProps } = props,
        //get the app for this slug
        //use shallow equals to re-render when ANY app props change
        app = useSelector<OrmState<Schema>>(
            state => AppModel.select.app(state, props.slug),
            shallowEqual
        ) as OrcusApp & {
            id: string;
            icon: string;
            name: string;
        };

    //if we couldn't find our app
    if (!app) {
        console.warn(
            `Shortcut: Unable to find app with slug: ${props.slug} in state`
        );
        return null;
    }

    //get id, either property or default
    const id =
        app.id === DEFAULT_ID ? defaultId.current : idPrefix + '-' + app.id;

    //render
    return (
        <div {...htmlProps} id={id} className={className} tabIndex={0}>
            <div className="orcus-ui orcus-icon">
                <i className="iconify" data-icon={app.icon} />
            </div>

            <p className="orcus-title">{app.name}</p>
        </div>
    );
};
Shortcut.propTypes = {
    //custom html props
    className: PropTypes.string,
    //component props
    idPrefix: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};
Shortcut.defaultProps = {
    className: '',
};

//export Shortcut component
export default Shortcut;
