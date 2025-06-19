"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in the environment variables');
}
exports.default = {
    schema: './src/infrastructure/database/schema.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};
//# sourceMappingURL=drizzle.config.js.map