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
exports.CartService = void 0;
var common_1 = require("@nestjs/common");
var CartService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CartService = _classThis = /** @class */ (function () {
        function CartService_1(cartRepo, cartItemRepo, productRepo) {
            this.cartRepo = cartRepo;
            this.cartItemRepo = cartItemRepo;
            this.productRepo = productRepo;
        }
        CartService_1.prototype.getOrCreateCart = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.cartRepo.findOne({
                                where: { userId: userId },
                                relations: ['items', 'items.product', 'items.product.images'],
                            })];
                        case 1:
                            cart = _a.sent();
                            if (!!cart) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.cartRepo.save(this.cartRepo.create({ userId: userId }))];
                        case 2:
                            cart = _a.sent();
                            cart.items = [];
                            _a.label = 3;
                        case 3: return [2 /*return*/, cart];
                    }
                });
            });
        };
        CartService_1.prototype.getCart = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrCreateCart(userId)];
                        case 1:
                            cart = _a.sent();
                            return [2 /*return*/, this.enrichCart(cart)];
                    }
                });
            });
        };
        CartService_1.prototype.addItem = function (userId, productId, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var product, cart, item, newQty;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productRepo.findOne({ where: { id: productId } })];
                        case 1:
                            product = _a.sent();
                            if (!product)
                                throw new common_1.NotFoundException('Product not found');
                            if (product.stock < quantity) {
                                throw new common_1.BadRequestException("Only ".concat(product.stock, " items available in stock"));
                            }
                            return [4 /*yield*/, this.getOrCreateCart(userId)];
                        case 2:
                            cart = _a.sent();
                            item = cart.items.find(function (i) { return i.productId === productId; });
                            if (!item) return [3 /*break*/, 4];
                            newQty = item.quantity + quantity;
                            if (product.stock < newQty) {
                                throw new common_1.BadRequestException("Only ".concat(product.stock, " items available in stock"));
                            }
                            return [4 /*yield*/, this.cartItemRepo.update(item.id, { quantity: newQty })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, this.cartItemRepo.save(this.cartItemRepo.create({ cartId: cart.id, productId: productId, quantity: quantity }))];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/, this.getCart(userId)];
                    }
                });
            });
        };
        CartService_1.prototype.updateItem = function (userId, itemId, quantity) {
            return __awaiter(this, void 0, void 0, function () {
                var cart, item, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrCreateCart(userId)];
                        case 1:
                            cart = _a.sent();
                            item = cart.items.find(function (i) { return i.id === itemId; });
                            if (!item)
                                throw new common_1.NotFoundException('Cart item not found');
                            if (!(quantity <= 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.cartItemRepo.delete(itemId)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 3: return [4 /*yield*/, this.productRepo.findOne({ where: { id: item.productId } })];
                        case 4:
                            product = _a.sent();
                            if (product && product.stock < quantity) {
                                throw new common_1.BadRequestException("Only ".concat(product.stock, " items available in stock"));
                            }
                            return [4 /*yield*/, this.cartItemRepo.update(itemId, { quantity: quantity })];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/, this.getCart(userId)];
                    }
                });
            });
        };
        CartService_1.prototype.removeItem = function (userId, itemId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrCreateCart(userId)];
                        case 1:
                            cart = _a.sent();
                            item = cart.items.find(function (i) { return i.id === itemId; });
                            if (!item)
                                throw new common_1.NotFoundException('Cart item not found');
                            return [4 /*yield*/, this.cartItemRepo.delete(itemId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.getCart(userId)];
                    }
                });
            });
        };
        CartService_1.prototype.clearCart = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrCreateCart(userId)];
                        case 1:
                            cart = _a.sent();
                            return [4 /*yield*/, this.cartItemRepo.delete({ cartId: cart.id })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Cart cleared' }];
                    }
                });
            });
        };
        CartService_1.prototype.enrichCart = function (cart) {
            var totalAmount = cart.items.reduce(function (sum, item) {
                var _a, _b;
                var price = ((_a = item.product) === null || _a === void 0 ? void 0 : _a.discountPrice) || ((_b = item.product) === null || _b === void 0 ? void 0 : _b.price) || 0;
                return sum + Number(price) * item.quantity;
            }, 0);
            return {
                id: cart.id,
                items: cart.items,
                totalItems: cart.items.reduce(function (sum, i) { return sum + i.quantity; }, 0),
                totalAmount: Number(totalAmount.toFixed(2)),
            };
        };
        return CartService_1;
    }());
    __setFunctionName(_classThis, "CartService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CartService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CartService = _classThis;
}();
exports.CartService = CartService;
