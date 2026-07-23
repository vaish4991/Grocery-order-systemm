"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcryptjs");
var uuid_1 = require("uuid");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(userRepo, otpRepo, refreshTokenRepo, jwtService, config) {
            this.userRepo = userRepo;
            this.otpRepo = otpRepo;
            this.refreshTokenRepo = refreshTokenRepo;
            this.jwtService = jwtService;
            this.config = config;
        }
        // ── Register ─────────────────────────────────────────────────────────────
        AuthService_1.prototype.register = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingEmail, existingPhone, hashedPassword, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepo.findOne({ where: { email: dto.email } })];
                        case 1:
                            existingEmail = _a.sent();
                            if (existingEmail)
                                throw new common_1.ConflictException('Email already registered');
                            return [4 /*yield*/, this.userRepo.findOne({ where: { phone: dto.phone } })];
                        case 2:
                            existingPhone = _a.sent();
                            if (existingPhone)
                                throw new common_1.ConflictException('Phone already registered');
                            return [4 /*yield*/, bcrypt.hash(dto.password, 12)];
                        case 3:
                            hashedPassword = _a.sent();
                            user = this.userRepo.create({
                                name: dto.name,
                                email: dto.email,
                                phone: dto.phone,
                                password: hashedPassword,
                            });
                            return [4 /*yield*/, this.userRepo.save(user)];
                        case 4:
                            _a.sent();
                            // Send OTP
                            return [4 /*yield*/, this.sendOtp(dto.phone)];
                        case 5:
                            // Send OTP
                            _a.sent();
                            return [2 /*return*/, { message: 'Registration successful. Please verify your phone number.' }];
                    }
                });
            });
        };
        // ── Send OTP ─────────────────────────────────────────────────────────────
        AuthService_1.prototype.sendOtp = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                var otp, expiresAt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            otp = Math.floor(100000 + Math.random() * 900000).toString();
                            expiresAt = new Date(Date.now() + 5 * 60 * 1000);
                            return [4 /*yield*/, this.otpRepo.save(this.otpRepo.create({ phone: phone, code: otp, expiresAt: expiresAt }))];
                        case 1:
                            _a.sent();
                            // In development, log OTP to console
                            console.log("\uD83D\uDCF1 OTP for ".concat(phone, ": ").concat(otp));
                            // TODO: In production, send via SMS provider (MSG91 / Twilio)
                            return [2 /*return*/, { message: "OTP sent to ".concat(phone) }];
                    }
                });
            });
        };
        // ── Verify OTP ────────────────────────────────────────────────────────────
        AuthService_1.prototype.verifyOtp = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var otpRecord, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.otpRepo.findOne({
                                where: { phone: dto.phone, code: dto.otp, isUsed: false },
                                order: { createdAt: 'DESC' },
                            })];
                        case 1:
                            otpRecord = _a.sent();
                            if (!otpRecord)
                                throw new common_1.BadRequestException('Invalid OTP');
                            if (new Date() > otpRecord.expiresAt)
                                throw new common_1.BadRequestException('OTP has expired');
                            // Mark OTP as used
                            return [4 /*yield*/, this.otpRepo.update(otpRecord.id, { isUsed: true })];
                        case 2:
                            // Mark OTP as used
                            _a.sent();
                            return [4 /*yield*/, this.userRepo.findOne({ where: { phone: dto.phone } })];
                        case 3:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            return [4 /*yield*/, this.userRepo.update(user.id, { isPhoneVerified: true })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.generateTokens(user)];
                    }
                });
            });
        };
        // ── Login ─────────────────────────────────────────────────────────────────
        AuthService_1.prototype.login = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isPasswordValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepo.findOne({
                                where: { email: dto.email },
                                select: ['id', 'name', 'email', 'phone', 'role', 'status', 'password', 'isPhoneVerified'],
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.UnauthorizedException('Invalid credentials');
                            return [4 /*yield*/, bcrypt.compare(dto.password, user.password)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid)
                                throw new common_1.UnauthorizedException('Invalid credentials');
                            if (user.status === 'BANNED')
                                throw new common_1.UnauthorizedException('Account has been banned');
                            return [2 /*return*/, this.generateTokens(user)];
                    }
                });
            });
        };
        // ── Forgot Password ───────────────────────────────────────────────────────
        AuthService_1.prototype.forgotPassword = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, resetToken, expiresAt, _a, _b, _c, _d;
                var _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.userRepo.findOne({ where: { email: dto.email } })];
                        case 1:
                            user = _f.sent();
                            if (!user) {
                                // Return success even if email not found (security)
                                return [2 /*return*/, { message: 'If your email is registered, you will receive a reset link.' }];
                            }
                            resetToken = (0, uuid_1.v4)();
                            expiresAt = new Date(Date.now() + 60 * 60 * 1000);
                            _b = (_a = this.refreshTokenRepo).save;
                            _d = (_c = this.refreshTokenRepo).create;
                            _e = {
                                userId: user.id
                            };
                            return [4 /*yield*/, bcrypt.hash(resetToken, 10)];
                        case 2: // 1 hour
                        return [4 /*yield*/, _b.apply(_a, [_d.apply(_c, [(_e.token = _f.sent(),
                                        _e.expiresAt = expiresAt,
                                        _e)])])];
                        case 3:
                            _f.sent();
                            // TODO: Send email with reset link
                            console.log("\uD83D\uDCE7 Password reset token for ".concat(user.email, ": ").concat(resetToken));
                            return [2 /*return*/, { message: 'If your email is registered, you will receive a reset link.' }];
                    }
                });
            });
        };
        // ── Reset Password ────────────────────────────────────────────────────────
        AuthService_1.prototype.resetPassword = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var tokenRecord, isTokenValid, hashedPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refreshTokenRepo.findOne({
                                where: { isRevoked: false },
                                order: { createdAt: 'DESC' },
                            })];
                        case 1:
                            tokenRecord = _a.sent();
                            if (!tokenRecord)
                                throw new common_1.BadRequestException('Invalid or expired reset token');
                            if (new Date() > tokenRecord.expiresAt)
                                throw new common_1.BadRequestException('Reset token has expired');
                            return [4 /*yield*/, bcrypt.compare(dto.token, tokenRecord.token)];
                        case 2:
                            isTokenValid = _a.sent();
                            if (!isTokenValid)
                                throw new common_1.BadRequestException('Invalid reset token');
                            return [4 /*yield*/, bcrypt.hash(dto.password, 12)];
                        case 3:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, this.userRepo.update(tokenRecord.userId, { password: hashedPassword })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.refreshTokenRepo.update(tokenRecord.id, { isRevoked: true })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { message: 'Password reset successful. Please login.' }];
                    }
                });
            });
        };
        // ── Refresh Token ─────────────────────────────────────────────────────────
        AuthService_1.prototype.refreshTokens = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, user, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            payload = this.jwtService.verify(token, {
                                secret: this.config.get('JWT_REFRESH_SECRET'),
                            });
                            return [4 /*yield*/, this.userRepo.findOne({ where: { id: payload.sub } })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new common_1.UnauthorizedException();
                            return [2 /*return*/, this.generateTokens(user)];
                        case 2:
                            _a = _b.sent();
                            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // ── Private: Generate tokens ──────────────────────────────────────────────
        AuthService_1.prototype.generateTokens = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, _a, accessToken, refreshToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            payload = { sub: user.id, email: user.email, role: user.role };
                            return [4 /*yield*/, Promise.all([
                                    this.jwtService.signAsync(payload, {
                                        secret: this.config.get('JWT_ACCESS_SECRET'),
                                        expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN', '15m'),
                                    }),
                                    this.jwtService.signAsync(payload, {
                                        secret: this.config.get('JWT_REFRESH_SECRET'),
                                        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN', '7d'),
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), accessToken = _a[0], refreshToken = _a[1];
                            return [2 /*return*/, {
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                        phone: user.phone,
                                        role: user.role,
                                    },
                                    tokens: { accessToken: accessToken, refreshToken: refreshToken },
                                }];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
