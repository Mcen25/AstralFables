import styles from './Navbar.module.css';

export default function Navbar() {
    return (
      <nav class={styles.navbar}>
        <div class={styles.navbarContent}>
          <a href="/" class={styles.navbarBrand}>AstralFables</a>
          <ul class={styles.navLinks}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    );
}