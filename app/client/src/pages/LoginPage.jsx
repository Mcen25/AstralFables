import styles from "./LoginPage.module.css";
import Navbar from "../components/NavBar";
import { A } from "@solidjs/router";

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
        <div className={styles.section}>
          <div className={styles.loginSection}>
            <h2>Login</h2>
            <h3>Email</h3>
            <input type="text" placeholder="Enter your email" />
            <h3>Password</h3>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className={styles.loginMainButton}>LOGIN</button>
          <div className={styles.forgotPassword}>
            <A href="/forgot-password" className={styles.forgotPasswordLink}>
              Forgot your password?
            </A>
          </div>
          <div className={styles.horizontalLineContainer}>
            <hr className={styles.horizontalLine} />
            <span className={styles.horizontalLineText}>or</span>
            <hr className={styles.horizontalLine} />
          </div>
          <div className={styles.sectionRow}>
            <button className={styles.loginButton} onClick={handleGoogleLogin}>
              <i className="fab fa-google"></i>
            </button>
            <button
              className={styles.loginButton}
              onClick={handleMicrosoftLogin}
            >
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
        <div className={styles.section}>
          <h2>Section 1</h2>
          <p>Content for the first section.</p>
        </div>
      </div>
      <div className={styles.accountText}>
        Don't have an
        <A href="/register" className={styles.accountLink}>
          account?
        </A>
      </div>
    </div>
  );
}
