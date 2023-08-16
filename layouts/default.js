import React from 'react';
import Navbar from '@/components/Navbar'

export default function DefaultLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className='container'>
                <section className='row'>
                    {children}
                </section>
            </main>
        </>
    );
}
