import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
        
export default function Home() {
  const [hideScrollbar, setHideScrollbar] = useState(false);

  useEffect(() => {
    setHideScrollbar(true);

    return () => {
      setHideScrollbar(false);
    };
  }, []);

  return (
    <main style={{ height: '100vh', width: '100%' }} className="flex align-items-center justify-content-center">
      <div style={{ height: '100vh', width: '100%' }} className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">Desperte sua imaginação</span>
            <div className="text-6xl text-primary font-bold mb-3">e crie histórias fantásticas</div>
            <p className="mt-0 mb-4 text-700 line-height-3">Transforme suas histórias em realidade e liberte sua criatividade agora mesmo!</p>

            <Link href="/register"><Button label="Começar" type="button" className="mr-3 p-button-raised" /></Link>
            <Link href="/caminho-da-pagina"><Button label="Live Demo" type="button" className="p-button-outlined" /></Link>
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden" style={{ maxHeight: '100vh' }}>
        <Image src="/img/book.jpg" alt="Book - Griots Platform" className="md:ml-auto block p-img-fluid" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
        </div>
      </div>
    </main>
  )
}
