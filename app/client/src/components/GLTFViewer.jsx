import { onMount, onCleanup, createSignal } from "solid-js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const GLTFViewer = (props) => {
  let containerRef;
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

  onMount(() => {
    if (!props.modelPath) {
      setError("Model path is required");
      console.error("Model path is required");
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);

    // Get container dimensions
    const width = containerRef.clientWidth;
    const height = containerRef.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 3);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    camera.position.set(0, 1, 1.3);

    const loader = new GLTFLoader();
    loader.load(
      props.modelPath,
      (gltf) => {
        console.log("Model loaded successfully");
        scene.add(gltf.scene);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        gltf.scene.scale.multiplyScalar(scale);

        gltf.scene.position.sub(center.multiplyScalar(scale));

        setLoading(false);
      },
      (xhr) => {
        const progress = (xhr.loaded / xhr.total) * 100;
        console.log(`Loading: ${progress.toFixed(2)}%`);
      },
      (error) => {
        console.error("Error loading model:", error);
        setError(`Failed to load 3D model: ${error.message}`);
        setLoading(false);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = containerRef.clientWidth;
      const height = containerRef.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
      containerRef.removeChild(renderer.domElement);
      renderer.dispose();
    });
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {loading() && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Loading model...
        </div>
      )}
      {error() && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "red",
          }}
        >
          {error()}
        </div>
      )}
    </div>
  );
};

export default GLTFViewer;
