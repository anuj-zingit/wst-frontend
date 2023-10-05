import React from 'react'


const SelectBox = ({ label, value, options, onChange, name}) => {

    return (
        <>
            <label className='label'>{label}</label>
            <div className='custom_Select'>
                <select defaultValue={value} name={name} onChange={onChange}>
                    <option disabled selected value="">Add Label</option>
                    {options.map((option) => (
                        <option defaultValue={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </>

    );

};

export default SelectBox 
