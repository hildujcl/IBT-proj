// Part 1: Deliberately wrong URL
async function wrongUrlTest() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/wrong-url");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("Catch block ran:", error.message);
  }
}

// Part 2: Real URL that returns 404
async function notFoundTest() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users/999999",
    );

    console.log("res.ok:", res.ok);
    console.log("status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("Catch block ran:", error.message);
  }
}

wrongUrlTest();
notFoundTest();
