import styles from "./LoginPage.module.css";
import Navbar from "../components/NavBar";

export default function LoginPage() {
  return (
    <div class={styles.root}>
      <Navbar />
      <div class={styles.loginContainer}>
        <h1>Login</h1>
        <button class={styles.loginButton} onClick={handleGoogleLogin}>
          <i class="fab fa-google"></i>
        </button>
        <button class={styles.loginButton} onClick={handleMicrosoftLogin}>
          <i class="fab fa-microsoft"></i>
        </button>
        <button class={styles.loginButton} onClick={handleGitHubLogin}>
          <i class="fab fa-github"></i>
        </button>
        <button class={styles.loginButton} onClick={handleDiscordLogin}>
          <i class="fab fa-discord"></i>
        </button>
      </div>
    </div>
  );
}

// ... OAuth handlers ...

function handleGoogleLogin() {
  // Redirect to Google OAuth
}

function handleMicrosoftLogin() {
  // Redirect to Microsoft OAuth
}

function handleGitHubLogin() {
  // Redirect to GitHub OAuth
}

function handleDiscordLogin() {
  // Redirect to Discord OAuth
}