async function handleSignup(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Submit the form and get the response from the server
  const response = await fetch('/api/users/signup', {
    method: 'POST',
    body: new FormData(event.target),
  });

  // Handle the response from the server
  if (response.ok) {
    // If the signup was successful, redirect the user to the dashboard
    window.location.replace('/dashboard');
  } else {
    // If the signup was unsuccessful, display an error message in a modal
    const data = await response.json();
    const modal = M.Modal.getInstance(document.getElementById('error-modal'));
    document.getElementById('error-message').innerHTML = data.message;
    modal.open();
  }
}