const postFormHandler = async (event) => {
  event.preventDefault();

  console.log(document);
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
