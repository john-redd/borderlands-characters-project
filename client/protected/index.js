const logoutButton = document.getElementById('logout-btn');

logoutButton.addEventListener('click', handleLogin);

async function logout() {
  try {
    const res = await axios.delete('/auth/logout');

    window.location = '/login';
  } catch (error) {
    console.log(error);
    showUnexpectedErrorAlert();
  }
}

function handleLogin() {
  logout();
}

function showUnexpectedErrorAlert() {
  alert('Sorry, an unexpected error occurred. Please try again later!');
}
