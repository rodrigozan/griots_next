import React from 'react';
import { Card } from 'primereact/card';

const StoryResult = ({ story }) => {
  return (
    <Card>
      <div>
        <h2>Resultado da História:</h2>
        <pre>{story}</pre>
      </div>
    </Card>
  );
};

export default StoryResult;
