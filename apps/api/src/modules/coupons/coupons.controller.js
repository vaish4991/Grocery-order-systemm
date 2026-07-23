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
exports.CouponsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_2 = require("@nestjs/swagger");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var ApplyCouponDto = function () {
    var _a;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _orderAmount_decorators;
    var _orderAmount_initializers = [];
    var _orderAmount_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ApplyCouponDto() {
                this.code = __runInitializers(this, _code_initializers, void 0);
                this.orderAmount = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _orderAmount_initializers, void 0));
                __runInitializers(this, _orderAmount_extraInitializers);
            }
            return ApplyCouponDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _code_decorators = [(0, swagger_2.ApiProperty)(), (0, class_validator_1.IsString)()];
            _orderAmount_decorators = [(0, swagger_2.ApiProperty)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            __esDecorate(null, null, _orderAmount_decorators, { kind: "field", name: "orderAmount", static: false, private: false, access: { has: function (obj) { return "orderAmount" in obj; }, get: function (obj) { return obj.orderAmount; }, set: function (obj, value) { obj.orderAmount = value; } }, metadata: _metadata }, _orderAmount_initializers, _orderAmount_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var CouponsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Coupons'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _applyCoupon_decorators;
    var _findAll_decorators;
    var _create_decorators;
    var _update_decorators;
    var _delete_decorators;
    var CouponsController = _classThis = /** @class */ (function () {
        function CouponsController_1(couponsService) {
            this.couponsService = (__runInitializers(this, _instanceExtraInitializers), couponsService);
        }
        CouponsController_1.prototype.applyCoupon = function (dto) {
            return this.couponsService.applyCoupon(dto.code, dto.orderAmount);
        };
        CouponsController_1.prototype.findAll = function () {
            return this.couponsService.findAll();
        };
        CouponsController_1.prototype.create = function (dto) {
            return this.couponsService.create(dto);
        };
        CouponsController_1.prototype.update = function (id, dto) {
            return this.couponsService.update(id, dto);
        };
        CouponsController_1.prototype.delete = function (id) {
            return this.couponsService.delete(id);
        };
        return CouponsController_1;
    }());
    __setFunctionName(_classThis, "CouponsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _applyCoupon_decorators = [(0, common_1.Post)('coupons/apply'), (0, swagger_1.ApiOperation)({ summary: 'Validate and apply a coupon code' })];
        _findAll_decorators = [(0, common_1.Get)('admin/coupons'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] List all coupons' })];
        _create_decorators = [(0, common_1.Post)('admin/coupons'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Create coupon' })];
        _update_decorators = [(0, common_1.Patch)('admin/coupons/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Update coupon' })];
        _delete_decorators = [(0, common_1.Delete)('admin/coupons/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Delete coupon' })];
        __esDecorate(_classThis, null, _applyCoupon_decorators, { kind: "method", name: "applyCoupon", static: false, private: false, access: { has: function (obj) { return "applyCoupon" in obj; }, get: function (obj) { return obj.applyCoupon; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: function (obj) { return "delete" in obj; }, get: function (obj) { return obj.delete; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CouponsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CouponsController = _classThis;
}();
exports.CouponsController = CouponsController;
