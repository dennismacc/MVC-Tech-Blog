const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title-field').value.trim();
    const content = document.querySelector('#content-field').value.trim();
  
    if (!(title && content)) {
      alert('Invalid form. Please fill out all required fields');
      return;
    }
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  console.log('running new post script');
  
  document
    .querySelector('#submit-btn')
    .addEventListener('click', newFormHandler);