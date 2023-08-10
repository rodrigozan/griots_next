import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const StepForm07 = ({ showDropdown, themeMessage, themeMessageList, handleGenerateListThemeMessage, handleChangeThemeMessage, onNextStep, onPreviousStep }) => {

    return (
        <Card>
            <p>Gostaria de criar automaticamente o tema e a mensagem da história? Posso criar uma lista para você escolher.</p>
            <Button onClick={handleGenerateListThemeMessage} className="w-full">Gerar lista</Button>
            {showDropdown ? (
                <>
                    <Dropdown
                        className='my-5 w-full'
                        value={themeMessage}
                        options={themeMessageList}
                        onChange={handleChangeThemeMessage}
                        placeholder="Select a theme and message"
                    />
                </>
            ) : (
                <>
                    <p>Ou, se preferir, me diga com qual o tema e qual a mensagem que você gostaria de passar em sua história:</p>
                    <InputText
                        className='my-5'
                        value={themeMessage}
                        onChange={handleChangeThemeMessage}
                        placeholder="Enter the theme and message"
                    />
                </>
            )}
            <Button onClick={onNextStep} className="w-full">Next step</Button>
            <Button severity="secondary" onClick={onPreviousStep} className="w-full mt-3 text-right">Previous step</Button>
        </Card>
    );
};

export default StepForm07;
