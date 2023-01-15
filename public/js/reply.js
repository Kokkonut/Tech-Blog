console.log('reply.js loaded');
document.getElementById("create-comment-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const commentText = document.getElementById("comment-text").value;
    const res = await fetch('api/comments/createz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: commentText })
    });
    if (res.ok) {
      const data = await res.json();
      console.log('Comment created successfully', data);
    } else {
      console.log(`Error creating comment: ${res.status} ${res.statusText}`);
    }
  });
