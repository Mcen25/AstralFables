import { createSignal, onMount } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const GLTFPage = (props) => {
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);
  let container;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1, 3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    // Texture loader
    const textureLoader = new TextureLoader();
    const earthTexture = textureLoader.load('/src/assets/earth/textures/Material.002_diffuse.jpeg');

    // Material
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 1,
      metalness: 0
    });

    let material;
    if (props.texturePath) {
      const textureLoader = new TextureLoader();
      const texture = textureLoader.load(props.texturePath);
      material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1,
        metalness: 0
      });
    }

    const loader = new GLTFLoader();
    loader.load(
      props.modelPath,
      (gltf) => {
        if (material) {
          gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
            }
          });
        }
        
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
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    });
  });

  return <div ref={(el) => (container = el)} />;
};

export default GLTFPage;