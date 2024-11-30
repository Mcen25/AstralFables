// NavBar.jsx
import { A } from "@solidjs/router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav class={styles.navbar}>
      <div class={styles.navbarContent}>
        <A href="/" class={styles.navbarBrand}>
          AstralFables
        </A>
        <ul class={styles.navLinks}>
          <li>
            <A href="/">Home</A>
          </li>
          <li>
            <A href="/about">About</A>
          </li>
          <li>
            <A href="/contact">Contact</A>
          </li>
          <li>
            <A href="/login" class={styles.svgButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </A>
          </li>
        </ul>
      </div>
      <div class={styles.animatedBar}></div>
    </nav>
  );
}
