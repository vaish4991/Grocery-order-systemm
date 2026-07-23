"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.CouponsService = exports.CreateCouponDto = void 0;
var common_1 = require("@nestjs/common");
var coupon_entity_1 = require("./entities/coupon.entity");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var CreateCouponDto = function () {
    var _a;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _discountType_decorators;
    var _discountType_initializers = [];
    var _discountType_extraInitializers = [];
    var _discountValue_decorators;
    var _discountValue_initializers = [];
    var _discountValue_extraInitializers = [];
    var _minOrderAmount_decorators;
    var _minOrderAmount_initializers = [];
    var _minOrderAmount_extraInitializers = [];
    var _maxDiscountAmount_decorators;
    var _maxDiscountAmount_initializers = [];
    var _maxDiscountAmount_extraInitializers = [];
    var _usageLimit_decorators;
    var _usageLimit_initializers = [];
    var _usageLimit_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateCouponDto() {
                this.code = __runInitializers(this, _code_initializers, void 0);
                this.discountType = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _discountType_initializers, void 0));
                this.discountValue = (__runInitializers(this, _discountType_extraInitializers), __runInitializers(this, _discountValue_initializers, void 0));
                this.minOrderAmount = (__runInitializers(this, _discountValue_extraInitializers), __runInitializers(this, _minOrderAmount_initializers, void 0));
                this.maxDiscountAmount = (__runInitializers(this, _minOrderAmount_extraInitializers), __runInitializers(this, _maxDiscountAmount_initializers, void 0));
                this.usageLimit = (__runInitializers(this, _maxDiscountAmount_extraInitializers), __runInitializers(this, _usageLimit_initializers, void 0));
                this.startDate = (__runInitializers(this, _usageLimit_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.isActive = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                __runInitializers(this, _isActive_extraInitializers);
            }
            return CreateCouponDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _code_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _discountType_decorators = [(0, swagger_1.ApiProperty)({ enum: coupon_entity_1.DiscountType }), (0, class_validator_1.IsEnum)(coupon_entity_1.DiscountType)];
            _discountValue_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _minOrderAmount_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _maxDiscountAmount_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _usageLimit_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _startDate_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsDateString)()];
            _endDate_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsDateString)()];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            __esDecorate(null, null, _discountType_decorators, { kind: "field", name: "discountType", static: false, private: false, access: { has: function (obj) { return "discountType" in obj; }, get: function (obj) { return obj.discountType; }, set: function (obj, value) { obj.discountType = value; } }, metadata: _metadata }, _discountType_initializers, _discountType_extraInitializers);
            __esDecorate(null, null, _discountValue_decorators, { kind: "field", name: "discountValue", static: false, private: false, access: { has: function (obj) { return "discountValue" in obj; }, get: function (obj) { return obj.discountValue; }, set: function (obj, value) { obj.discountValue = value; } }, metadata: _metadata }, _discountValue_initializers, _discountValue_extraInitializers);
            __esDecorate(null, null, _minOrderAmount_decorators, { kind: "field", name: "minOrderAmount", static: false, private: false, access: { has: function (obj) { return "minOrderAmount" in obj; }, get: function (obj) { return obj.minOrderAmount; }, set: function (obj, value) { obj.minOrderAmount = value; } }, metadata: _metadata }, _minOrderAmount_initializers, _minOrderAmount_extraInitializers);
            __esDecorate(null, null, _maxDiscountAmount_decorators, { kind: "field", name: "maxDiscountAmount", static: false, private: false, access: { has: function (obj) { return "maxDiscountAmount" in obj; }, get: function (obj) { return obj.maxDiscountAmount; }, set: function (obj, value) { obj.maxDiscountAmount = value; } }, metadata: _metadata }, _maxDiscountAmount_initializers, _maxDiscountAmount_extraInitializers);
            __esDecorate(null, null, _usageLimit_decorators, { kind: "field", name: "usageLimit", static: false, private: false, access: { has: function (obj) { return "usageLimit" in obj; }, get: function (obj) { return obj.usageLimit; }, set: function (obj, value) { obj.usageLimit = value; } }, metadata: _metadata }, _usageLimit_initializers, _usageLimit_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateCouponDto = CreateCouponDto;
var CouponsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CouponsService = _classThis = /** @class */ (function () {
        function CouponsService_1(couponRepo) {
            this.couponRepo = couponRepo;
        }
        CouponsService_1.prototype.applyCoupon = function (code, orderAmount) {
            return __awaiter(this, void 0, void 0, function () {
                var coupon, discountAmount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.couponRepo.findOne({
                                where: { code: code.toUpperCase(), isActive: true },
                            })];
                        case 1:
                            coupon = _a.sent();
                            if (!coupon)
                                throw new common_1.NotFoundException('Invalid coupon code');
                            if (new Date() < coupon.startDate || new Date() > coupon.endDate) {
                                throw new common_1.BadRequestException('Coupon is not valid at this time');
                            }
                            if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
                                throw new common_1.BadRequestException('Coupon usage limit exceeded');
                            }
                            if (coupon.minOrderAmount && orderAmount < Number(coupon.minOrderAmount)) {
                                throw new common_1.BadRequestException("Minimum order amount for this coupon is \u20B9".concat(coupon.minOrderAmount));
                            }
                            discountAmount = 0;
                            if (coupon.discountType === coupon_entity_1.DiscountType.PERCENTAGE) {
                                discountAmount = (orderAmount * Number(coupon.discountValue)) / 100;
                                if (coupon.maxDiscountAmount) {
                                    discountAmount = Math.min(discountAmount, Number(coupon.maxDiscountAmount));
                                }
                            }
                            else {
                                discountAmount = Number(coupon.discountValue);
                            }
                            return [2 /*return*/, {
                                    valid: true,
                                    couponCode: coupon.code,
                                    discountType: coupon.discountType,
                                    discountValue: coupon.discountValue,
                                    discountAmount: Number(discountAmount.toFixed(2)),
                                    finalAmount: Number((orderAmount - discountAmount).toFixed(2)),
                                }];
                    }
                });
            });
        };
        CouponsService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.couponRepo.find({ order: { createdAt: 'DESC' } })];
                });
            });
        };
        CouponsService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var coupon;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.couponRepo.findOne({ where: { id: id } })];
                        case 1:
                            coupon = _a.sent();
                            if (!coupon)
                                throw new common_1.NotFoundException('Coupon not found');
                            return [2 /*return*/, coupon];
                    }
                });
            });
        };
        CouponsService_1.prototype.create = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.couponRepo.findOne({
                                where: { code: dto.code.toUpperCase() },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (existing)
                                throw new common_1.BadRequestException('Coupon code already exists');
                            return [2 /*return*/, this.couponRepo.save(this.couponRepo.create(__assign(__assign({}, dto), { code: dto.code.toUpperCase(), startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) })))];
                    }
                });
            });
        };
        CouponsService_1.prototype.update = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.couponRepo.update(id, dto)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.findOne(id)];
                    }
                });
            });
        };
        CouponsService_1.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.couponRepo.delete(id)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Coupon deleted' }];
                    }
                });
            });
        };
        return CouponsService_1;
    }());
    __setFunctionName(_classThis, "CouponsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CouponsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CouponsService = _classThis;
}();
exports.CouponsService = CouponsService;
