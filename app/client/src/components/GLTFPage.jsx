import { onMount, onCleanup } from "solid-js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import shibaModel from '../assets/shiba/scene.gltf';

const GLTFPage = (props) => {
  let container;

  onMount(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
  
    window.addEventListener('resize', handleResize);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1, 3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      console.log('All textures loaded successfully');
    };
    manager.onError = (url) => {
      console.error('There was an error loading ' + url);
    };

    const loader = new GLTFLoader(manager);
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

    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      loader.dispose();
      container.removeChild(renderer.domElement);
      renderer.dispose();
    });
  });

  return <div ref={(el) => (container = el)} />;
};

export default GLTFPage;