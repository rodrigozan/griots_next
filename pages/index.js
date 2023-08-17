import { useState, useEffect } from "react";

import Carousel from 'react-bootstrap/Carousel';

import DefaultLayout from "@/layouts/default";
import NoSidebarLayout from "@/layouts/no_header";

import Login from '@/components/Login'
import ListBook from '@/components/Books/ListBook'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState('')

  useEffect(() => {
    const storedValue = localStorage.getItem('token');
    setIsLoggedIn(storedValue)
  }, [])

  const Books = () => {
    return (
      <Carousel>
        <ListBook />
      </Carousel>
    )
  }

  const Component = isLoggedIn ? Books : Login;
  const Layout = isLoggedIn ? DefaultLayout : NoSidebarLayout;

  return (
    <Layout>
      <Component />
    </Layout>
  )
}

