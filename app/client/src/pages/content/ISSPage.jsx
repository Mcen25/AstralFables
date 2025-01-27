import styles from './content.module.css';
import Navbar from "../../components/NavBar";
import GLTFPage from "../../components/GLTFPage.jsx";

export default function ISSPage() {
    return (
        <div className={styles.root}> 
            <Navbar /> 
        </div>
    )
}