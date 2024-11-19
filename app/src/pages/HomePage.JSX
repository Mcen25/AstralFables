import styles from './HomePage.module.css';
import Navbar from '../components/NavBar';

export default function HomePage() {
    return (
      <div class={styles.container}>
        <Navbar />
        <div class={styles.circle}></div>
      </div>
    );
}