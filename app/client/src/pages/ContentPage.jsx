import { createSignal } from "solid-js";
import styles from "./ContentPage.module.css";
import Navbar from "../components/NavBar";
import GLTFPage from "../components/GLTFPage.jsx";
import blackHoleModel from "../assets/blackhole/scene.gltf";
import shibaModel from "../assets/shiba/scene.gltf";
import earthModel from "../assets/earth/scene.gltf";
import earthTexture from "../assets/earth/textures/Material.002_diffuse.jpeg";

export default function ContentPage() {
  return (
    <div class={styles.root}>
      <Navbar />
      
      <div class={styles.graph}>
        <div class={styles.columnContainer}>
          <div class={styles.leftSection}> 
            <input type="text" placeholder="Search" class={styles.search}/>
            <h2>Tags</h2>
            <div class={styles.checkboxContainer}>
              <div class={styles.checkboxWrapper}>
                <input type="checkbox" class={styles.checkbox} id="option1" />
                <label class={styles.checkboxLabel} for="option1">3D Model</label>
              </div>
              <div class={styles.checkboxWrapper}>
                <input type="checkbox" class={styles.checkbox} id="option2" />
                <label class={styles.checkboxLabel} for="option2">VR</label>
              </div>
              <div class={styles.checkboxWrapper}>
                <input type="checkbox" class={styles.checkbox} id="option3" />
                <label class={styles.checkboxLabel} for="option3">Animated</label>
              </div>
              <div class={styles.checkboxWrapper}>
                <input type="checkbox" class={styles.checkbox} id="option4" />
                <label class={styles.checkboxLabel} for="option4">Interactable</label>
              </div>
            </div>
            <h2>Filters</h2>
            <div class={styles.checkboxContainer}>
              <div class={styles.checkboxWrapper}>
                <input type="checkbox" class={styles.checkbox} id="option5" />
                <label class={styles.checkboxLabel} for="option5">Planets</label>
              </div>
              <div class={styles.checkboxWrapper}>
                <input type="checkbox" class={styles.checkbox} id="option6" />
                <label class={styles.checkboxLabel} for="option6">Man-made Objects</label>
              </div>
              <div class={styles.checkboxWrapper}>
                <input type="checkbox" class={styles.checkbox} id="option7" />
                <label class={styles.checkboxLabel} for="option7">Astronomical</label>
              </div>
          </div>
          </div>
          <div class={styles.rightSection}>
          <div class={styles.cardGrid}>
            <div class={styles.card} onClick={() => window.location.href = '/earth'}>
              <img src={earthTexture} alt="Earth" />
              <h3>Earth Model</h3>
              <p>Interactive 3D Earth model</p>
            </div>
            <div class={styles.card} onClick={() => window.location.href = '/blackhole'}>
              <img src="/blackhole-thumbnail.jpg" alt="Black Hole" />
              <h3>Black Hole</h3>
              <p>Astronomical visualization</p>
            </div>
            <div class={styles.card} onClick={() => window.location.href = '/shiba'}>
              <img src="/shiba-thumbnail.jpg" alt="Shiba" />
              <h3>Shiba Model</h3>
              <p>3D character model</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
