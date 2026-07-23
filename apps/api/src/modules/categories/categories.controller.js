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
exports.CategoriesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var public_decorator_1 = require("../auth/decorators/public.decorator");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var CategoriesController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Categories'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findAll_decorators;
    var _findBySlug_decorators;
    var _findAllAdmin_decorators;
    var _create_decorators;
    var _update_decorators;
    var _delete_decorators;
    var CategoriesController = _classThis = /** @class */ (function () {
        function CategoriesController_1(categoriesService) {
            this.categoriesService = (__runInitializers(this, _instanceExtraInitializers), categoriesService);
        }
        CategoriesController_1.prototype.findAll = function () {
            return this.categoriesService.findAll();
        };
        CategoriesController_1.prototype.findBySlug = function (slug) {
            return this.categoriesService.findBySlug(slug);
        };
        CategoriesController_1.prototype.findAllAdmin = function () {
            return this.categoriesService.findAllAdmin();
        };
        CategoriesController_1.prototype.create = function (dto) {
            return this.categoriesService.create(dto);
        };
        CategoriesController_1.prototype.update = function (id, dto) {
            return this.categoriesService.update(id, dto);
        };
        CategoriesController_1.prototype.delete = function (id) {
            return this.categoriesService.delete(id);
        };
        return CategoriesController_1;
    }());
    __setFunctionName(_classThis, "CategoriesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _findAll_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Get)('categories'), (0, swagger_1.ApiOperation)({ summary: 'List all active categories' })];
        _findBySlug_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Get)('categories/:slug'), (0, swagger_1.ApiOperation)({ summary: 'Get category by slug' })];
        _findAllAdmin_decorators = [(0, common_1.Get)('admin/categories'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: '[Admin] List all categories including inactive' })];
        _create_decorators = [(0, common_1.Post)('admin/categories'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: '[Admin] Create category' })];
        _update_decorators = [(0, common_1.Patch)('admin/categories/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: '[Admin] Update category' })];
        _delete_decorators = [(0, common_1.Delete)('admin/categories/:id'), (0, roles_decorator_1.Roles)('ADMIN'), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: '[Admin] Delete category' })];
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findBySlug_decorators, { kind: "method", name: "findBySlug", static: false, private: false, access: { has: function (obj) { return "findBySlug" in obj; }, get: function (obj) { return obj.findBySlug; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllAdmin_decorators, { kind: "method", name: "findAllAdmin", static: false, private: false, access: { has: function (obj) { return "findAllAdmin" in obj; }, get: function (obj) { return obj.findAllAdmin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: function (obj) { return "delete" in obj; }, get: function (obj) { return obj.delete; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CategoriesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CategoriesController = _classThis;
}();
exports.CategoriesController = CategoriesController;
