import { ComponentType } from 'react';
import { connect } from 'react-redux';

export type ConnectedComponent = {
    mapStateToProps?: (state: unknown, ownProps: unknown) => unknown;
    mapDispatchToProps?: (dispatch: unknown, ownProps: unknown) => unknown;
} & ComponentType;

//create our reduxConventionalConnect function
function reduxConventionalConnect(Component: ConnectedComponent) {
    let mapStateToProps = undefined,
        mapDispatchToProps = undefined;
    const hasMapProps = typeof Component.mapStateToProps == 'function',
        hasMapDispatch =
            typeof Component.mapDispatchToProps == 'function' ||
            (typeof Component.mapDispatchToProps == 'object' &&
                Component.mapDispatchToProps !== null);

    //set mapStateToProps
    if (hasMapProps) {
        mapStateToProps = Component.mapStateToProps;
    }
    if (hasMapDispatch) {
        mapDispatchToProps = Component.mapDispatchToProps;
    }

    //return connected component using map functions
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}

//export reduxConventionalConnect function
export { reduxConventionalConnect };
