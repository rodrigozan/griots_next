import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const OptionChoice = ({ option, onChange }) => {
    return (

        <div className="card">
            <Card title={option}>
                <div className="m-0">
                    <Button onClick={() => onChange(option)} type="submit" label="Choice" icon="pi pi-user" className="w-full" />
                </div>
            </Card>
        </div>
    );
};

export default OptionChoice;
