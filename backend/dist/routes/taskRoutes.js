"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Semua route memerlukan authentication
router.use(authMiddleware_1.authenticateToken);
// Route yang memerlukan role TEACHER atau ADMIN
router.post('/', authMiddleware_1.requireTeacherOrAdmin, taskController_1.createTask);
router.delete('/:id', authMiddleware_1.requireTeacherOrAdmin, taskController_1.deleteTask);
// Route yang bisa diakses semua role
router.get('/', authMiddleware_1.requireAnyRole, taskController_1.getAllTasks);
router.get('/:id', authMiddleware_1.requireAnyRole, taskController_1.getTaskById);
exports.default = router;
