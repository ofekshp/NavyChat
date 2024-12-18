"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth_controller"));
// Route for user registration
router.post('/register', (req, res) => {
    console.log('Received POST request to /signup');
    auth_controller_1.default.register(req, res);
});
// Route for user login
router.post('/login', (req, res) => {
    console.log('Received POST request to /login');
    auth_controller_1.default.login(req, res);
});
router.post('/search', (req, res) => {
    console.log('Received GET request to /search');
    auth_controller_1.default.getUser(req, res);
});
exports.default = router;
