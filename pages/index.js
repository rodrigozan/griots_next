import { useState, useEffect } from "react";

import Login from '@/components/Login'
import Books from '@/components/Books'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState('')

  useEffect(() => {
    const storedValue = localStorage.getItem('token');
    setIsLoggedIn(storedValue)
  }, [])

  const Layout = isLoggedIn != null ? Books : Login;
  return (
    <>
      <main className='container'>
        <seciont className='home row'>
          token: {isLoggedIn}
          <Layout />
        </seciont>
      </main>
    </>
  )
}

