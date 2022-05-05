const logout = async () => {

    const response = await fetch('/profile', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/login');
    }
    else {
        alert(response.statusText);
    }
};

document
.querySelector('#logout')
.addEventListener('click', logout);
