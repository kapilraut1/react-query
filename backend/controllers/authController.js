export const login = async (req, res) => {
  const { email, password } = req.body;

  const hardcoded = {
    email: "kapil@gmail.com",
    password: "admin123",
  };

  if (email === hardcoded.email && password === hardcoded.password) {
    return res.status(200).json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

