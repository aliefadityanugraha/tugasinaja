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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskSubmissionRoutes_1 = __importDefault(require("./routes/taskSubmissionRoutes"));
const portfolioRoutes_1 = __importDefault(require("./routes/portfolioRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const prisma_1 = __importDefault(require("./models/prisma"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
function checkDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.$connect();
            console.log('Database connection successful');
        }
        catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1);
        }
    });
}
app.get('/', (_req, res) => {
    res.json({ message: `Backend Service listening on port http://localhost:${process.env.PORT}` });
    console.log("GET | http://localhost:" + process.env.PORT);
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/submissions', taskSubmissionRoutes_1.default);
app.use('/api/portfolios', portfolioRoutes_1.default);
const PORT = process.env.PORT || 4000;
checkDatabaseConnection().then(() => {
    app.listen(PORT, () => console.log(`Server listening on port http://localhost:${process.env.PORT}`));
});
