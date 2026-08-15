# Validated Persistent Signup Form

## What the Form Does

This project is a signup form that collects a user's full name and Ethiopian phone number.

It validates the input using JavaScript and an Ethiopian phone number regular expression. Valid signup entries are saved as JSON in localStorage, so they remain available after refreshing the page.

The form also displays the total number of people who have signed up.

## Features

- Validates the name to contain at least two characters.
- Validates Ethiopian phone numbers using regex.
- Shows clear error messages.
- Uses textContent to display messages.
- Saves valid entries to localStorage.
- Restores saved entries after page reload.
- Handles missing or corrupt localStorage data safely.
- Clears the form after a successful signup.

## How to Open

Open index.html in a web browser, or use the Live Server extension in VS Code.
