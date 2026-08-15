const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const error = document.getElementById("error");
const count = document.getElementById("count");

// Save an array to localStorage
function save(entries) {
  localStorage.setItem("signupEntries", JSON.stringify(entries));
}

// Load entries from localStorage
function load() {
  const stored = localStorage.getItem("signupEntries");

  if (!stored) {
    return [];
  }

  try {
    const entries = JSON.parse(stored);

    // Make sure the stored data is an array
    if (!Array.isArray(entries)) {
      return [];
    }

    return entries;
  } catch (error) {
    return [];
  }
}

// Validate name and phone
function validate(name, phone) {
  if (name.length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  return "";
}

// Show the number of registered people
function showCount() {
  const entries = load();
  count.textContent = `People signed up: ${entries.length}`;
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const message = validate(name, phone);

  // Show the first validation error
  if (message) {
    error.textContent = message;
    return;
  }

  // Load existing entries
  const entries = load();

  // Add the new signup
  entries.push({
    name: name,
    phone: phone,
  });

  // Save updated entries
  save(entries);

  // Clear error message
  error.textContent = "";

  // Clear form
  form.reset();

  // Update signup count
  showCount();
});

// Show count when page loads
showCount();
