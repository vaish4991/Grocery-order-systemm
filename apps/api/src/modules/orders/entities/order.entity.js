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
exports.Order = exports.PaymentStatus = exports.OrderStatus = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var order_item_entity_1 = require("./order-item.entity");
var payment_entity_1 = require("./payment.entity");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["RETURNED"] = "RETURNED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var Order = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('orders')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _orderNumber_decorators;
    var _orderNumber_initializers = [];
    var _orderNumber_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _totalAmount_decorators;
    var _totalAmount_initializers = [];
    var _totalAmount_extraInitializers = [];
    var _discountAmount_decorators;
    var _discountAmount_initializers = [];
    var _discountAmount_extraInitializers = [];
    var _deliveryCharge_decorators;
    var _deliveryCharge_initializers = [];
    var _deliveryCharge_extraInitializers = [];
    var _finalAmount_decorators;
    var _finalAmount_initializers = [];
    var _finalAmount_extraInitializers = [];
    var _paymentStatus_decorators;
    var _paymentStatus_initializers = [];
    var _paymentStatus_extraInitializers = [];
    var _couponCode_decorators;
    var _couponCode_initializers = [];
    var _couponCode_extraInitializers = [];
    var _deliveryAddress_decorators;
    var _deliveryAddress_initializers = [];
    var _deliveryAddress_extraInitializers = [];
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _payment_decorators;
    var _payment_initializers = [];
    var _payment_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var Order = _classThis = /** @class */ (function () {
        function Order_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.orderNumber = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _orderNumber_initializers, void 0));
            this.status = (__runInitializers(this, _orderNumber_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.totalAmount = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _totalAmount_initializers, void 0));
            this.discountAmount = (__runInitializers(this, _totalAmount_extraInitializers), __runInitializers(this, _discountAmount_initializers, void 0));
            this.deliveryCharge = (__runInitializers(this, _discountAmount_extraInitializers), __runInitializers(this, _deliveryCharge_initializers, void 0));
            this.finalAmount = (__runInitializers(this, _deliveryCharge_extraInitializers), __runInitializers(this, _finalAmount_initializers, void 0));
            this.paymentStatus = (__runInitializers(this, _finalAmount_extraInitializers), __runInitializers(this, _paymentStatus_initializers, void 0));
            this.couponCode = (__runInitializers(this, _paymentStatus_extraInitializers), __runInitializers(this, _couponCode_initializers, void 0));
            this.deliveryAddress = (__runInitializers(this, _couponCode_extraInitializers), __runInitializers(this, _deliveryAddress_initializers, void 0));
            this.items = (__runInitializers(this, _deliveryAddress_extraInitializers), __runInitializers(this, _items_initializers, void 0));
            this.payment = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _payment_initializers, void 0));
            this.notes = (__runInitializers(this, _payment_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.createdAt = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return Order_1;
    }());
    __setFunctionName(_classThis, "Order");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { onDelete: 'RESTRICT' }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _orderNumber_decorators = [(0, typeorm_1.Column)({ unique: true, length: 30 })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })];
        _totalAmount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _discountAmount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 })];
        _deliveryCharge_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 })];
        _finalAmount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _paymentStatus_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })];
        _couponCode_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _deliveryAddress_decorators = [(0, typeorm_1.Column)({ type: 'jsonb' })];
        _items_decorators = [(0, typeorm_1.OneToMany)(function () { return order_item_entity_1.OrderItem; }, function (item) { return item.order; }, {
                cascade: true,
                eager: true,
            })];
        _payment_decorators = [(0, typeorm_1.OneToOne)(function () { return payment_entity_1.Payment; }, function (payment) { return payment.order; }, {
                cascade: true,
                eager: true,
            })];
        _notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _orderNumber_decorators, { kind: "field", name: "orderNumber", static: false, private: false, access: { has: function (obj) { return "orderNumber" in obj; }, get: function (obj) { return obj.orderNumber; }, set: function (obj, value) { obj.orderNumber = value; } }, metadata: _metadata }, _orderNumber_initializers, _orderNumber_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _totalAmount_decorators, { kind: "field", name: "totalAmount", static: false, private: false, access: { has: function (obj) { return "totalAmount" in obj; }, get: function (obj) { return obj.totalAmount; }, set: function (obj, value) { obj.totalAmount = value; } }, metadata: _metadata }, _totalAmount_initializers, _totalAmount_extraInitializers);
        __esDecorate(null, null, _discountAmount_decorators, { kind: "field", name: "discountAmount", static: false, private: false, access: { has: function (obj) { return "discountAmount" in obj; }, get: function (obj) { return obj.discountAmount; }, set: function (obj, value) { obj.discountAmount = value; } }, metadata: _metadata }, _discountAmount_initializers, _discountAmount_extraInitializers);
        __esDecorate(null, null, _deliveryCharge_decorators, { kind: "field", name: "deliveryCharge", static: false, private: false, access: { has: function (obj) { return "deliveryCharge" in obj; }, get: function (obj) { return obj.deliveryCharge; }, set: function (obj, value) { obj.deliveryCharge = value; } }, metadata: _metadata }, _deliveryCharge_initializers, _deliveryCharge_extraInitializers);
        __esDecorate(null, null, _finalAmount_decorators, { kind: "field", name: "finalAmount", static: false, private: false, access: { has: function (obj) { return "finalAmount" in obj; }, get: function (obj) { return obj.finalAmount; }, set: function (obj, value) { obj.finalAmount = value; } }, metadata: _metadata }, _finalAmount_initializers, _finalAmount_extraInitializers);
        __esDecorate(null, null, _paymentStatus_decorators, { kind: "field", name: "paymentStatus", static: false, private: false, access: { has: function (obj) { return "paymentStatus" in obj; }, get: function (obj) { return obj.paymentStatus; }, set: function (obj, value) { obj.paymentStatus = value; } }, metadata: _metadata }, _paymentStatus_initializers, _paymentStatus_extraInitializers);
        __esDecorate(null, null, _couponCode_decorators, { kind: "field", name: "couponCode", static: false, private: false, access: { has: function (obj) { return "couponCode" in obj; }, get: function (obj) { return obj.couponCode; }, set: function (obj, value) { obj.couponCode = value; } }, metadata: _metadata }, _couponCode_initializers, _couponCode_extraInitializers);
        __esDecorate(null, null, _deliveryAddress_decorators, { kind: "field", name: "deliveryAddress", static: false, private: false, access: { has: function (obj) { return "deliveryAddress" in obj; }, get: function (obj) { return obj.deliveryAddress; }, set: function (obj, value) { obj.deliveryAddress = value; } }, metadata: _metadata }, _deliveryAddress_initializers, _deliveryAddress_extraInitializers);
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: function (obj) { return "payment" in obj; }, get: function (obj) { return obj.payment; }, set: function (obj, value) { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Order = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Order = _classThis;
}();
exports.Order = Order;
