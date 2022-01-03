import { Route } from 'react-router-dom';
import "./css/style.css";

//common component
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

//main component
import Visual from "./components/main/Visual";

//sub component
import About from "./components/sub/About";
import Blog from "./components/sub/Blog";
import Gallery from "./components/sub/Gallery";
import Playlist from "./components/sub/Playlist";
import Contact from "./components/sub/Contact";

function App() {
  return (
    <div id="wrap">
      <Header />
      <Route exact path="/">
        <Visual />
      </Route>
      <Route exact path="/about" component={About}></Route>
      <Route exact path="/blog" component={Blog}></Route>
      <Route exact path="/gallery" component={Gallery}></Route>
      <Route exact path="/playlist" component={Playlist}></Route>
      <Route exact path="/contact" component={Contact}></Route>
      <Footer />
    </div>
  );
}

export default App;
