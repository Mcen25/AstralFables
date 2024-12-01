import styles from "./HomePage.module.css";
import Navbar from "../components/NavBar.jsx";
import ThreeScene from "../components/ThreeScene.jsx";
import GLTFViewer from "../components/GLTFViewer.jsx";

export default function BlackHolePage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <div class={styles.circle}>
        <GLTFViewer modelPath="https://raw.githubusercontent.com/Mcen25/VR-Assets-Dev/refs/heads/main/Earth%20by%20Denis%20Cliofas/scene.gltf" />
      </div>
      <button class={styles.button}></button>
    </div>
  );
}
