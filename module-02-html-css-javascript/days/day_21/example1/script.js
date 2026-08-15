const form = document.getElementById("signup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  //inputE1.value = "";
  console.log(name);
  console.log(phone);

  const result = document.querySelector("#result");

  result.textContent = `Name: ${name}, Phone: ${phone}`;
  const msg = document.querySelector("#error");
  function show(text) {
    msg.textContent = text; // safe: no HTML
  }
});

/*const language = document.getElementById("language");
const saveBtn = document.getElementById("saveBtn");
const result = document.getElementById("result");

// Save selected language

saveBtn.addEventListener("click", function () {
    localStorage.setItem("language", language.value);

    result.textContent = `Language saved: ${language.value}`;
});

// Get saved language when page loads
const savedLanguage = localStorage.getItem("language");

if (savedLanguage) {
    language.value = savedLanguage;
}
  // getItem()
  else if (action === "get") {
    const username = localStorage.getItem("username");

    if (username) {
      result.textContent = `Saved username: ${username}`;
    } else {
      result.textContent = "No username found.";
    }
  }

  // removeItem()
  else if (action === "remove") {
    localStorage.removeItem("username");

    result.textContent = "Username removed.";
  }

  // clear()
  else if (action === "clear") {
    localStorage.clear();

    result.textContent = "All local storage data has been cleared.";
  } else {
    result.textContent = "Please select an action.";
  }

*/
