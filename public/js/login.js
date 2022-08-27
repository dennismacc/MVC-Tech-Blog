const loginFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-field');
  const passwordEl = document.querySelector('#password-field');

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.json().then(data => console.log(data));

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }

  
};

document
  .querySelector('#login-btn')
  .addEventListener('click', loginFormHandler);
