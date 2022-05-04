const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  console.log(username);
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#new-title').value.trim();
  const summary = document.querySelector('#new-summary').value.trim();

  if (title && summary) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, summary }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#new-comment').value.trim();

  if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
