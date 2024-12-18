"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const init = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("connected to database"));
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error("DATABASE_URL is not defined");
        }
        mongoose_1.default.connect(databaseUrl).then(() => {
            // Apply CORS first
            app.use((0, cors_1.default)());
            // Then body parsers
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use(body_parser_1.default.json());
            // Explicit OPTIONS handler
            app.options('*', (0, cors_1.default)());
            // Routes
            app.use("/auth", auth_route_1.default);
            resolve(app);
        });
    });
    return promise;
};
exports.default = init;
