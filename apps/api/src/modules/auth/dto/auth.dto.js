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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenDto = exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.VerifyOtpDto = exports.LoginDto = exports.RegisterDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var RegisterDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.phone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.password = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
            }
            return RegisterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ example: 'John Doe' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2)];
            _email_decorators = [(0, swagger_1.ApiProperty)({ example: 'john@example.com' }), (0, class_validator_1.IsEmail)()];
            _phone_decorators = [(0, swagger_1.ApiProperty)({ example: '9876543210' }), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({ example: 'Password@123' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8), (0, class_validator_1.Matches)(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
                    message: 'Password must contain uppercase, lowercase, and number',
                })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterDto = RegisterDto;
var LoginDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    return _a = /** @class */ (function () {
            function LoginDto() {
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
            }
            return LoginDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiProperty)({ example: 'john@example.com' }), (0, class_validator_1.IsEmail)()];
            _password_decorators = [(0, swagger_1.ApiProperty)({ example: 'Password@123' }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.LoginDto = LoginDto;
var VerifyOtpDto = function () {
    var _a;
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _otp_decorators;
    var _otp_initializers = [];
    var _otp_extraInitializers = [];
    return _a = /** @class */ (function () {
            function VerifyOtpDto() {
                this.phone = __runInitializers(this, _phone_initializers, void 0);
                this.otp = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _otp_initializers, void 0));
                __runInitializers(this, _otp_extraInitializers);
            }
            return VerifyOtpDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _phone_decorators = [(0, swagger_1.ApiProperty)({ example: '9876543210' }), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^[6-9]\d{9}$/)];
            _otp_decorators = [(0, swagger_1.ApiProperty)({ example: '123456' }), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(6, 6)];
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _otp_decorators, { kind: "field", name: "otp", static: false, private: false, access: { has: function (obj) { return "otp" in obj; }, get: function (obj) { return obj.otp; }, set: function (obj, value) { obj.otp = value; } }, metadata: _metadata }, _otp_initializers, _otp_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.VerifyOtpDto = VerifyOtpDto;
var ForgotPasswordDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ForgotPasswordDto() {
                this.email = __runInitializers(this, _email_initializers, void 0);
                __runInitializers(this, _email_extraInitializers);
            }
            return ForgotPasswordDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiProperty)({ example: 'john@example.com' }), (0, class_validator_1.IsEmail)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ForgotPasswordDto = ForgotPasswordDto;
var ResetPasswordDto = function () {
    var _a;
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ResetPasswordDto() {
                this.token = __runInitializers(this, _token_initializers, void 0);
                this.password = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
            }
            return ResetPasswordDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _token_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _password_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8), (0, class_validator_1.Matches)(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
                    message: 'Password must contain uppercase, lowercase, and number',
                })];
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ResetPasswordDto = ResetPasswordDto;
var RefreshTokenDto = function () {
    var _a;
    var _refreshToken_decorators;
    var _refreshToken_initializers = [];
    var _refreshToken_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RefreshTokenDto() {
                this.refreshToken = __runInitializers(this, _refreshToken_initializers, void 0);
                __runInitializers(this, _refreshToken_extraInitializers);
            }
            return RefreshTokenDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _refreshToken_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; }, set: function (obj, value) { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RefreshTokenDto = RefreshTokenDto;
