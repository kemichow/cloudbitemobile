    const toggleBtn = document.querySelector('.m-toggle-password');
    const passwordInput = document.getElementById('m-password');
    const eyeIcon = toggleBtn.querySelector('.m-eye-icon');
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      eyeIcon.src = isPassword ? 'assets/showeye.svg' : 'assets/closeeye.svg';
      toggleBtn.setAttribute('aria-pressed', String(isPassword));
      toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });

    const viewLogin = document.getElementById('view-login');
    const viewBrand = document.getElementById('view-brand');

    function showView(view) {
      [viewLogin, viewBrand].forEach((v) => { v.hidden = v !== view; });
      window.scrollTo(0, 0);
    }

    document.getElementById('m-login-btn').addEventListener('click', () => {
      showView(viewBrand);
    });

    document.getElementById('brand-oiso').addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'dashboard.html';
    });

    document.getElementById('brand-mimi').addEventListener('click', (e) => {
      e.preventDefault();
      // No dashboard built for MIMI yet.
    });
