const dummyUser = {
  email: "test@example.com",
  password: "Password1",
};
const users = JSON.parse(localStorage.getItem("users")) || [];
const existingUser = users.find((user) => user.email === dummyUser.email);

if (!existingUser) {
  users.push(dummyUser);
  localStorage.setItem("users", JSON.stringify(users));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return passwordRegex.test(password);
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!isValidEmail(email)) {
    alert("Invalid email address");
    return false;
  }

  if (!isValidPassword(password)) {
    alert("Password must be at least 8 characters long");
    return false;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    alert("Invalid email or password");
    return false;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "homepage.html";

  alert("Logged in successfully");
  return true;
}

function register() {
  const email = document.getElementById("new-email").value;
  const password = document.getElementById("new-password").value;

  if (!isValidEmail(email)) {
    alert("Invalid email address");
    return false;
  }

  if (!isValidPassword(password)) {
    alert(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    );
    return false;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    alert("User already exists");
    return false;
  }

  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully");
  return true;
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out successfully");
}
