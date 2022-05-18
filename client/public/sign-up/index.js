const emailInput = document.getElementsByName('email')[0];
const passwordInput = document.getElementsByName('password')[0];
const submitButton = document.getElementsByName('submit')[0];

submitButton.addEventListener('click', handleSignUp);

async function signUp(email, password) {
  try {
    await axios.post('/auth/sign-up', { email, password });

    window.location = '/characters';
  } catch (error) {
    showUnexpectedErrorAlert();
  }
}

function handleSignUp() {
  const email = emailInput.value;
  const password = passwordInput.value;

  console.log({ email, password });

  signUp(email, password);
}

function showUnexpectedErrorAlert() {
  alert('Sorry, an unexpected error occurred. Please try again later!');
}
