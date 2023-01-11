
  document.getElementById("create-post-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Get the form data
    const formData = new FormData(document.querySelector("form"));
  
    // Create a new post object from the form data
    const post = Object.fromEntries(formData);
  
    // Send the post object to the API endpoint using fetch
    fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); // Log the response data
        // Handle the response data as needed (e.g. show a success message)
      })
      .catch(error => {
        console.error(error); // Log the error
        // Handle the error as needed (e.g. show an error message)
      });
  });
  