import React, { useState } from 'react';

import { Card } from 'primereact/card';

import StepForm from '@/component/StepForm';
import StoryResult from '@/component/StoryResult';

const Wizard = () => {
    const [step, setStep] = useState(0);
    const [story, setStory] = useState('');

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleStoryGeneration = (generatedStory) => {
        setStory(generatedStory);
    };

    let count = 1

    const steps = [
        {
            label: 'Escolha um Sabio',
            component: <StepForm.Step1 onNextStep={handleNextStep} />,
            count: count++
        },
        {
            label: 'Escolha um Gênero',
            component: <StepForm.Step2 onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />,
            count: count++
        },
        {
            label: 'Escolha um Subgênero',
            component: <StepForm.Step3 onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />,
            count: count++
        },
        {
            label: 'Escolha uma Mitologia ou um Folclore',
            component: <StepForm.Step4 onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />,
            count: count++
        },
        {
            label: 'Escolha um País',
            component: <StepForm.Step5 onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />,
            count: count++
        },
        {
            label: 'Escolha um Evento Histórico',
            component: <StepForm.Step6 onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />,
            count: count++
        },
        {
            label: 'Escolha um tema e uma mensagem',
            component: <StepForm.Step7 onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />,
            count: count++
        },
        // ... Adicione mais etapas conforme necessário
        {
            label: 'Resultado da História',
            component: <StoryResult story={story} />,
        },
    ];

    const currentStep = steps[step];

    return (
        <main style={{ height: '100vh', width: '100%' }} className="planning flex align-items-center justify-content-center">
            <div className="grid grid-nogutter surface-0 text-800">
                <div className="card">
                    <h2 className='text-center text-primary mt-5'>{currentStep.label}</h2>
                    <p className='text-center'>Step: { currentStep.count }</p>
                    {currentStep.component}
                </div>
            </div>
        </main>
    );
};

export default Wizard;
