import styles from "./HomePage.module.css";
import Navbar from "../components/NavBar";
import GLTFViewer from "../components/GLTFViewer";

//implement in different brancg
export default function ContentPage() {
  return (
    <div className={styles.root}>
      <Navbar />
        <h1>Content Page</h1>
        <input 
            type="text" 
            placeholder="Search here"
            style={{width: "100px", padding: "12px 20px", margin: "8px 0", display: "inline-block", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box"}}
        />
      <div class={styles.circle}>
        <GLTFViewer modelPath="https://raw.githubusercontent.com/Mcen25/VR-Assets-Dev/refs/heads/main/Earth%20by%20Denis%20Cliofas/scene.gltf" />
      </div>
      <button class={styles.button}></button>
    </div>
  );
}
