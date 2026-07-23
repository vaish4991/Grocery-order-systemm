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
exports.UploadController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_2 = require("@nestjs/swagger");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var GetUploadUrlDto = function () {
    var _a;
    var _folder_decorators;
    var _folder_initializers = [];
    var _folder_extraInitializers = [];
    var _filename_decorators;
    var _filename_initializers = [];
    var _filename_extraInitializers = [];
    var _contentType_decorators;
    var _contentType_initializers = [];
    var _contentType_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetUploadUrlDto() {
                this.folder = __runInitializers(this, _folder_initializers, void 0);
                this.filename = (__runInitializers(this, _folder_extraInitializers), __runInitializers(this, _filename_initializers, void 0));
                this.contentType = (__runInitializers(this, _filename_extraInitializers), __runInitializers(this, _contentType_initializers, void 0));
                __runInitializers(this, _contentType_extraInitializers);
            }
            return GetUploadUrlDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _folder_decorators = [(0, swagger_2.ApiProperty)({ enum: ['products', 'categories', 'banners', 'invoices'] }), (0, class_validator_1.IsEnum)(['products', 'categories', 'banners', 'invoices'])];
            _filename_decorators = [(0, swagger_2.ApiProperty)({ example: 'product-image.jpg' }), (0, class_validator_1.IsString)()];
            _contentType_decorators = [(0, swagger_2.ApiProperty)({ example: 'image/jpeg' }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _folder_decorators, { kind: "field", name: "folder", static: false, private: false, access: { has: function (obj) { return "folder" in obj; }, get: function (obj) { return obj.folder; }, set: function (obj, value) { obj.folder = value; } }, metadata: _metadata }, _folder_initializers, _folder_extraInitializers);
            __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: function (obj) { return "filename" in obj; }, get: function (obj) { return obj.filename; }, set: function (obj, value) { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
            __esDecorate(null, null, _contentType_decorators, { kind: "field", name: "contentType", static: false, private: false, access: { has: function (obj) { return "contentType" in obj; }, get: function (obj) { return obj.contentType; }, set: function (obj, value) { obj.contentType = value; } }, metadata: _metadata }, _contentType_initializers, _contentType_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var UploadController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Upload'), (0, swagger_1.ApiBearerAuth)(), (0, roles_decorator_1.Roles)('ADMIN'), (0, common_1.Controller)('upload')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getPresignedUrl_decorators;
    var _deleteFile_decorators;
    var UploadController = _classThis = /** @class */ (function () {
        function UploadController_1(uploadService) {
            this.uploadService = (__runInitializers(this, _instanceExtraInitializers), uploadService);
        }
        UploadController_1.prototype.getPresignedUrl = function (dto) {
            return this.uploadService.getPresignedUploadUrl(dto.folder, dto.filename, dto.contentType);
        };
        UploadController_1.prototype.deleteFile = function (key) {
            return this.uploadService.deleteFile(key);
        };
        return UploadController_1;
    }());
    __setFunctionName(_classThis, "UploadController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getPresignedUrl_decorators = [(0, common_1.Post)('presigned-url'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Get S3 presigned URL for file upload' })];
        _deleteFile_decorators = [(0, common_1.Delete)(':key'), (0, swagger_1.ApiOperation)({ summary: '[Admin] Delete a file from S3' })];
        __esDecorate(_classThis, null, _getPresignedUrl_decorators, { kind: "method", name: "getPresignedUrl", static: false, private: false, access: { has: function (obj) { return "getPresignedUrl" in obj; }, get: function (obj) { return obj.getPresignedUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteFile_decorators, { kind: "method", name: "deleteFile", static: false, private: false, access: { has: function (obj) { return "deleteFile" in obj; }, get: function (obj) { return obj.deleteFile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UploadController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UploadController = _classThis;
}();
exports.UploadController = UploadController;
