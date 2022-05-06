const saveId = async () => {
  const searchId = document.location.pathname.split('/');
  console.log(searchId);
  const last = searchId.length - 1;
  const id = searchId[last];

  localStorage.setItem('post_id', id);
};
document.querySelector('.post').addEventListener('click', saveId);
