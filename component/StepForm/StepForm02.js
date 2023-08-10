import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const StepForm02 = ({ assistant, genre, genresOptions, handleChangeGenre, onNextStep, previousStep }) => {

    return (
        <Card>
            <p>Olá! Sou o <strong className='text-primary'>{assistant}</strong> um assistente místico de criação de histórias de literatura fantástica.</p>
            <p>Vou te ajudar a planejar e escrever uma história. Que gênero de história você gostaria de construir?</p>
            <Dropdown
                className='my-5 w-full'
                value={genre}
                label="label"
                options={genresOptions}
                onChange={handleChangeGenre}
                placeholder="Select a genre"
            />
            <Button onClick={onNextStep} className="w-full">Next step</Button>
            <Button severity="secondary" onClick={previousStep} className="w-full mt-3">Previous step</Button>
        </Card>
    );
};

export default StepForm02;
