import React from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

const StepForm04 = ({ historicEvents, handleChangeHistoricEvents, listHistoricEvents }) => {

    return (
        <Card>
            <Dropdown
                className="my-5 w-full"
                value={historicEvents}
                options={listHistoricEvents}
                placeholder="Select a historical event"
                onChange={handleChangeHistoricEvents}
            />
        </Card>
    );
};

export default StepForm04;
