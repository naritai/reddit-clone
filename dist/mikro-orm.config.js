"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const postgresql_1 = require("@mikro-orm/postgresql");
const migrations_1 = require("@mikro-orm/migrations");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post_1.Post, User_1.User],
    driver: postgresql_1.PostgreSqlDriver,
    driverOptions: {
        connection: {
            user: 'macbook-usa',
        },
    },
    dbName: 'reddb',
    debug: !constants_1.__PROD__,
    extensions: [migrations_1.Migrator],
};
//# sourceMappingURL=mikro-orm.config.js.map