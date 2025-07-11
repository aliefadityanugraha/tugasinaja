"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const taskService = __importStar(require("../services/taskService"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, category, points, dueDate } = req.body;
        console.log(title, description, category, points, dueDate);
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(401).json({ error: 'User tidak terautentikasi' });
        }
        const task = yield taskService.createTask({
            title,
            description,
            category,
            points,
            dueDate: new Date(dueDate),
            createdBy: req.user.id,
        });
        res.status(201).json(task);
        console.log("POST | http://localhost:" + process.env.PORT + "/api/tasks");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal membuat tugas', details: err.message });
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(401).json({ error: 'User tidak terautentikasi' });
        }
        const tasks = yield taskService.getAllTasks();
        res.status(200).json(tasks);
        console.log("GET | http://localhost:" + process.env.PORT + "/api/tasks");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengambil tugas' });
    }
});
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(401).json({ error: 'User tidak terautentikasi' });
        }
        const { id } = req.params;
        const task = yield taskService.getTaskById(id);
        if (!task)
            return res.status(404).json({ error: 'Tugas tidak ditemukan' });
        res.status(200).json(task);
        console.log("GET | http://localhost:" + process.env.PORT + "/api/tasks/:id");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengambil tugas' });
    }
});
exports.getTaskById = getTaskById;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(401).json({ error: 'User tidak terautentikasi' });
        }
        const { id } = req.params;
        yield taskService.deleteTask(id);
        res.json({ message: 'Tugas berhasil dihapus' });
        console.log("DELETE | http://localhost:" + process.env.PORT + "/api/tasks");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal menghapus tugas' });
    }
});
exports.deleteTask = deleteTask;
