const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#new-comment').value.trim();
  const post_id = localStorage.getItem('post_id') || null;

  if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, post_id }),
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
