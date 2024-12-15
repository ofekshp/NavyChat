import { Request, Response , NextFunction} from "express";
import User from "../models/auth_model";
import bcrypt from "bcrypt";

// User registration
const register = async (req: Request, res: Response ) => {
  const { email, password , username} = req.body;
    if (email === undefined || password === undefined) {
      return res.status(400).json({ message: 'Email and password are require' });
    }
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ message: 'User allready exist' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        username:username,
        email: email,
        password: hashedPassword,
      });
      return res.status(200).send(newUser);
    } catch (err) {
      return res.status(400).send("Error in registration");
    }
  };

    // User login
    const login = async (req: Request, res: Response) => {
      const { email, password } = req.body;

        if (email === undefined || password === undefined) {
        return res.status(400).json({ message: 'Email and password are require' });
        }
    
        try {
        const user = await User.findOne({ email: email });
        if (user == null) {
            return res.status(400).json({ message: 'User do not exist' });
        }
        // compare pwd
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful' , user });
        } catch (err) {
        return res.status(400).json({ message: 'Error in login' });
        }
    };

export default { register, login };
