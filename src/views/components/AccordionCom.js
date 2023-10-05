import classNames from 'classnames';
import React, { useState } from 'react';
const AccordionCom = ({ title, children,  className}) => {
    const [isOpen, setOpen] = React.useState(false);
    return (
        <div className={className}>
            <span className='tick_outer'><i className='tick_mark'></i></span>
            <div
                className={`accordion-title ${isOpen ? "open" : ""}`}
                onClick={() => setOpen(!isOpen)}
            >
                {title}
            </div>
            <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
                <div className="accordion-content">{children}</div>
            </div>
        </div>
    );
};

export default AccordionCom