document.addEventListener('DOMContentLoaded', function() {
    let modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
  });

  document.getElementById("create-post-btn").addEventListener("click", function(event) {
    event.preventDefault();
  
    // Get the form data
    const formData = new FormData(document.querySelector("form"));
    const post = Object.fromEntries(formData);
  
    fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          // Close the "New Post" modal
          const newPostModal = M.Modal.getInstance(document.getElementById("new-post-modal"));
          newPostModal.close();
          // Open the "Post Successful" modal
          const postSuccessModal = M.Modal.getInstance(document.getElementById("post-success-modal"));
          postSuccessModal.open();
      })
      .catch(error => {
          console.error(error);
      });
  });
  