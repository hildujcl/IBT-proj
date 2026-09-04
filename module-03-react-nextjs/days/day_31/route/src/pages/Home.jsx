import { Link } from "react-router-dom";

function Home() {
return ( <section className="home"> <h2>Welcome to Addis Eats 🍽️</h2>


  <p>
    Discover delicious traditional Ethiopian food and order your
    favorite dishes.
  </p>

  <Link to="/menu">Explore Our Menu</Link>
</section>


);
}

export default Home;
