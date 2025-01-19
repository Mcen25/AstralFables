import { createSignal } from "solid-js";
import styles from "./ContentPage.module.css";
import Navbar from "../components/NavBar";
import GLTFPage from "../components/GLTFPage.jsx";
import blackHoleModel from "../assets/blackhole/scene.gltf";
import shibaModel from "../assets/shiba/scene.gltf";
import earthModel from "../assets/earth/scene.gltf";

export default function ContentPage() {
  return (
    <div class={styles.root}>
      <Navbar />
      <GLTFPage modelPath={shibaModel} />
      <div class={styles.graph}></div>
    </div>
  );
}
