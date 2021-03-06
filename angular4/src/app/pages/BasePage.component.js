"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 9/17/17.
 */
var core_1 = require("@angular/core");
require("./page.htm");
var Observable_1 = require("rxjs/Observable");
var BasePageComponent = /** @class */ (function () {
    function BasePageComponent(router) {
        this.router = router;
        this._editMode = false;
        this._editOptions = {
            hideDelete: true
        };
    }
    Object.defineProperty(BasePageComponent.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePageComponent.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePageComponent.prototype, "editMode", {
        get: function () {
            return this._editMode;
        },
        set: function (value) {
            this._editMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePageComponent.prototype, "htmlContent", {
        get: function () {
            return this._htmlContent;
        },
        set: function (value) {
            this._htmlContent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePageComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            this._page = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePageComponent.prototype, "editOptions", {
        get: function () {
            return this._editOptions;
        },
        set: function (value) {
            this._editOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    BasePageComponent.prototype.load = function (page) {
        this.title = page.name;
        this.content = page.markdown;
        this.page = page;
        return Observable_1.Observable.of(true);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BasePageComponent.prototype, "editMode", null);
    return BasePageComponent;
}());
exports.BasePageComponent = BasePageComponent;
//# sourceMappingURL=BasePage.component.js.map