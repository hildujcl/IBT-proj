async function getPostsAndDetails() {
  try {
    // First fetch a list
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();

    // Take the first two posts
    const firstTwoPosts = posts.slice(0, 2);

    // Fetch details for both posts in parallel
    const details = await Promise.all(
      firstTwoPosts.map(async (post) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch post ${post.id}`);
        }

        return response.json();
      }),
    );

    console.log("First two posts:");
    console.log(details);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

getPostsAndDetails();
