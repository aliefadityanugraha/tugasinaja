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
exports.updateUserById = exports.getUserById = exports.getUserByEmail = exports.getAllUsers = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../models/prisma"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.create({ data: {
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password,
        } });
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
});
exports.getAllUsers = getAllUsers;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: { email }
    });
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: { id }
    });
});
exports.getUserById = getUserById;
const updateUserById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.update({
        where: { id },
        data: {
            name: data.name,
            avatarUrl: data.avatarUrl,
        },
    });
});
exports.updateUserById = updateUserById;
