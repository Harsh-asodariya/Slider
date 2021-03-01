import React, { } from 'react';
import './Modal.css';

const modal = props => {
    let classes
    if(props.slider === true){
        classes = 'SliderModal'
    }
    else{
        classes = 'Modal'
    }
    return (
            <div
                className={classes}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
    );

};

export default modal