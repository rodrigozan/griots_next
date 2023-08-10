import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Choice() {
    const router = useRouter();

    const [hideScrollbar, setHideScrollbar] = useState(false);

    useEffect(() => {
        setHideScrollbar(true);

        return () => {
            setHideScrollbar(false);
        };
    }, []);

    const handleChooseProfile = (profile) => {
        if(profile === 'writer') router.push('/books/planning')
        else router.push('/books')
    };

    return (
        <main style={{ height: '100vh', width: '100%' }}>
            <div style={{ height: '100vh', width: '100%' }} className="grid grid-nogutter surface-0 text-800">
                <div className="surface-0 text-center">
                    <div className="mb-3 font-bold text-3xl">
                        <span className="text-900">Change the World</span>
                        <span className="text-blue-600">with fantastics stories</span>
                    </div>
                    <div className="text-700 mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
                    <div className="grid">
                        <div className="col-12 md:col-4 mb-4 px-5" onClick={() => handleChooseProfile('writer')}>
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-desktop text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Writer</div>
                            <span className="text-700 line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5" onClick={() => handleChooseProfile('beta_reader')}>
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-lock text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Beta Reader</div>
                            <span className="text-700 line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5" onClick={() => handleChooseProfile('critical_reader')}>
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Critical Reader</div>
                            <span className="text-700 line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5" onClick={() => handleChooseProfile('spell_checker')}>
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-globe text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Spell Checker</div>
                            <span className="text-700 line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5" onClick={() => handleChooseProfile('reviewer_content')}>
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-github text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Reviewer Content</div>
                            <span className="text-700 line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
                        </div>
                        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3" onClick={() => handleChooseProfile('editorial_market_professional')}>
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-shield text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Publishing Market Professional</div>
                            <span className="text-700 line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
