const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#username-field');
    const passwordEl = document.querySelector('#password-field');
  
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    const responseData = await response.json();
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up: ' + responseData.message);
    }
  };
  
  document
    .querySelector('#signup-btn')
    .addEventListener('click', signupFormHandler);