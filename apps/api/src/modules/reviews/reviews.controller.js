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
exports.ReviewsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var public_decorator_1 = require("../auth/decorators/public.decorator");
var ReviewsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Reviews'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getProductReviews_decorators;
    var _getUserReviews_decorators;
    var _create_decorators;
    var _update_decorators;
    var _delete_decorators;
    var ReviewsController = _classThis = /** @class */ (function () {
        function ReviewsController_1(reviewsService) {
            this.reviewsService = (__runInitializers(this, _instanceExtraInitializers), reviewsService);
        }
        ReviewsController_1.prototype.getProductReviews = function (productId, page, limit) {
            return this.reviewsService.getProductReviews(productId, page, limit);
        };
        ReviewsController_1.prototype.getUserReviews = function (userId) {
            return this.reviewsService.getUserReviews(userId);
        };
        ReviewsController_1.prototype.create = function (userId, productId, dto) {
            return this.reviewsService.create(userId, productId, dto);
        };
        ReviewsController_1.prototype.update = function (userId, id, dto) {
            return this.reviewsService.update(userId, id, dto);
        };
        ReviewsController_1.prototype.delete = function (userId, id) {
            return this.reviewsService.delete(userId, id);
        };
        return ReviewsController_1;
    }());
    __setFunctionName(_classThis, "ReviewsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getProductReviews_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Get)('products/:productId/reviews'), (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a product' })];
        _getUserReviews_decorators = [(0, swagger_1.ApiBearerAuth)(), (0, common_1.Get)('users/me/reviews'), (0, swagger_1.ApiOperation)({ summary: 'Get my reviews' })];
        _create_decorators = [(0, swagger_1.ApiBearerAuth)(), (0, common_1.Post)('products/:productId/reviews'), (0, swagger_1.ApiOperation)({ summary: 'Add a product review' })];
        _update_decorators = [(0, swagger_1.ApiBearerAuth)(), (0, common_1.Patch)('reviews/:id'), (0, swagger_1.ApiOperation)({ summary: 'Edit my review' })];
        _delete_decorators = [(0, swagger_1.ApiBearerAuth)(), (0, common_1.Delete)('reviews/:id'), (0, swagger_1.ApiOperation)({ summary: 'Delete my review' })];
        __esDecorate(_classThis, null, _getProductReviews_decorators, { kind: "method", name: "getProductReviews", static: false, private: false, access: { has: function (obj) { return "getProductReviews" in obj; }, get: function (obj) { return obj.getProductReviews; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserReviews_decorators, { kind: "method", name: "getUserReviews", static: false, private: false, access: { has: function (obj) { return "getUserReviews" in obj; }, get: function (obj) { return obj.getUserReviews; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: function (obj) { return "delete" in obj; }, get: function (obj) { return obj.delete; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReviewsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewsController = _classThis;
}();
exports.ReviewsController = ReviewsController;
