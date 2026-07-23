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
exports.PaymentsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_2 = require("@nestjs/swagger");
var public_decorator_1 = require("../auth/decorators/public.decorator");
var VerifyPaymentDto = function () {
    var _a;
    var _razorpayOrderId_decorators;
    var _razorpayOrderId_initializers = [];
    var _razorpayOrderId_extraInitializers = [];
    var _razorpayPaymentId_decorators;
    var _razorpayPaymentId_initializers = [];
    var _razorpayPaymentId_extraInitializers = [];
    var _razorpaySignature_decorators;
    var _razorpaySignature_initializers = [];
    var _razorpaySignature_extraInitializers = [];
    var _orderId_decorators;
    var _orderId_initializers = [];
    var _orderId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function VerifyPaymentDto() {
                this.razorpayOrderId = __runInitializers(this, _razorpayOrderId_initializers, void 0);
                this.razorpayPaymentId = (__runInitializers(this, _razorpayOrderId_extraInitializers), __runInitializers(this, _razorpayPaymentId_initializers, void 0));
                this.razorpaySignature = (__runInitializers(this, _razorpayPaymentId_extraInitializers), __runInitializers(this, _razorpaySignature_initializers, void 0));
                this.orderId = (__runInitializers(this, _razorpaySignature_extraInitializers), __runInitializers(this, _orderId_initializers, void 0));
                __runInitializers(this, _orderId_extraInitializers);
            }
            return VerifyPaymentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _razorpayOrderId_decorators = [(0, swagger_2.ApiProperty)(), (0, class_validator_1.IsString)()];
            _razorpayPaymentId_decorators = [(0, swagger_2.ApiProperty)(), (0, class_validator_1.IsString)()];
            _razorpaySignature_decorators = [(0, swagger_2.ApiProperty)(), (0, class_validator_1.IsString)()];
            _orderId_decorators = [(0, swagger_2.ApiProperty)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _razorpayOrderId_decorators, { kind: "field", name: "razorpayOrderId", static: false, private: false, access: { has: function (obj) { return "razorpayOrderId" in obj; }, get: function (obj) { return obj.razorpayOrderId; }, set: function (obj, value) { obj.razorpayOrderId = value; } }, metadata: _metadata }, _razorpayOrderId_initializers, _razorpayOrderId_extraInitializers);
            __esDecorate(null, null, _razorpayPaymentId_decorators, { kind: "field", name: "razorpayPaymentId", static: false, private: false, access: { has: function (obj) { return "razorpayPaymentId" in obj; }, get: function (obj) { return obj.razorpayPaymentId; }, set: function (obj, value) { obj.razorpayPaymentId = value; } }, metadata: _metadata }, _razorpayPaymentId_initializers, _razorpayPaymentId_extraInitializers);
            __esDecorate(null, null, _razorpaySignature_decorators, { kind: "field", name: "razorpaySignature", static: false, private: false, access: { has: function (obj) { return "razorpaySignature" in obj; }, get: function (obj) { return obj.razorpaySignature; }, set: function (obj, value) { obj.razorpaySignature = value; } }, metadata: _metadata }, _razorpaySignature_initializers, _razorpaySignature_extraInitializers);
            __esDecorate(null, null, _orderId_decorators, { kind: "field", name: "orderId", static: false, private: false, access: { has: function (obj) { return "orderId" in obj; }, get: function (obj) { return obj.orderId; }, set: function (obj, value) { obj.orderId = value; } }, metadata: _metadata }, _orderId_initializers, _orderId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var PaymentsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Payments'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('payments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _initiatePayment_decorators;
    var _verifyPayment_decorators;
    var _handleWebhook_decorators;
    var PaymentsController = _classThis = /** @class */ (function () {
        function PaymentsController_1(paymentsService) {
            this.paymentsService = (__runInitializers(this, _instanceExtraInitializers), paymentsService);
        }
        PaymentsController_1.prototype.initiatePayment = function (orderId, userId) {
            return this.paymentsService.initiatePayment(orderId, userId);
        };
        PaymentsController_1.prototype.verifyPayment = function (dto) {
            return this.paymentsService.verifyPayment(dto);
        };
        PaymentsController_1.prototype.handleWebhook = function (payload, signature) {
            return this.paymentsService.handleWebhook(payload, signature);
        };
        return PaymentsController_1;
    }());
    __setFunctionName(_classThis, "PaymentsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _initiatePayment_decorators = [(0, common_1.Post)('initiate/:orderId'), (0, swagger_1.ApiOperation)({ summary: 'Initiate Razorpay payment for an order' })];
        _verifyPayment_decorators = [(0, common_1.Post)('verify'), (0, swagger_1.ApiOperation)({ summary: 'Verify Razorpay payment after successful payment' })];
        _handleWebhook_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('webhook'), (0, swagger_1.ApiOperation)({ summary: 'Razorpay webhook handler' })];
        __esDecorate(_classThis, null, _initiatePayment_decorators, { kind: "method", name: "initiatePayment", static: false, private: false, access: { has: function (obj) { return "initiatePayment" in obj; }, get: function (obj) { return obj.initiatePayment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyPayment_decorators, { kind: "method", name: "verifyPayment", static: false, private: false, access: { has: function (obj) { return "verifyPayment" in obj; }, get: function (obj) { return obj.verifyPayment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleWebhook_decorators, { kind: "method", name: "handleWebhook", static: false, private: false, access: { has: function (obj) { return "handleWebhook" in obj; }, get: function (obj) { return obj.handleWebhook; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentsController = _classThis;
}();
exports.PaymentsController = PaymentsController;
