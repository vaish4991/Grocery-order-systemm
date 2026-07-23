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
exports.Payment = exports.PaymentMethod = void 0;
var typeorm_1 = require("typeorm");
var order_entity_1 = require("./order.entity");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["RAZORPAY"] = "RAZORPAY";
    PaymentMethod["COD"] = "COD";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var Payment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('payments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _orderId_decorators;
    var _orderId_initializers = [];
    var _orderId_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
    var _transactionId_decorators;
    var _transactionId_initializers = [];
    var _transactionId_extraInitializers = [];
    var _razorpayOrderId_decorators;
    var _razorpayOrderId_initializers = [];
    var _razorpayOrderId_extraInitializers = [];
    var _razorpayPaymentId_decorators;
    var _razorpayPaymentId_initializers = [];
    var _razorpayPaymentId_extraInitializers = [];
    var _razorpaySignature_decorators;
    var _razorpaySignature_initializers = [];
    var _razorpaySignature_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var Payment = _classThis = /** @class */ (function () {
        function Payment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.orderId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _orderId_initializers, void 0));
            this.order = (__runInitializers(this, _orderId_extraInitializers), __runInitializers(this, _order_initializers, void 0));
            this.transactionId = (__runInitializers(this, _order_extraInitializers), __runInitializers(this, _transactionId_initializers, void 0));
            this.razorpayOrderId = (__runInitializers(this, _transactionId_extraInitializers), __runInitializers(this, _razorpayOrderId_initializers, void 0));
            this.razorpayPaymentId = (__runInitializers(this, _razorpayOrderId_extraInitializers), __runInitializers(this, _razorpayPaymentId_initializers, void 0));
            this.razorpaySignature = (__runInitializers(this, _razorpayPaymentId_extraInitializers), __runInitializers(this, _razorpaySignature_initializers, void 0));
            this.amount = (__runInitializers(this, _razorpaySignature_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.status = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.method = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _method_initializers, void 0));
            this.createdAt = (__runInitializers(this, _method_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return Payment_1;
    }());
    __setFunctionName(_classThis, "Payment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _orderId_decorators = [(0, typeorm_1.Column)()];
        _order_decorators = [(0, typeorm_1.OneToOne)(function () { return order_entity_1.Order; }, function (order) { return order.payment; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'orderId' })];
        _transactionId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _razorpayOrderId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _razorpayPaymentId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _razorpaySignature_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
                default: 'PENDING',
            })];
        _method_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: PaymentMethod })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _orderId_decorators, { kind: "field", name: "orderId", static: false, private: false, access: { has: function (obj) { return "orderId" in obj; }, get: function (obj) { return obj.orderId; }, set: function (obj, value) { obj.orderId = value; } }, metadata: _metadata }, _orderId_initializers, _orderId_extraInitializers);
        __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
        __esDecorate(null, null, _transactionId_decorators, { kind: "field", name: "transactionId", static: false, private: false, access: { has: function (obj) { return "transactionId" in obj; }, get: function (obj) { return obj.transactionId; }, set: function (obj, value) { obj.transactionId = value; } }, metadata: _metadata }, _transactionId_initializers, _transactionId_extraInitializers);
        __esDecorate(null, null, _razorpayOrderId_decorators, { kind: "field", name: "razorpayOrderId", static: false, private: false, access: { has: function (obj) { return "razorpayOrderId" in obj; }, get: function (obj) { return obj.razorpayOrderId; }, set: function (obj, value) { obj.razorpayOrderId = value; } }, metadata: _metadata }, _razorpayOrderId_initializers, _razorpayOrderId_extraInitializers);
        __esDecorate(null, null, _razorpayPaymentId_decorators, { kind: "field", name: "razorpayPaymentId", static: false, private: false, access: { has: function (obj) { return "razorpayPaymentId" in obj; }, get: function (obj) { return obj.razorpayPaymentId; }, set: function (obj, value) { obj.razorpayPaymentId = value; } }, metadata: _metadata }, _razorpayPaymentId_initializers, _razorpayPaymentId_extraInitializers);
        __esDecorate(null, null, _razorpaySignature_decorators, { kind: "field", name: "razorpaySignature", static: false, private: false, access: { has: function (obj) { return "razorpaySignature" in obj; }, get: function (obj) { return obj.razorpaySignature; }, set: function (obj, value) { obj.razorpaySignature = value; } }, metadata: _metadata }, _razorpaySignature_initializers, _razorpaySignature_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Payment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Payment = _classThis;
}();
exports.Payment = Payment;
