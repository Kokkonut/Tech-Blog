document.addEventListener('DOMContentLoaded', function() {
    // Initialize the modal
    var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
  });
  
  const validateForm = (formType) => {
    let username;
    let password;
  
    // Check which form is being submitted
    if (formType === 'login') {
      username = document.getElementById("login-username").value;
      password = document.getElementById("login-password").value;
    } else if (formType === 'signup') {
      username = document.getElementById("signup-username").value;
      password = document.getElementById("signup-password").value;
    }
  
    // Check if the input values are empty
    if (!username || !password) {
      alert("Please enter a valid username and password");
      return false;
    }
  
    // If the input values are not empty, submit the form
    return true;
  }
  