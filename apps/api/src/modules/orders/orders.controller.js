"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var OrdersController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Orders'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _cancel_decorators;
    var _findAllAdmin_decorators;
    var _findOneAdmin_decorators;
    var _updateStatus_decorators;
    var _dashboardStats_decorators;
    var OrdersController = _classThis = /** @class */ (function () {
        function OrdersController_1(ordersService) {
            this.ordersService = (__runInitializers(this, _instanceExtraInitializers), ordersService);
        }
        // Customer endpoints
        OrdersController_1.prototype.create = function (userId, dto) {
            return this.ordersService.createOrder(userId, dto);
        };
        OrdersController_1.prototype.findAll = function (userId, page, limit) {
            return this.ordersService.findAll(userId, page, limit);
        };
        OrdersController_1.prototype.findOne = function (userId, id) {
            return this.ordersService.findById(id, userId);
        };
        OrdersController_1.prototype.cancel = function (userId, id) {
            return this.ordersService.cancelOrder(id, userId);
        };
        // Admin endpoints
        OrdersController_1.prototype.findAllAdmin = function (page, limit, status) {
            return this.ordersService.findAllAdmin(page, limit, status);
        };
        OrdersController_1.prototype.findOneAdmin = function (id) {
            return this.ordersService.findById(id);
        };
        OrdersController_1.prototype.updateStatus = function (id, dto) {
            return this.ordersService.updateStatus(id, dto);
        };
        OrdersController_1.prototype.dashboardStats = function () {
            return this.ordersService.getDashboardStats();
        };
        return OrdersController_1;
    }());
    __setFunctionName(_classThis, "OrdersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('orders'), (0, swagger_1.ApiOperation)({ summary: 'Place a new order from cart' })];
        _findAll_decorators = [(0, common_1.Get)('orders'), (0, swagger_1.ApiOperation)({ summary: 'Get order history' })];
        _findOne_decorators = [(0, common_1.Get)('orders/:id'), (0, swagger_1.ApiOperation)({ summary: 'Get order details' })];
        _cancel_decorators = [(0, common_1.Patch)('orders/:id/cancel'), (0, swagger_1.ApiOperation)({ summary: 'Cancel an order' })];
        _findAllAdmin_decorators = [(0, common_1.Get)('admin/orders'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] List all orders' })];
        _findOneAdmin_decorators = [(0, common_1.Get)('admin/orders/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Get order details' })];
        _updateStatus_decorators = [(0, common_1.Patch)('admin/orders/:id/status'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Update order status' })];
        _dashboardStats_decorators = [(0, common_1.Get)('admin/dashboard/stats'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Dashboard statistics' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancel_decorators, { kind: "method", name: "cancel", static: false, private: false, access: { has: function (obj) { return "cancel" in obj; }, get: function (obj) { return obj.cancel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllAdmin_decorators, { kind: "method", name: "findAllAdmin", static: false, private: false, access: { has: function (obj) { return "findAllAdmin" in obj; }, get: function (obj) { return obj.findAllAdmin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOneAdmin_decorators, { kind: "method", name: "findOneAdmin", static: false, private: false, access: { has: function (obj) { return "findOneAdmin" in obj; }, get: function (obj) { return obj.findOneAdmin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: function (obj) { return "updateStatus" in obj; }, get: function (obj) { return obj.updateStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _dashboardStats_decorators, { kind: "method", name: "dashboardStats", static: false, private: false, access: { has: function (obj) { return "dashboardStats" in obj; }, get: function (obj) { return obj.dashboardStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrdersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrdersController = _classThis;
}();
exports.OrdersController = OrdersController;
