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
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
  
    const instance = M.Modal.init(document.getElementById('logout-modal'));
    instance.open();
  
    setTimeout(() => {
      instance.close();
      window.location.replace('/');
    }, 5000);
  }
  