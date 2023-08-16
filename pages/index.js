import { useState, useEffect } from "react";

import Navbar from '@/components/Navbar'
import Login from '@/components/Login'
import ListBook from '@/components/Books/ListBook'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState('')

  useEffect(() => {
    const storedValue = localStorage.getItem('token');
    setIsLoggedIn(storedValue)
  }, [])

  //const Layout = isLoggedIn != null ? ListBook : Login;
  return (
    <>
      <Navbar />
      <main className='container'>
        <section className='home row'>
          {/* <Layout /> */}
          <ListBook />
        </section>
      </main>
    </>
  )
}

