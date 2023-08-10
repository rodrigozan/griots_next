import React from 'react';

import { Card } from 'primereact/card';

import BooksComponent from '../../component/Books';

const BooksPage = () => {
  return (
    <main sclassName="planning flex align-items-center justify-content-center">
      <div className="grid grid-nogutter surface-0 text-800">
        <Card>
          <div className="m-0 p-8">
            <h1>Library</h1>
            <BooksComponent />
          </div>
        </Card>
      </div>
    </main>
  );
};

export default BooksPage;
