import logo from "./logo.svg";
import styles from "./App.module.css";
import HomePage from "./pages/HomePage";
import GLTFViewer from "./components/GLTFViewer";

function App() {
  return (
    <div class={styles.App}>
      <GLTFViewer modelPath="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/refs/heads/main/2.0/2CylinderEngine/glTF/2CylinderEngine.gltf" />
      <header class={styles.header}>
        <HomePage />
      </header>
    </div>
  );
}

export default App;
