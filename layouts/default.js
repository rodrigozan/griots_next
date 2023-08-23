import React from 'react';

import Header from '@/components/Header';

export default function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <main className='container'>
                <section className='row'>
                    {children}
                </section>
            </main>
        </>
    );
}
