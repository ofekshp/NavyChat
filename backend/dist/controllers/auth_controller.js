"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = __importDefault(require("../models/auth_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// User registration
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    if (email === undefined || password === undefined) {
        return res.status(400).json({ message: 'Email and password are require' });
    }
    try {
        const user = yield auth_model_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: 'User allready exist' });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield auth_model_1.default.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        return res.status(200).send(newUser);
    }
    catch (err) {
        return res.status(400).send("Error in registration");
    }
});
// User login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        return res.status(400).json({ message: 'Email and password are require' });
    }
    try {
        const user = yield auth_model_1.default.findOne({ email: email });
        if (user == null) {
            return res.status(400).json({ message: 'User do not exist' });
        }
        // compare pwd
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful', user });
    }
    catch (err) {
        return res.status(400).json({ message: 'Error in login' });
    }
});
exports.default = { register, login };
