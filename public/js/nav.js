document.addEventListener('DOMContentLoaded', function() {
  // Initialize the modal
  const modal = document.querySelectorAll('.modal');
  M.Modal.init(modal, {
    onOpenEnd: function() {
      // Check if the login form exists
      const loginForm = document.getElementById('login-form');
      if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
      }

      // Check if the signup form exists
      const signupForm = document.getElementById('signup-form');
      if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
      }
    }
  });
});

const validateForm = (formType) => {
  let username;
  let password;

  // Check which form is being submitted
  if (formType === 'login') {
    username = document.getElementById("login_username").value;
    password = document.getElementById("login_password").value;
  } else if (formType === 'signup') {
    username = document.getElementById("signup_username").value;
    password = document.getElementById("signup_password").value;
  }

  // Check if the input values are empty
  if (!username || !password) {
    alert("Please enter a valid username and password");
    return false;
  }

  // If the input values are not empty, submit the form
  return true;
}

// Make a POST request to the login API with the form data
async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('login_username').value;
  const password = document.getElementById('login_password').value;

  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  const data = await response.json();
  console.log(data);
}

// Make a POST request to the signup API with the form data
async function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById('signup_username').value;
  const password = document.getElementById('signup_password').value;

  const response = await fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  const data = await response.json();
  console.log(data);
}
