import React from 'react';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { RadioButton } from 'primereact/radiobutton';

const Question = ({ question, options, onChange }) => {
    return (
        <div className="card">
            <div>
                <Message text={question} />
                <div className="my-5 flex flex-wrap gap-3">
                    {options.map((option, index) => (
                        <div className="flex align-items-center" key={index}>
                            <RadioButton
                                name="answer" value={option}
                                onChange={onChange} /> <span className='ml-2'>{option}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Question;
