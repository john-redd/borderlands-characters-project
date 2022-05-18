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

  for (const character of characters) {
    const p = document.createElement('p');
    p.innerText = `${character.name} is level ${character.level}`;

    const li = document.createElement('li');
    li.appendChild(p);
    li.addEventListener('dblclick', () => {
      const nameInput = document.getElementsByName('name')[0];
      const levelInput = document.getElementsByName('level')[0];
      const methodInput = document.getElementsByName('_method')[0];
      const idInput = document.getElementsByName('id')[0];
      const button = document.getElementsByName('submit')[0];

      nameInput.value = character.name;
      levelInput.value = character.level;
      methodInput.value = 'patch';
      idInput.value = character.id;
      button.innerText = 'Update Character';
    });

    charactersContainer.appendChild(li);
  }
}

getCharacters();
