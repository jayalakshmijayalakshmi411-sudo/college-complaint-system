import authService from "../services/authService.js";

export const authController = {
  async register(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (confirmPassword && password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const user = await authService.register({
        name,
        email,
        password,
        role: "student",
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      const { token, user } = await authService.login(email, password);

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getMe(req, res) {
    try {
      const user = await authService.getUserById(req.userId);
      res.status(200).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default authController;
