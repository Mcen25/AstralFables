import styles from "./HomePage.module.css";
import Navbar from "../components/NavBar";
import Audio from "../components/Audio";

import GLTFViewer from "../components/GLTFViewer";
import GLTFPage from "../components/GLTFPage.jsx";
import shibaModel from "../assets/shiba/scene.gltf";
import blackholeModel from '../assets/blackhole/scene.gltf?url';

export default function HomePage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <GLTFPage modelPath={blackholeModel} />
      <button class={styles.button}></button>
    </div>
  );
}
