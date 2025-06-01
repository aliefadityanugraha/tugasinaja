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
exports.deleteTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
const createTask = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.task.create({ data });
});
exports.createTask = createTask;
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.task.findMany({
        orderBy: { dueDate: 'asc' },
        include: { creator: { select: { name: true, role: true } } },
    });
});
exports.getAllTasks = getAllTasks;
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.task.findUnique({ where: { id } });
});
exports.getTaskById = getTaskById;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.task.delete({ where: { id } });
});
exports.deleteTask = deleteTask;
