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
exports.Product = exports.ProductStatus = void 0;
var typeorm_1 = require("typeorm");
var category_entity_1 = require("../../categories/entities/category.entity");
var product_image_entity_1 = require("./product-image.entity");
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "ACTIVE";
    ProductStatus["INACTIVE"] = "INACTIVE";
    ProductStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var Product = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('products')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
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
    var _images_decorators;
    var _images_initializers = [];
    var _images_extraInitializers = [];
    var _averageRating_decorators;
    var _averageRating_initializers = [];
    var _averageRating_extraInitializers = [];
    var _reviewCount_decorators;
    var _reviewCount_initializers = [];
    var _reviewCount_extraInitializers = [];
    var _salesCount_decorators;
    var _salesCount_initializers = [];
    var _salesCount_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var Product = _classThis = /** @class */ (function () {
        function Product_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.categoryId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
            this.category = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.name = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.description = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.discountPrice = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _discountPrice_initializers, void 0));
            this.stock = (__runInitializers(this, _discountPrice_extraInitializers), __runInitializers(this, _stock_initializers, void 0));
            this.sku = (__runInitializers(this, _stock_extraInitializers), __runInitializers(this, _sku_initializers, void 0));
            this.brand = (__runInitializers(this, _sku_extraInitializers), __runInitializers(this, _brand_initializers, void 0));
            this.status = (__runInitializers(this, _brand_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.images = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _images_initializers, void 0));
            this.averageRating = (__runInitializers(this, _images_extraInitializers), __runInitializers(this, _averageRating_initializers, void 0));
            this.reviewCount = (__runInitializers(this, _averageRating_extraInitializers), __runInitializers(this, _reviewCount_initializers, void 0));
            this.salesCount = (__runInitializers(this, _reviewCount_extraInitializers), __runInitializers(this, _salesCount_initializers, void 0));
            this.createdAt = (__runInitializers(this, _salesCount_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return Product_1;
    }());
    __setFunctionName(_classThis, "Product");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _categoryId_decorators = [(0, typeorm_1.Column)()];
        _category_decorators = [(0, typeorm_1.ManyToOne)(function () { return category_entity_1.Category; }, { eager: true, onDelete: 'RESTRICT' }), (0, typeorm_1.JoinColumn)({ name: 'categoryId' })];
        _name_decorators = [(0, typeorm_1.Column)({ length: 200 })];
        _slug_decorators = [(0, typeorm_1.Column)({ unique: true, length: 250 })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _price_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _discountPrice_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _stock_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _sku_decorators = [(0, typeorm_1.Column)({ unique: true, length: 100 })];
        _brand_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })];
        _images_decorators = [(0, typeorm_1.OneToMany)(function () { return product_image_entity_1.ProductImage; }, function (image) { return image.product; }, {
                cascade: true,
                eager: true,
            })];
        _averageRating_decorators = [(0, typeorm_1.Column)({ type: 'float', default: 0 })];
        _reviewCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _salesCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _discountPrice_decorators, { kind: "field", name: "discountPrice", static: false, private: false, access: { has: function (obj) { return "discountPrice" in obj; }, get: function (obj) { return obj.discountPrice; }, set: function (obj, value) { obj.discountPrice = value; } }, metadata: _metadata }, _discountPrice_initializers, _discountPrice_extraInitializers);
        __esDecorate(null, null, _stock_decorators, { kind: "field", name: "stock", static: false, private: false, access: { has: function (obj) { return "stock" in obj; }, get: function (obj) { return obj.stock; }, set: function (obj, value) { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
        __esDecorate(null, null, _sku_decorators, { kind: "field", name: "sku", static: false, private: false, access: { has: function (obj) { return "sku" in obj; }, get: function (obj) { return obj.sku; }, set: function (obj, value) { obj.sku = value; } }, metadata: _metadata }, _sku_initializers, _sku_extraInitializers);
        __esDecorate(null, null, _brand_decorators, { kind: "field", name: "brand", static: false, private: false, access: { has: function (obj) { return "brand" in obj; }, get: function (obj) { return obj.brand; }, set: function (obj, value) { obj.brand = value; } }, metadata: _metadata }, _brand_initializers, _brand_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _images_decorators, { kind: "field", name: "images", static: false, private: false, access: { has: function (obj) { return "images" in obj; }, get: function (obj) { return obj.images; }, set: function (obj, value) { obj.images = value; } }, metadata: _metadata }, _images_initializers, _images_extraInitializers);
        __esDecorate(null, null, _averageRating_decorators, { kind: "field", name: "averageRating", static: false, private: false, access: { has: function (obj) { return "averageRating" in obj; }, get: function (obj) { return obj.averageRating; }, set: function (obj, value) { obj.averageRating = value; } }, metadata: _metadata }, _averageRating_initializers, _averageRating_extraInitializers);
        __esDecorate(null, null, _reviewCount_decorators, { kind: "field", name: "reviewCount", static: false, private: false, access: { has: function (obj) { return "reviewCount" in obj; }, get: function (obj) { return obj.reviewCount; }, set: function (obj, value) { obj.reviewCount = value; } }, metadata: _metadata }, _reviewCount_initializers, _reviewCount_extraInitializers);
        __esDecorate(null, null, _salesCount_decorators, { kind: "field", name: "salesCount", static: false, private: false, access: { has: function (obj) { return "salesCount" in obj; }, get: function (obj) { return obj.salesCount; }, set: function (obj, value) { obj.salesCount = value; } }, metadata: _metadata }, _salesCount_initializers, _salesCount_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Product = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Product = _classThis;
}();
exports.Product = Product;
