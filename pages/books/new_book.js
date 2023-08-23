import React, { useState } from 'react';

import DefaultLayout from "@/layouts/default";

import Books from '@/components/Books/ListBook'
import NewBook from "@/components/Books/NewBook"

const Book = () => {
    return (
        <DefaultLayout>
            <NewBook />
        </DefaultLayout>
    );
};

export default Book;
