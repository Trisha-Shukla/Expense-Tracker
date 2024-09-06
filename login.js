let defaultSignUp = true;

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (defaultSignUp) {
    signUp();
  } else {
    signIn();
  }
});

document.getElementById("toggleForm").addEventListener("click", () => {
  if (defaultSignUp) {
    switchToLogin();
  } else {
    switchToSignUp();
  }
});

// function switchToSignUp() {
//     defaultSignUp = true;
//     document.getElementById('form-title').innerText = 'Sign Up';
//     document.getElementById('submitBtn').innerText = 'Sign Up';
//     document.getElementById('username').style.display = 'block';
//     document.getElementById('toggleForm').innerText = 'Already have an account? Login';
//     document.getElementById('message').innerText = '';  // Clear message
// }

// function switchToLogin() {
//     defaultSignUp = false;
//     document.getElementById('form-title').innerText = 'Login';
//     document.getElementById('submitBtn').innerText = 'Login';
//     document.getElementById('username').style.display = 'none';
//     document.getElementById('toggleForm').innerText = 'Don\'t have an account? Sign Up';
//     document.getElementById('message').innerText = '';  // Clear message
// }
function switchToSignUp() {
  defaultSignUp = true;
  document.getElementById("form-title").innerText = "Sign Up";
  document.getElementById("submitBtn").innerText = "Sign Up";
  document.getElementById("username").style.display = "block";
  document.getElementById("username").setAttribute("required", "true");
  document.getElementById("toggleForm").innerText =
    "Already have an account? Login";
  document.getElementById("message").innerText = "";
}

function switchToLogin() {
  defaultSignUp = false;
  document.getElementById("form-title").innerText = "Login";
  document.getElementById("submitBtn").innerText = "Login";
  document.getElementById("username").style.display = "none";
  document.getElementById("username").removeAttribute("required");
  document.getElementById("toggleForm").innerText =
    "Don't have an account? Sign Up";
  document.getElementById("message").innerText = "";
}

function signUp() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!username || !email || !password) {
    document.getElementById("message").innerText = "All fields are required!";
    return;
  }

  let storedUsers = JSON.parse(localStorage.getItem("UserInfo")) || [];

  let userExists = storedUsers.some((user) => user.email === email);
  if (userExists) {
    document.getElementById("message").innerText = "User already exists!";
    return;
  }

  let userInfo = { username: username, email: email, password: password };
  storedUsers.push(userInfo);
  localStorage.setItem("UserInfo", JSON.stringify(storedUsers));

  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  document.getElementById("message").innerText =
    "User registered successfully! Redirecting to login...";
  setTimeout(switchToLogin, 1500);
}

function signIn() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let storedUsers = JSON.parse(localStorage.getItem("UserInfo")) || [];

  let user = storedUsers.find((user) => user.email === email);
  if (user) {
    if (user.password === password) {
      console.log(user.password);

      document.getElementById("form-section").style.display = "none";
      document.getElementById("expense-tracker-container").style.display =
        "block";
      document.getElementById("message").innerText = "";
    } else {
      document.getElementById("message").innerText = "Incorrect password!";
    }
  } else {
    document.getElementById("message").innerText = "User does not exist!";
  }
}
