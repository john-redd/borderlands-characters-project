const logoutButton = document.getElementById('logout-btn');

logoutButton.addEventListener('click', handleLogin);

async function logout() {
  try {
    await axios.delete('/auth/logout');

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

async function getCharacters() {
  try {
    const res = await axios.get('/api/characters');

    renderCharacters(res.data);
  } catch (error) {
    showUnexpectedErrorAlert();
  }
}

function renderCharacters(characters) {
  const charactersContainer = document.getElementById('characters-container');

  const htmlStr = characters
    .map((character) => {
      return `
      <li>
        <p>${character.name} is level ${character.level}</p>
      </li>
    `;
    })
    .join('');

  charactersContainer.innerHTML = htmlStr;
}

getCharacters();
