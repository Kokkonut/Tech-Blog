async function login(event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();
  
    // Get the username and password from the form
    const username = document.getElementById('login_username').value;
    const password = document.getElementById('login_password').value;
  
    // Validate the form inputs
    if (!username || !password) {
      console.error('Username and password are required');
      return;
    }
    if (username.length < 5) {
      console.error('Username must be at least 5 characters long');
      return;
    }
    if (password.length < 8) {
      console.error('Password must be at least 8 characters long');
      return;
    }
  
    // Create a body object with the username and password
    const body = { username, password };
  
    // Send a POST request to the login endpoint with the body object
    const response = await fetch('api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
  
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', login);
});
