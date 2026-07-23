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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var bcrypt = require("bcryptjs");
var dotenv = require("dotenv");
dotenv.config();
var dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'gos_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
});
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var userRepo, adminExists, hashedPassword, categoryRepo, categories, _i, categories_1, cat, exists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dataSource.initialize()];
                case 1:
                    _a.sent();
                    console.log('🌱 Seeding database...');
                    userRepo = dataSource.getRepository('users');
                    return [4 /*yield*/, userRepo.findOne({
                            where: { email: process.env.ADMIN_EMAIL || 'admin@gosgrocery.com' },
                        })];
                case 2:
                    adminExists = _a.sent();
                    if (!!adminExists) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123!', 12)];
                case 3:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, userRepo.save({
                            name: 'GOS Admin',
                            email: process.env.ADMIN_EMAIL || 'admin@gosgrocery.com',
                            phone: '9000000000',
                            password: hashedPassword,
                            role: 'ADMIN',
                            status: 'ACTIVE',
                            isEmailVerified: true,
                            isPhoneVerified: true,
                        })];
                case 4:
                    _a.sent();
                    console.log('✅ Admin user created');
                    return [3 /*break*/, 6];
                case 5:
                    console.log('ℹ️  Admin user already exists');
                    _a.label = 6;
                case 6:
                    categoryRepo = dataSource.getRepository('categories');
                    categories = [
                        { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', description: 'Fresh daily produce', sortOrder: 1 },
                        { name: 'Dairy & Eggs', slug: 'dairy-eggs', description: 'Fresh dairy products', sortOrder: 2 },
                        { name: 'Meat & Seafood', slug: 'meat-seafood', description: 'Fresh meats and seafood', sortOrder: 3 },
                        { name: 'Beverages', slug: 'beverages', description: 'Drinks and juices', sortOrder: 4 },
                        { name: 'Bakery', slug: 'bakery', description: 'Bread and baked goods', sortOrder: 5 },
                        { name: 'Snacks', slug: 'snacks', description: 'Chips, nuts and snacks', sortOrder: 6 },
                        { name: 'Personal Care', slug: 'personal-care', description: 'Hygiene and wellness', sortOrder: 7 },
                        { name: 'Cleaning', slug: 'cleaning', description: 'Cleaning supplies', sortOrder: 8 },
                    ];
                    _i = 0, categories_1 = categories;
                    _a.label = 7;
                case 7:
                    if (!(_i < categories_1.length)) return [3 /*break*/, 11];
                    cat = categories_1[_i];
                    return [4 /*yield*/, categoryRepo.findOne({ where: { slug: cat.slug } })];
                case 8:
                    exists = _a.sent();
                    if (!!exists) return [3 /*break*/, 10];
                    return [4 /*yield*/, categoryRepo.save(cat)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 7];
                case 11:
                    console.log('✅ Sample categories created');
                    return [4 /*yield*/, dataSource.destroy()];
                case 12:
                    _a.sent();
                    console.log('🎉 Seeding complete!');
                    return [2 /*return*/];
            }
        });
    });
}
seed().catch(function (e) {
    console.error('❌ Seed failed:', e);
    process.exit(1);
});
