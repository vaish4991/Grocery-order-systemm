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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
var common_1 = require("@nestjs/common");
var product_entity_1 = require("./entities/product.entity");
var ProductsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductsService = _classThis = /** @class */ (function () {
        function ProductsService_1(productRepo, imageRepo) {
            this.productRepo = productRepo;
            this.imageRepo = imageRepo;
        }
        ProductsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var search, categoryId, minPrice, maxPrice, inStock, sortBy, _a, page, _b, limit, qb, total, products;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            search = query.search, categoryId = query.categoryId, minPrice = query.minPrice, maxPrice = query.maxPrice, inStock = query.inStock, sortBy = query.sortBy, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 20 : _b;
                            qb = this.productRepo
                                .createQueryBuilder('product')
                                .leftJoinAndSelect('product.images', 'images')
                                .leftJoinAndSelect('product.category', 'category')
                                .where('product.status = :status', { status: product_entity_1.ProductStatus.ACTIVE });
                            if (search) {
                                qb.andWhere('(product.name ILIKE :search OR product.description ILIKE :search OR product.brand ILIKE :search)', { search: "%".concat(search, "%") });
                            }
                            if (categoryId) {
                                qb.andWhere('product.categoryId = :categoryId', { categoryId: categoryId });
                            }
                            if (minPrice !== undefined) {
                                qb.andWhere('COALESCE(product.discountPrice, product.price) >= :minPrice', { minPrice: minPrice });
                            }
                            if (maxPrice !== undefined) {
                                qb.andWhere('COALESCE(product.discountPrice, product.price) <= :maxPrice', { maxPrice: maxPrice });
                            }
                            if (inStock) {
                                qb.andWhere('product.stock > 0');
                            }
                            // Sorting
                            switch (sortBy) {
                                case 'price_asc':
                                    qb.orderBy('COALESCE(product.discountPrice, product.price)', 'ASC');
                                    break;
                                case 'price_desc':
                                    qb.orderBy('COALESCE(product.discountPrice, product.price)', 'DESC');
                                    break;
                                case 'popular':
                                    qb.orderBy('product.salesCount', 'DESC');
                                    break;
                                case 'rating':
                                    qb.orderBy('product.averageRating', 'DESC');
                                    break;
                                default:
                                    qb.orderBy('product.createdAt', 'DESC');
                            }
                            return [4 /*yield*/, qb.getCount()];
                        case 1:
                            total = _c.sent();
                            return [4 /*yield*/, qb
                                    .skip((page - 1) * limit)
                                    .take(limit)
                                    .getMany()];
                        case 2:
                            products = _c.sent();
                            return [2 /*return*/, {
                                    products: products,
                                    total: total,
                                    page: page,
                                    limit: limit,
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        ProductsService_1.prototype.findBySlug = function (slug) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productRepo.findOne({
                                where: { slug: slug, status: product_entity_1.ProductStatus.ACTIVE },
                                relations: ['category', 'images'],
                            })];
                        case 1:
                            product = _a.sent();
                            if (!product)
                                throw new common_1.NotFoundException('Product not found');
                            return [2 /*return*/, product];
                    }
                });
            });
        };
        ProductsService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productRepo.findOne({
                                where: { id: id },
                                relations: ['category', 'images'],
                            })];
                        case 1:
                            product = _a.sent();
                            if (!product)
                                throw new common_1.NotFoundException('Product not found');
                            return [2 /*return*/, product];
                    }
                });
            });
        };
        ProductsService_1.prototype.getFeatured = function () {
            return __awaiter(this, arguments, void 0, function (limit) {
                if (limit === void 0) { limit = 8; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.productRepo.find({
                            where: { status: product_entity_1.ProductStatus.ACTIVE },
                            order: { salesCount: 'DESC' },
                            take: limit,
                            relations: ['images', 'category'],
                        })];
                });
            });
        };
        ProductsService_1.prototype.create = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var slug, product, saved, images;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.generateUniqueSlug(dto.name)];
                        case 1:
                            slug = _a.sent();
                            product = this.productRepo.create({
                                categoryId: dto.categoryId,
                                name: dto.name,
                                slug: slug,
                                description: dto.description,
                                price: dto.price,
                                discountPrice: dto.discountPrice,
                                stock: dto.stock,
                                sku: dto.sku,
                                brand: dto.brand,
                                status: dto.status || product_entity_1.ProductStatus.ACTIVE,
                            });
                            return [4 /*yield*/, this.productRepo.save(product)];
                        case 2:
                            saved = _a.sent();
                            if (!(dto.imageUrls && dto.imageUrls.length > 0)) return [3 /*break*/, 4];
                            images = dto.imageUrls.map(function (url, index) {
                                return _this.imageRepo.create({
                                    productId: saved.id,
                                    imageUrl: url,
                                    isPrimary: index === 0,
                                    sortOrder: index,
                                });
                            });
                            return [4 /*yield*/, this.imageRepo.save(images)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, this.findById(saved.id)];
                    }
                });
            });
        };
        ProductsService_1.prototype.update = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.productRepo.update(id, dto)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.findById(id)];
                    }
                });
            });
        };
        ProductsService_1.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.productRepo.delete(id)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Product deleted' }];
                    }
                });
            });
        };
        ProductsService_1.prototype.updateStock = function (id, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productRepo.decrement({ id: id }, 'stock', quantity)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.productRepo.increment({ id: id }, 'salesCount', quantity)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProductsService_1.prototype.generateUniqueSlug = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var base, slug, count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            base = name
                                .toLowerCase()
                                .replace(/[^a-z0-9\s-]/g, '')
                                .replace(/\s+/g, '-');
                            slug = base;
                            count = 0;
                            _a.label = 1;
                        case 1: return [4 /*yield*/, this.productRepo.findOne({ where: { slug: slug } })];
                        case 2:
                            if (!_a.sent()) return [3 /*break*/, 3];
                            count++;
                            slug = "".concat(base, "-").concat(count);
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/, slug];
                    }
                });
            });
        };
        return ProductsService_1;
    }());
    __setFunctionName(_classThis, "ProductsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductsService = _classThis;
}();
exports.ProductsService = ProductsService;
