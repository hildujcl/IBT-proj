function Header() {
  return (
    <header>
      <h1>🍽️ Addis Eats😋🍸🍛</h1>
      <p>Delicious Ethiopian Food</p>
    </header>
  );
}

export default Header;

/*import { useEffect, useState } from "react";

function MenuTitle() {;+:+:+
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Addis Eats — ${count} items`;
  }, [count]);

  return (
    <div>
      <h1>Addis Eats</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>+</button>

      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default MenuTitle;
*/
