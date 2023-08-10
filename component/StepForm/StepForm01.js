import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import mythologys_json from '@/json/mythologys.json'

const StepForm01 = ({ selectedMythology, handleChangeMythology, onNextStep }) => {

  return (
    <Card>
      <p>Guiaremos você com a sabedoria ancestral para a criação de sua história fantástica.</p>
      <p>Escolha um <strong className='text-primary'>Sabio</strong> para guiá-lo em sua jornada de <strong className='text-primary'>creator</strong>:</p>
      <Dropdown
        className='my-5 w-full'
        value={selectedMythology}
        onChange={handleChangeMythology}
        options={mythologys_json}
        optionLabel="mythology"
        placeholder="Select a mythology for choose a guide"
      />
      <Button onClick={onNextStep} className="w-full">Next step</Button>
    </Card>
  );
};

export default StepForm01;
