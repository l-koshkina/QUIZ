function checkUserData() {
    const url = new URL(location.href);
    const name = sessionStorage.getItem('name');
    const lastName = sessionStorage.getItem('lastName');
    const email = sessionStorage.getItem('email');

    if (!name || !lastName || !email) {
        location.href = 'index.html';
    }
}