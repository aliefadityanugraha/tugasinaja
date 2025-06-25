"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Route untuk register (tidak memerlukan authentication)
router.post('/register', userController_1.registerUser);
// Route yang memerlukan authentication
router.use(authMiddleware_1.authenticateToken);
// Route yang memerlukan role ADMIN
router.get('/', authMiddleware_1.requireAdmin, userController_1.getUsers);
// Route untuk update profile sendiri
router.put('/me', authMiddleware_1.authenticateToken, userController_1.updateCurrentUser);
exports.default = router;
