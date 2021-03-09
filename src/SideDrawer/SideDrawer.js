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
                <button style={{position:'absolute',top:'0',left:'0',margin:'10px'}} onClick={props.close} className='btn btn-danger'>x</button>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;