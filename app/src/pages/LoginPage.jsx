import styles from "./LoginPage.module.css";
import Navbar from "../components/NavBar";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // Handle Google login
  };

  const handleMicrosoftLogin = () => {
    // Handle Microsoft login
  };

  const handleGitHubLogin = () => {
    // Handle GitHub login
  };

  const handleDiscordLogin = () => {
    // Handle Discord login
  };

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.columnContainer}>
        <div className={styles.loginContainer}>
          <button className={styles.loginButton} onClick={handleGoogleLogin}>
            <i className="fab fa-google"></i>
          </button>
          <button className={styles.loginButton} onClick={handleMicrosoftLogin}>
            <i className="fab fa-microsoft"></i>
          </button>
          <button className={styles.loginButton} onClick={handleGitHubLogin}>
            <i className="fab fa-github"></i>
          </button>
          <button className={styles.loginButton} onClick={handleDiscordLogin}>
            <i className="fab fa-discord"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
