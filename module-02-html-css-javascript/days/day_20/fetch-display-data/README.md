# Fetch & Display Live Data

This project demonstrates how to fetch live JSON data from a public API using JavaScript's Fetch API.

## API Used

https://jsonplaceholder.typicode.com/posts

## Requirements

- Use an `async load()` function.
- Display "Loading..." while the request is running.
- Use `fetch()` to request data.
- Check `res.ok` and throw an error if the request fails.
- Convert the response using `res.json()`.
- Render each item to the page.
- Use `try...catch` to handle errors.
- Clear the loading message using `finally`.
- Add a refresh button to load the data again.

## Self-Check

- [ ] I used an async function.
- [ ] I used await fetch().
- [ ] I checked res.ok.
- [ ] I used await res.json().
- [ ] I displayed the results in the `<ul>`.
- [ ] I added a loading message.
- [ ] I added error handling.
- [ ] I used finally to clear the loading message.
- [ ] I added a refresh button.
