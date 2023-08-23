import React from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import NavBar from '@/components/Navbar';

const Header = () => {

    return (
        <header>
            <nav>
                <NavBar />
            </nav>
            <nav>
                <Breadcrumbs />
            </nav>
        </header>
    );
};

export default Header;
