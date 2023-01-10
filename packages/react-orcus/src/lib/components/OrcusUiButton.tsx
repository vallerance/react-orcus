import React from 'react';
import PropTypes from 'prop-types';

type OrcusUiButtonProps = {
    className?: string;
    children?: React.ReactNode;
    onClick?: React.ReactEventHandler;
};

//create our OrcusUiButton class
export const OrcusUiButton = (props: OrcusUiButtonProps) => {
    const className = 'orcus-ui orcus-button ' + props.className;
    //render
    return (
        <span {...props} className={className}>
            {props.children}
        </span>
    );
};
//define default props
OrcusUiButton.defaultProps = {
    className: '',
};
//define props
OrcusUiButton.propTypes = {
    className: PropTypes.string,
};

//export OrcusUiButton class
export default OrcusUiButton;
