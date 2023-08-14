// components/Layout.js
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
//import styles from './layout.scss';

export default function Layout({ children }) {
  return (
    <Container fluid className={styles.container}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Meu App</Navbar.Brand>
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link>Início</Nav.Link>
          </Link>
          <Link href="/users" passHref>
            <Nav.Link>Usuários</Nav.Link>
          </Link>
          <Link href="/books" passHref>
            <Nav.Link>Livros</Nav.Link>
          </Link>
          <Link href="/plots" passHref>
            <Nav.Link>Plots</Nav.Link>
          </Link>
          <Link href="/worldbuildings" passHref>
            <Nav.Link>Worldbuildings</Nav.Link>
          </Link>
          <Link href="/characters" passHref>
            <Nav.Link>Personagens</Nav.Link>
          </Link>
        </Nav>
      </Navbar>
      <main className={styles.main}>{children}</main>
    </Container>
  );
}
