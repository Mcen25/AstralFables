import styles from "./content.module.css";
import Navbar from "../../components/NavBar";
import GLTFPage from "../../components/GLTFPage.jsx";
import issModel from "../../assets/ISS_stationary.glb";

export default function ISSPage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <GLTFPage modelPath={issModel} />
    </div>
  );
}
