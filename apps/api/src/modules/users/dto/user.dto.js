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
exports.CreateAddressDto = exports.UpdateProfileDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var UpdateProfileDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateProfileDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.phone = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                __runInitializers(this, _phone_extraInitializers);
            }
            return UpdateProfileDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(2, 100)];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(/^[6-9]\d{9}$/)];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateProfileDto = UpdateProfileDto;
var CreateAddressDto = function () {
    var _a;
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _addressLine1_decorators;
    var _addressLine1_initializers = [];
    var _addressLine1_extraInitializers = [];
    var _addressLine2_decorators;
    var _addressLine2_initializers = [];
    var _addressLine2_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _country_decorators;
    var _country_initializers = [];
    var _country_extraInitializers = [];
    var _postalCode_decorators;
    var _postalCode_initializers = [];
    var _postalCode_extraInitializers = [];
    var _isDefault_decorators;
    var _isDefault_initializers = [];
    var _isDefault_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAddressDto() {
                this.fullName = __runInitializers(this, _fullName_initializers, void 0);
                this.phone = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.addressLine1 = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _addressLine1_initializers, void 0));
                this.addressLine2 = (__runInitializers(this, _addressLine1_extraInitializers), __runInitializers(this, _addressLine2_initializers, void 0));
                this.city = (__runInitializers(this, _addressLine2_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.country = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _country_initializers, void 0));
                this.postalCode = (__runInitializers(this, _country_extraInitializers), __runInitializers(this, _postalCode_initializers, void 0));
                this.isDefault = (__runInitializers(this, _postalCode_extraInitializers), __runInitializers(this, _isDefault_initializers, void 0));
                __runInitializers(this, _isDefault_extraInitializers);
            }
            return CreateAddressDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fullName_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(2, 100)];
            _phone_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^[6-9]\d{9}$/)];
            _addressLine1_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(5, 255)];
            _addressLine2_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(0, 255)];
            _city_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(2, 100)];
            _state_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Length)(2, 100)];
            _country_decorators = [(0, swagger_1.ApiProperty)({ default: 'India' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _postalCode_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'Enter a valid 6-digit PIN code' })];
            _isDefault_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: false }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _addressLine1_decorators, { kind: "field", name: "addressLine1", static: false, private: false, access: { has: function (obj) { return "addressLine1" in obj; }, get: function (obj) { return obj.addressLine1; }, set: function (obj, value) { obj.addressLine1 = value; } }, metadata: _metadata }, _addressLine1_initializers, _addressLine1_extraInitializers);
            __esDecorate(null, null, _addressLine2_decorators, { kind: "field", name: "addressLine2", static: false, private: false, access: { has: function (obj) { return "addressLine2" in obj; }, get: function (obj) { return obj.addressLine2; }, set: function (obj, value) { obj.addressLine2 = value; } }, metadata: _metadata }, _addressLine2_initializers, _addressLine2_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            __esDecorate(null, null, _postalCode_decorators, { kind: "field", name: "postalCode", static: false, private: false, access: { has: function (obj) { return "postalCode" in obj; }, get: function (obj) { return obj.postalCode; }, set: function (obj, value) { obj.postalCode = value; } }, metadata: _metadata }, _postalCode_initializers, _postalCode_extraInitializers);
            __esDecorate(null, null, _isDefault_decorators, { kind: "field", name: "isDefault", static: false, private: false, access: { has: function (obj) { return "isDefault" in obj; }, get: function (obj) { return obj.isDefault; }, set: function (obj, value) { obj.isDefault = value; } }, metadata: _metadata }, _isDefault_initializers, _isDefault_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAddressDto = CreateAddressDto;
