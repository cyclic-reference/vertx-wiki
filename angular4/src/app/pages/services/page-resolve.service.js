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
var Observable_1 = require("rxjs/Observable");
var Permissions_component_1 = require("../../auth/Permissions.component");
var Pages_service_1 = require("./Pages.service");
var PageResolve = /** @class */ (function () {
    function PageResolve(permissons, pagesService) {
        this.permissons = permissons;
        this.pagesService = pagesService;
    }
    PageResolve.prototype.resolve = function (route, state) {
        var _this = this;
        return this.permissons.canView
            .flatMap(function (canView) {
            if (canView) {
                return _this.pagesService.fetchPage(route.params["name"]);
            }
            else {
                return Observable_1.Observable.empty();
            }
        });
    };
    PageResolve = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [Permissions_component_1.Permissions, Pages_service_1.PagesService])
    ], PageResolve);
    return PageResolve;
}());
exports.PageResolve = PageResolve;
//# sourceMappingURL=page-resolve.service.js.map