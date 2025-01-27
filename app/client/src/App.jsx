// App.jsx
import { Router, Route } from "@solidjs/router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterAccount from "./pages/RegisterAccount";
import ContentPage from "./pages/ContentPage";
import EarthPage from "./pages/content/EarthPage";
import BlackHolePage from "./pages/content/BlackHolePage";
import ISSPage from "./pages/content/ISSPage";

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/content" component={ContentPage} />
      <Route path="/register" component={RegisterAccount} />
      <Route path="/earth" component={EarthPage} />
      <Route path="/blackhole" component={BlackHolePage} />
      <Route path="/ISS" component={ISSPage} />
    </Router>
  );
}

export default App;
