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
exports.getSubmissionsByTask = exports.getAllSubmissions = exports.submitTask = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
const submitTask = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.taskSubmission.create({
        data: {
            taskId: data.taskId,
            userId: data.userId,
            status: 'belum',
            completionNote: data.content,
        },
        include: {
            task: true,
            user: { select: { name: true, role: true } }
        }
    });
});
exports.submitTask = submitTask;
const getAllSubmissions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.taskSubmission.findMany({
        orderBy: { submittedAt: 'desc' },
        include: {
            user: { select: { name: true, role: true } },
            task: { select: { title: true, category: true } }
        }
    });
});
exports.getAllSubmissions = getAllSubmissions;
const getSubmissionsByTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.taskSubmission.findMany({
        where: { taskId },
        include: {
            user: { select: { name: true } }
        }
    });
});
exports.getSubmissionsByTask = getSubmissionsByTask;
