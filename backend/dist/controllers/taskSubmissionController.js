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
exports.getSubmissionsByTask = exports.getAllSubmissions = exports.submitTask = void 0;
const submissionService = __importStar(require("../services/taskSubmissionService"));
const submitTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, userId, content } = req.body;
        if (!taskId || !userId || !content) {
            return res.status(400).json({ error: 'Data tidak lengkap' });
        }
        const submission = yield submissionService.submitTask({ taskId, userId, content });
        res.status(201).json(submission);
        console.log("POST | http://localhost:" + process.env.PORT + "/api/submission");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengumpulkan tugas' });
    }
});
exports.submitTask = submitTask;
const getAllSubmissions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submissions = yield submissionService.getAllSubmissions();
        res.status(200).json(submissions);
        console.log("GET | http://localhost:" + process.env.PORT + "/api/submission");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data pengumpulan' });
    }
});
exports.getAllSubmissions = getAllSubmissions;
const getSubmissionsByTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const submissions = yield submissionService.getSubmissionsByTask(taskId);
        res.status(200).json(submissions);
        console.log("GET | http://localhost:" + process.env.PORT + "/api/submission/task/:taskId");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data tugas' });
    }
});
exports.getSubmissionsByTask = getSubmissionsByTask;
