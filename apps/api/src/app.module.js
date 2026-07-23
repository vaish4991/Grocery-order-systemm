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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var throttler_1 = require("@nestjs/throttler");
var auth_module_1 = require("./modules/auth/auth.module");
var users_module_1 = require("./modules/users/users.module");
var categories_module_1 = require("./modules/categories/categories.module");
var products_module_1 = require("./modules/products/products.module");
var cart_module_1 = require("./modules/cart/cart.module");
var orders_module_1 = require("./modules/orders/orders.module");
var payments_module_1 = require("./modules/payments/payments.module");
var reviews_module_1 = require("./modules/reviews/reviews.module");
var coupons_module_1 = require("./modules/coupons/coupons.module");
var notifications_module_1 = require("./modules/notifications/notifications.module");
var upload_module_1 = require("./modules/upload/upload.module");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                // Config — loads .env file
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env',
                }),
                // Rate limiting
                throttler_1.ThrottlerModule.forRoot([
                    {
                        ttl: 60000,
                        limit: 100,
                    },
                ]),
                // TypeORM — PostgreSQL
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (config) { return ({
                        type: 'postgres',
                        host: config.get('DB_HOST', 'localhost'),
                        port: config.get('DB_PORT', 5432),
                        username: config.get('DB_USERNAME', 'postgres'),
                        password: config.get('DB_PASSWORD', 'postgres'),
                        database: config.get('DB_NAME', 'gos_db'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: config.get('NODE_ENV') !== 'production',
                        logging: config.get('NODE_ENV') === 'development',
                        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
                    }); },
                }),
                // Feature modules
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                categories_module_1.CategoriesModule,
                products_module_1.ProductsModule,
                cart_module_1.CartModule,
                orders_module_1.OrdersModule,
                payments_module_1.PaymentsModule,
                reviews_module_1.ReviewsModule,
                coupons_module_1.CouponsModule,
                notifications_module_1.NotificationsModule,
                upload_module_1.UploadModule,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
