async function logout() {
    await fetch('/api/users/logout', { method: 'POST' });
    showLogoutModal();
  }

  function showLogoutModal() {
    const modal = `
      <div id="logout-modal" class="modal">
        <div class="modal-content">
          <h4>Logout</h4>
          <p>You have been logged out.</p>
        </div>
        <div class="modal-footer">
          <a href="#!" id="close-modal" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
  
    const instance = M.Modal.init(document.getElementById('logout-modal'));
    instance.open();
  
    const closeButton = document.getElementById('close-modal');
    closeButton.addEventListener('click', () => {
      window.location.replace('/');
    });
  
    setTimeout(() => {
      window.location.replace('/');
    }, 5000);
  }
  