// NavBar.jsx
import { A } from "@solidjs/router";
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav class={styles.navbar}>
      <div class={styles.navbarContent}>
        <A href="/" class={styles.navbarBrand}>AstralFables</A>
        <ul class={styles.navLinks}>
          <li><A href="/">Home</A></li>
          <li><A href="/about">About</A></li>
          <li><A href="/contact">Contact</A></li>
        </ul>
      </div>
    </nav>
  );
}