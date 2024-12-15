import express from "express";
const router = express.Router();
import AuthControllers from '../controllers/auth_controller';

// Route for user registration
router.post('/register', (req, res) => {
    console.log('Received POST request to /signup');
    AuthControllers.register(req, res);
  });

// Route for user login
router.post('/login', (req, res) => {
    console.log('Received POST request to /login');
    AuthControllers.login(req, res);
  });

export default router;