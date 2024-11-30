import { onMount, onCleanup } from "solid-js";
import styles from "./Audio.module.css";

const Audio = (props) => {
  let audioRef;

  onMount(() => {
    const playAudio = async () => {
      if (audioRef) {
        try {
          const response = await fetch(props.src);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const contentType = response.headers.get("content-type");
          if (!contentType?.includes("audio/")) {
            throw new Error(`Invalid content type: ${contentType}`);
          }

          await audioRef.play();
        } catch (err) {
          console.error("Audio playback error:", err);
        }
      }
    };

    document.addEventListener("click", playAudio, { once: true });

    onCleanup(() => {
      document.removeEventListener("click", playAudio);
      if (audioRef) {
        audioRef.pause();
      }
    });
  });

  return (
    <audio
      ref={audioRef}
      src={props.src}
      loop
      preload="auto"
      controls
      class={styles.audioPlayer}
      style={{
        width: "300px",
        height: "50px",
        "background-color": "#f1f1f1",
        "border-radius": "8px",
      }}
    >
      Your browser does not support the audio element.
    </audio>
  );
};

export default Audio;
