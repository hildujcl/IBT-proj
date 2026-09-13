import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import ClubDetails from "./pages/ClubDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Resources from "./pages/Resources";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="clubs" element={<Clubs />} />
        <Route path="clubs/:id" element={<ClubDetails />} />

        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />

        <Route path="resources" element={<Resources />} />

        <Route path="about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
