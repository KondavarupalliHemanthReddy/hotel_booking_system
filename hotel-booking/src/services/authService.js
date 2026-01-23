const API_URL = "https://hotel-booking-system-vq5g.onrender.com";

export const loginUser = async (email, password) => {
  const res = await fetch(
    `${API_URL}/users?email=${email}&password=${password}`
  );
  const users = await res.json();

  if (users.length === 0) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem("user", JSON.stringify(users[0]));
  return users[0];
};

export const registerUser = async (user) => {
  const res = await fetch(
    `${API_URL}/users?email=${user.email}`
  );
  const existing = await res.json();

  if (existing.length > 0) {
    throw new Error("Email already exists");
  }

  await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
