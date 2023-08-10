import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const StepForm04 = ({ mythology_folklore, handleChangeMythologyFolklore, onNextStep, onPreviousStep }) => {

    return (
        <Card>
            <p>Gostaria de trabalhar com alguma mitologia ou folclore específico nessa história? Se sim, me diga, por favor:</p>
            <InputText
                className='my-5 w-full w-full'
                value={mythology_folklore}
                onChange={handleChangeMythologyFolklore}
                placeholder="Enter the mythology or folklore"
            />
            <Button onClick={onNextStep} className="w-full">Next step</Button>
            <Button severity="secondary" onClick={onPreviousStep} className="w-full mt-3 text-right">Previous step</Button>
        </Card>
    );
};

export default StepForm04;
