import React from 'react';

export default function NoSidebarLayout({ children }) {
    return (
        <main className='container'>
            <section className='row justify-content-center mt-5'>
                {children}
            </section>
        </main>
    );
}
