import React from 'react';
import './SideDrawer.css';

const sideDrawer = (props) => {

    let attachedClasses = ['SideDrawer', 'Close']
    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open']
    }
    return (
        <React.Fragment>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;