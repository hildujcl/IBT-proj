const url = "https://jsonplaceholder.typicode.com/users";

function render(users) {
  console.log("Users:");

  users.forEach((user) => {
    console.log(user.name);
  });
}

async function getUsers() {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await res.json();

    render(users);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

getUsers();
