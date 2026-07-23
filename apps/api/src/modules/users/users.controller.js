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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var UsersController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Users'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var _getAddresses_decorators;
    var _createAddress_decorators;
    var _updateAddress_decorators;
    var _deleteAddress_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _updateStatus_decorators;
    var UsersController = _classThis = /** @class */ (function () {
        function UsersController_1(usersService) {
            this.usersService = (__runInitializers(this, _instanceExtraInitializers), usersService);
        }
        // ── Customer: own profile ──────────────────────────────────────────────────
        UsersController_1.prototype.getProfile = function (userId) {
            return this.usersService.getProfile(userId);
        };
        UsersController_1.prototype.updateProfile = function (userId, dto) {
            return this.usersService.updateProfile(userId, dto);
        };
        // ── Customer: addresses ────────────────────────────────────────────────────
        UsersController_1.prototype.getAddresses = function (userId) {
            return this.usersService.getAddresses(userId);
        };
        UsersController_1.prototype.createAddress = function (userId, dto) {
            return this.usersService.createAddress(userId, dto);
        };
        UsersController_1.prototype.updateAddress = function (userId, addressId, dto) {
            return this.usersService.updateAddress(userId, addressId, dto);
        };
        UsersController_1.prototype.deleteAddress = function (userId, addressId) {
            return this.usersService.deleteAddress(userId, addressId);
        };
        // ── Admin: manage users ────────────────────────────────────────────────────
        UsersController_1.prototype.findAll = function (page, limit) {
            return this.usersService.findAll(page, limit);
        };
        UsersController_1.prototype.findOne = function (id) {
            return this.usersService.findOne(id);
        };
        UsersController_1.prototype.updateStatus = function (id, status) {
            return this.usersService.updateStatus(id, status);
        };
        return UsersController_1;
    }());
    __setFunctionName(_classThis, "UsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getProfile_decorators = [(0, common_1.Get)('users/me'), (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' })];
        _updateProfile_decorators = [(0, common_1.Patch)('users/me'), (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' })];
        _getAddresses_decorators = [(0, common_1.Get)('users/me/addresses'), (0, swagger_1.ApiOperation)({ summary: 'Get all saved addresses' })];
        _createAddress_decorators = [(0, common_1.Post)('users/me/addresses'), (0, swagger_1.ApiOperation)({ summary: 'Add a new delivery address' })];
        _updateAddress_decorators = [(0, common_1.Patch)('users/me/addresses/:id'), (0, swagger_1.ApiOperation)({ summary: 'Update a delivery address' })];
        _deleteAddress_decorators = [(0, common_1.Delete)('users/me/addresses/:id'), (0, swagger_1.ApiOperation)({ summary: 'Delete a delivery address' })];
        _findAll_decorators = [(0, common_1.Get)('admin/users'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] List all users' })];
        _findOne_decorators = [(0, common_1.Get)('admin/users/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Get user by ID' })];
        _updateStatus_decorators = [(0, common_1.Patch)('admin/users/:id/status'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Update user status (ACTIVE/BANNED)' })];
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAddresses_decorators, { kind: "method", name: "getAddresses", static: false, private: false, access: { has: function (obj) { return "getAddresses" in obj; }, get: function (obj) { return obj.getAddresses; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createAddress_decorators, { kind: "method", name: "createAddress", static: false, private: false, access: { has: function (obj) { return "createAddress" in obj; }, get: function (obj) { return obj.createAddress; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateAddress_decorators, { kind: "method", name: "updateAddress", static: false, private: false, access: { has: function (obj) { return "updateAddress" in obj; }, get: function (obj) { return obj.updateAddress; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteAddress_decorators, { kind: "method", name: "deleteAddress", static: false, private: false, access: { has: function (obj) { return "deleteAddress" in obj; }, get: function (obj) { return obj.deleteAddress; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: function (obj) { return "updateStatus" in obj; }, get: function (obj) { return obj.updateStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
}();
exports.UsersController = UsersController;
