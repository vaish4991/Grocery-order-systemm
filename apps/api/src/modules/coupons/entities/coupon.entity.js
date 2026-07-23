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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = exports.DiscountType = void 0;
var typeorm_1 = require("typeorm");
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "PERCENTAGE";
    DiscountType["FIXED"] = "FIXED";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var Coupon = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('coupons')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
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
    var _usageCount_decorators;
    var _usageCount_initializers = [];
    var _usageCount_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var Coupon = _classThis = /** @class */ (function () {
        function Coupon_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.code = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _code_initializers, void 0));
            this.discountType = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _discountType_initializers, void 0));
            this.discountValue = (__runInitializers(this, _discountType_extraInitializers), __runInitializers(this, _discountValue_initializers, void 0));
            this.minOrderAmount = (__runInitializers(this, _discountValue_extraInitializers), __runInitializers(this, _minOrderAmount_initializers, void 0));
            this.maxDiscountAmount = (__runInitializers(this, _minOrderAmount_extraInitializers), __runInitializers(this, _maxDiscountAmount_initializers, void 0));
            this.usageLimit = (__runInitializers(this, _maxDiscountAmount_extraInitializers), __runInitializers(this, _usageLimit_initializers, void 0));
            this.usageCount = (__runInitializers(this, _usageLimit_extraInitializers), __runInitializers(this, _usageCount_initializers, void 0));
            this.isActive = (__runInitializers(this, _usageCount_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.startDate = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
            this.createdAt = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return Coupon_1;
    }());
    __setFunctionName(_classThis, "Coupon");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _code_decorators = [(0, typeorm_1.Column)({ unique: true, length: 30 })];
        _discountType_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: DiscountType })];
        _discountValue_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _minOrderAmount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _maxDiscountAmount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _usageLimit_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _usageCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _startDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamptz' })];
        _endDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamptz' })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _discountType_decorators, { kind: "field", name: "discountType", static: false, private: false, access: { has: function (obj) { return "discountType" in obj; }, get: function (obj) { return obj.discountType; }, set: function (obj, value) { obj.discountType = value; } }, metadata: _metadata }, _discountType_initializers, _discountType_extraInitializers);
        __esDecorate(null, null, _discountValue_decorators, { kind: "field", name: "discountValue", static: false, private: false, access: { has: function (obj) { return "discountValue" in obj; }, get: function (obj) { return obj.discountValue; }, set: function (obj, value) { obj.discountValue = value; } }, metadata: _metadata }, _discountValue_initializers, _discountValue_extraInitializers);
        __esDecorate(null, null, _minOrderAmount_decorators, { kind: "field", name: "minOrderAmount", static: false, private: false, access: { has: function (obj) { return "minOrderAmount" in obj; }, get: function (obj) { return obj.minOrderAmount; }, set: function (obj, value) { obj.minOrderAmount = value; } }, metadata: _metadata }, _minOrderAmount_initializers, _minOrderAmount_extraInitializers);
        __esDecorate(null, null, _maxDiscountAmount_decorators, { kind: "field", name: "maxDiscountAmount", static: false, private: false, access: { has: function (obj) { return "maxDiscountAmount" in obj; }, get: function (obj) { return obj.maxDiscountAmount; }, set: function (obj, value) { obj.maxDiscountAmount = value; } }, metadata: _metadata }, _maxDiscountAmount_initializers, _maxDiscountAmount_extraInitializers);
        __esDecorate(null, null, _usageLimit_decorators, { kind: "field", name: "usageLimit", static: false, private: false, access: { has: function (obj) { return "usageLimit" in obj; }, get: function (obj) { return obj.usageLimit; }, set: function (obj, value) { obj.usageLimit = value; } }, metadata: _metadata }, _usageLimit_initializers, _usageLimit_extraInitializers);
        __esDecorate(null, null, _usageCount_decorators, { kind: "field", name: "usageCount", static: false, private: false, access: { has: function (obj) { return "usageCount" in obj; }, get: function (obj) { return obj.usageCount; }, set: function (obj, value) { obj.usageCount = value; } }, metadata: _metadata }, _usageCount_initializers, _usageCount_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Coupon = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Coupon = _classThis;
}();
exports.Coupon = Coupon;
