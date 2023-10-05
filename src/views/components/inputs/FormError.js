import React from 'react';

const FormError = (props) => {
    return (
        <div className={'error'}>
            {props.error}
        </div>
    )
};

export default FormError;
