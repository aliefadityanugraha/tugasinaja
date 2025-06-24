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
exports.deletePortfolio = exports.updatePortfolio = exports.getPortfoliosByUser = exports.getAllPortfolios = exports.createPortfolio = void 0;
const portfolioService = __importStar(require("../services/portfolioService"));
const createPortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, userId, type, fileUrl } = req.body;
        console.log(title, description, userId, type, fileUrl);
        if (!title || !description || !userId || !type || !fileUrl) {
            return res.status(400).json({ error: 'Data tidak lengkap' });
        }
        const portfolio = yield portfolioService.createPortfolio({ title, description, userId, type, fileUrl });
        res.status(201).json(portfolio);
        console.log("POST | http://localhost:" + process.env.PORT + "/api/portfolios");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Gagal menambahkan portofolio' });
    }
});
exports.createPortfolio = createPortfolio;
const getAllPortfolios = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolios = yield portfolioService.getAllPortfolios();
        res.status(200).json(portfolios);
        console.log("GET | http://localhost:" + process.env.PORT + "/api/portfolios");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data portofolio' });
    }
});
exports.getAllPortfolios = getAllPortfolios;
const getPortfoliosByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const portfolios = yield portfolioService.getPortfoliosByUser(userId);
        res.json(portfolios);
        console.log("GET | http://localhost:" + process.env.PORT + "/api/portfolios/:id");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengambil portofolio USER' });
    }
});
exports.getPortfoliosByUser = getPortfoliosByUser;
const updatePortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { portfolioId } = req.params;
        const { title, description, type, fileUrl } = req.body;
        if (!title && !description && !type && !fileUrl) {
            return res.status(400).json({ error: 'Tidak ada data yang diupdate' });
        }
        const updatedPortfolio = yield portfolioService.updatePortfolio(portfolioId, { title, description, type, fileUrl });
        if (!updatedPortfolio) {
            return res.status(404).json({ error: 'Portofolio tidak ditemukan' });
        }
        res.status(200).json(updatedPortfolio);
        console.log("PUT | http://localhost:" + process.env.PORT + "/api/portfolios");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengupdate portofolio' });
    }
});
exports.updatePortfolio = updatePortfolio;
const deletePortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { portfolioId } = req.params;
        const deleted = yield portfolioService.deletePortfolio(portfolioId);
        if (!deleted) {
            return res.status(404).json({ error: 'Portofolio tidak ditemukan' });
        }
        res.status(200).json({ message: 'Portofolio berhasil dihapus' });
        console.log("DELETE | http://localhost:" + process.env.PORT + "/api/portfolios");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal menghapus portofolio' });
    }
});
exports.deletePortfolio = deletePortfolio;
