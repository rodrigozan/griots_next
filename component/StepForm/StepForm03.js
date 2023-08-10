import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const StepForm03 = ({ subGenres, subOptions, onChange }) => {

    return (
        <Dropdown
            className='my-5 w-full'
            value={subGenres}
            options={subOptions}
            onChange={onChange}
            placeholder="Select a subgenre"
        />
    );
};

export default StepForm03;

