"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskSubmissionRoutes_1 = __importDefault(require("./routes/taskSubmissionRoutes"));
const portfolioRoutes_1 = __importDefault(require("./routes/portfolioRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('Backend aktif');
});
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/submissions', taskSubmissionRoutes_1.default);
app.use('/api/portfolios', portfolioRoutes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${process.env.PORT}`));
