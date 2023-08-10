import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const StepForm04 = ({ country_selected, countrys, handleChangeCountry, onNextStep, onPreviousStep }) => {

    return (
        <Card>
            <p>Gostaria de trabalhar com a cultura específica de algum país nessa história?</p>
            <Dropdown
                className='my-5 w-full'
                value={country_selected}
                options={countrys}
                optionLabel="name"
                optionValue="code"
                onChange={handleChangeCountry}
                placeholder="Selecione um país"
            />
            <Button onClick={onNextStep} className="w-full">Next step</Button>
            <Button severity="secondary" onClick={onPreviousStep} className="w-full mt-3 text-right">Previous step</Button>
        </Card>
    );
};

export default StepForm04;
