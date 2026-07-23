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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQueryDto = exports.UpdateProductDto = exports.CreateProductDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var product_entity_1 = require("../entities/product.entity");
var CreateProductDto = function () {
    var _a;
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _discountPrice_decorators;
    var _discountPrice_initializers = [];
    var _discountPrice_extraInitializers = [];
    var _stock_decorators;
    var _stock_initializers = [];
    var _stock_extraInitializers = [];
    var _sku_decorators;
    var _sku_initializers = [];
    var _sku_extraInitializers = [];
    var _brand_decorators;
    var _brand_initializers = [];
    var _brand_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _imageUrls_decorators;
    var _imageUrls_initializers = [];
    var _imageUrls_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProductDto() {
                this.categoryId = __runInitializers(this, _categoryId_initializers, void 0);
                this.name = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.discountPrice = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _discountPrice_initializers, void 0));
                this.stock = (__runInitializers(this, _discountPrice_extraInitializers), __runInitializers(this, _stock_initializers, void 0));
                this.sku = (__runInitializers(this, _stock_extraInitializers), __runInitializers(this, _sku_initializers, void 0));
                this.brand = (__runInitializers(this, _sku_extraInitializers), __runInitializers(this, _brand_initializers, void 0));
                this.status = (__runInitializers(this, _brand_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.imageUrls = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _imageUrls_initializers, void 0));
                __runInitializers(this, _imageUrls_extraInitializers);
            }
            return CreateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _categoryId_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsUUID)()];
            _name_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _price_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _discountPrice_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _stock_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_transformer_1.Type)(function () { return Number; })];
            _sku_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)()];
            _brand_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: product_entity_1.ProductStatus }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(product_entity_1.ProductStatus)];
            _imageUrls_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [String] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)()];
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _discountPrice_decorators, { kind: "field", name: "discountPrice", static: false, private: false, access: { has: function (obj) { return "discountPrice" in obj; }, get: function (obj) { return obj.discountPrice; }, set: function (obj, value) { obj.discountPrice = value; } }, metadata: _metadata }, _discountPrice_initializers, _discountPrice_extraInitializers);
            __esDecorate(null, null, _stock_decorators, { kind: "field", name: "stock", static: false, private: false, access: { has: function (obj) { return "stock" in obj; }, get: function (obj) { return obj.stock; }, set: function (obj, value) { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
            __esDecorate(null, null, _sku_decorators, { kind: "field", name: "sku", static: false, private: false, access: { has: function (obj) { return "sku" in obj; }, get: function (obj) { return obj.sku; }, set: function (obj, value) { obj.sku = value; } }, metadata: _metadata }, _sku_initializers, _sku_extraInitializers);
            __esDecorate(null, null, _brand_decorators, { kind: "field", name: "brand", static: false, private: false, access: { has: function (obj) { return "brand" in obj; }, get: function (obj) { return obj.brand; }, set: function (obj, value) { obj.brand = value; } }, metadata: _metadata }, _brand_initializers, _brand_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _imageUrls_decorators, { kind: "field", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; }, set: function (obj, value) { obj.imageUrls = value; } }, metadata: _metadata }, _imageUrls_initializers, _imageUrls_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProductDto = CreateProductDto;
var UpdateProductDto = function () {
    var _a;
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _discountPrice_decorators;
    var _discountPrice_initializers = [];
    var _discountPrice_extraInitializers = [];
    var _stock_decorators;
    var _stock_initializers = [];
    var _stock_extraInitializers = [];
    var _brand_decorators;
    var _brand_initializers = [];
    var _brand_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateProductDto() {
                this.categoryId = __runInitializers(this, _categoryId_initializers, void 0);
                this.name = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.discountPrice = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _discountPrice_initializers, void 0));
                this.stock = (__runInitializers(this, _discountPrice_extraInitializers), __runInitializers(this, _stock_initializers, void 0));
                this.brand = (__runInitializers(this, _stock_extraInitializers), __runInitializers(this, _brand_initializers, void 0));
                this.status = (__runInitializers(this, _brand_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return UpdateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _categoryId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _price_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _discountPrice_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _stock_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_transformer_1.Type)(function () { return Number; })];
            _brand_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: product_entity_1.ProductStatus }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(product_entity_1.ProductStatus)];
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _discountPrice_decorators, { kind: "field", name: "discountPrice", static: false, private: false, access: { has: function (obj) { return "discountPrice" in obj; }, get: function (obj) { return obj.discountPrice; }, set: function (obj, value) { obj.discountPrice = value; } }, metadata: _metadata }, _discountPrice_initializers, _discountPrice_extraInitializers);
            __esDecorate(null, null, _stock_decorators, { kind: "field", name: "stock", static: false, private: false, access: { has: function (obj) { return "stock" in obj; }, get: function (obj) { return obj.stock; }, set: function (obj, value) { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
            __esDecorate(null, null, _brand_decorators, { kind: "field", name: "brand", static: false, private: false, access: { has: function (obj) { return "brand" in obj; }, get: function (obj) { return obj.brand; }, set: function (obj, value) { obj.brand = value; } }, metadata: _metadata }, _brand_initializers, _brand_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateProductDto = UpdateProductDto;
var ProductQueryDto = function () {
    var _a;
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _minPrice_decorators;
    var _minPrice_initializers = [];
    var _minPrice_extraInitializers = [];
    var _maxPrice_decorators;
    var _maxPrice_initializers = [];
    var _maxPrice_extraInitializers = [];
    var _inStock_decorators;
    var _inStock_initializers = [];
    var _inStock_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ProductQueryDto() {
                this.search = __runInitializers(this, _search_initializers, void 0);
                this.categoryId = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
                this.minPrice = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _minPrice_initializers, void 0));
                this.maxPrice = (__runInitializers(this, _minPrice_extraInitializers), __runInitializers(this, _maxPrice_initializers, void 0));
                this.inStock = (__runInitializers(this, _maxPrice_extraInitializers), __runInitializers(this, _inStock_initializers, void 0));
                this.sortBy = (__runInitializers(this, _inStock_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
                this.page = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
                __runInitializers(this, _limit_extraInitializers);
            }
            return ProductQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _categoryId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _minPrice_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)()];
            _maxPrice_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsPositive)()];
            _inStock_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Boolean; }), (0, class_validator_1.IsBoolean)()];
            _sortBy_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    enum: ['price_asc', 'price_desc', 'newest', 'popular', 'rating'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 1 }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 20 }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(50)];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _minPrice_decorators, { kind: "field", name: "minPrice", static: false, private: false, access: { has: function (obj) { return "minPrice" in obj; }, get: function (obj) { return obj.minPrice; }, set: function (obj, value) { obj.minPrice = value; } }, metadata: _metadata }, _minPrice_initializers, _minPrice_extraInitializers);
            __esDecorate(null, null, _maxPrice_decorators, { kind: "field", name: "maxPrice", static: false, private: false, access: { has: function (obj) { return "maxPrice" in obj; }, get: function (obj) { return obj.maxPrice; }, set: function (obj, value) { obj.maxPrice = value; } }, metadata: _metadata }, _maxPrice_initializers, _maxPrice_extraInitializers);
            __esDecorate(null, null, _inStock_decorators, { kind: "field", name: "inStock", static: false, private: false, access: { has: function (obj) { return "inStock" in obj; }, get: function (obj) { return obj.inStock; }, set: function (obj, value) { obj.inStock = value; } }, metadata: _metadata }, _inStock_initializers, _inStock_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProductQueryDto = ProductQueryDto;
