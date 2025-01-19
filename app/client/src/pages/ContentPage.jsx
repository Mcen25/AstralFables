import { createSignal } from "solid-js";
import styles from "./ContentPage.module.css";
import Navbar from "../components/NavBar";
import GLTFViewer from "../components/GLTFViewer";
import blackHoleModel from "../assets/blackhole/scene.gltf";
import shibaModel from "../assets/shiba/scene.gltf";

const linearDistance = (current, target) => {
  return target - current;
};

export default function ContentPage() {
  const [centerIndex, setCenterIndex] = createSignal(1);
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  const models = [blackHoleModel, blackHoleModel, blackHoleModel, blackHoleModel];

  const shiftLeft = () => {
    if (isTransitioning()) return;
    setIsTransitioning(true);
    setCenterIndex((prev) => (prev > 1 ? prev - 1 : prev));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const shiftRight = () => {
    if (isTransitioning()) return;
    setIsTransitioning(true);
    setCenterIndex((prev) => (prev < models.length ? prev + 1 : prev));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div class={styles.root}>
      <Navbar />
      <div class={styles.carouselWrapper}>
        {models.map((model, i) => {
          const modelIndex = i + 1;
          const dist = linearDistance(centerIndex(), modelIndex);

          if (Math.abs(dist) > 1) return null;

          return (
            <div
              class={styles.circle}
              style={{
                transform: `
                  translateX(${dist * 300}px)
                  scale(${dist === 0 ? 1 : 0.7})
                  ${dist === 0 ? 'rotateY(0deg)' : dist < 0 ? 'rotateY(-30deg)' : 'rotateY(30deg)'}
                `,
                opacity: dist === 0 ? 1 : 0.5,
                transition: `
                  transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                  filter 0.5s ease-in-out
                `,
                filter: `blur(${Math.abs(dist) * 2}px)`,
                pointerEvents: isTransitioning() ? 'none' : 'auto'
              }}
              onClick={() => {
                if (dist === 0) return;
                dist < 0 ? shiftLeft() : shiftRight();
              }}
            >
              <GLTFViewer modelPath={model} />
            </div>
          );
        })}
      </div>
    </div>
  );
}