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
exports.deletePortfolio = exports.updatePortfolio = exports.getPortfoliosByUser = exports.getAllPortfolios = exports.createPortfolio = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
const createPortfolio = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.portfolio.create({
        data: {
            title: data.title,
            description: data.description,
            type: data.type,
            fileUrl: data.fileUrl,
            user: { connect: { id: data.userId } }
        },
        include: {
            user: { select: { name: true } }
        }
    });
});
exports.createPortfolio = createPortfolio;
const getAllPortfolios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.portfolio.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true } }
        }
    });
});
exports.getAllPortfolios = getAllPortfolios;
const getPortfoliosByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.portfolio.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
});
exports.getPortfoliosByUser = getPortfoliosByUser;
const updatePortfolio = (portfolioId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.portfolio.update({
        where: { id: portfolioId },
        data: {
            description: data.description,
            type: data.type,
            fileUrl: data.fileUrl
        }
    });
});
exports.updatePortfolio = updatePortfolio;
const deletePortfolio = (portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.portfolio.delete({
        where: { id: portfolioId }
    });
});
exports.deletePortfolio = deletePortfolio;
