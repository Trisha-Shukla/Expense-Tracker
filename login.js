let defaultSignUp = true;  // Tracks whether we're in sign-up mode

    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (defaultSignUp) {
            signUp();
        } else {
            signIn();
        }
    });

    // Toggle between Sign Up and Login forms
    document.getElementById('toggleForm').addEventListener('click', () => {
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
        document.getElementById('form-title').innerText = 'Sign Up';
        document.getElementById('submitBtn').innerText = 'Sign Up';
        document.getElementById('username').style.display = 'block';  // Show username field
        document.getElementById('username').setAttribute('required', 'true');  // Add 'required' back
        document.getElementById('toggleForm').innerText = 'Already have an account? Login';
        document.getElementById('message').innerText = '';  // Clear message
    }
    
    function switchToLogin() {
        defaultSignUp = false;
        document.getElementById('form-title').innerText = 'Login';
        document.getElementById('submitBtn').innerText = 'Login';
        document.getElementById('username').style.display = 'none';  // Hide username field
        document.getElementById('username').removeAttribute('required');  // Remove 'required' attribute
        document.getElementById('toggleForm').innerText = 'Don\'t have an account? Sign Up';
        document.getElementById('message').innerText = '';  // Clear message
    }
    
    // Handle Sign-Up process
    // Handle Sign-Up process
function signUp() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!username || !email || !password) {
        document.getElementById('message').innerText = 'All fields are required!';
        return;
    }

    // Get user data from localStorage
    let storedUsers = JSON.parse(localStorage.getItem('UserInfo')) || [];

    // Check if user already exists
    let userExists = storedUsers.some(user => user.email === email);
    if (userExists) {
        document.getElementById('message').innerText = 'User already exists!';
        return;
    }

    // Store user info in localStorage
    let userInfo = { username: username, email: email, password: password };
    storedUsers.push(userInfo);
    localStorage.setItem('UserInfo', JSON.stringify(storedUsers));

    // Clear form fields
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    // After successful sign-up, redirect to Login
    document.getElementById('message').innerText = 'User registered successfully! Redirecting to login...';
    setTimeout(switchToLogin, 1500);  // Redirect to Login after 1.5 seconds
}


    // Handle Login process
    function signIn() {
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();

    // Get user data from localStorage
    let storedUsers = JSON.parse(localStorage.getItem('UserInfo')) || [];

    let user = storedUsers.find(user => user.email === email);
    if (user) {
        if (user.password === password) {
            // Hide sign-up form and show expense tracker
            console.log("Hiii");
            
            document.getElementById('form-section').style.display = "none";
            document.getElementById('expense-tracker-container').style.display = "block";
            document.getElementById('message').innerText = ""; // Clear any previous messages
        } else {
            document.getElementById('message').innerText = 'Incorrect password!';
        }
    } else {
        document.getElementById('message').innerText = 'User does not exist!';
    }
}


