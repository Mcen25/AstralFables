// filepath: /Users/matthewen/Documents/Github/Web development/AstralFables/app/client/src/components/GLTFPage.jsx
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

    const loader = new GLTFLoader();
    loader.load(
      props.modelPath,
      (gltf) => {
        console.log('Model loaded successfully');
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    onCleanup(() => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    });
  });

  return <div ref={(el) => (container = el)} />;
};

export default GLTFPage;