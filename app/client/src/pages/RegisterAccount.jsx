import { createSignal } from "solid-js";
import styles from "./LoginPage.module.css";
import Navbar from "../components/NavBar";

export default function RegisterAccount() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPopup, setShowPopup] = createSignal(false);

  const handReturnHome = () => {
    window.location.href = "/";
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
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

  const handleCreateAccount = async () => {
    try {
      if (email().length === 0 || password().length === 0) {
        throw new Error("Email and password are required");
      } else {
        const emailCheckResponse = await fetch(`/users/check-email?email=${email()}`);
        const emailCheckData = await emailCheckResponse.json();
        if (emailCheckData.exists) {
          throw new Error("Email is already in use");
        } else {
          const response = await fetch("/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username(),
              email: email(),
              password: password(),
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Account created successfully:", data);
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.columnContainer}>
        <div className={styles.section}>
          <div className={styles.loginSection}>
            <h2>Sign Up</h2>
            <h3>Username</h3>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <h3>Email</h3>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3>Password</h3>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={styles.loginMainButton}
            onClick={handleCreateAccount}
          >
            Create an Account
          </button>
          {showPopup() && (
            <div className={styles.popup}>
              <span>Account created successfully!</span>
              <button onClick={handReturnHome}>Return Home</button>
            </div>
          )}
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
      </div>
    </div>
  );
}