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
var router_1 = require("@angular/router");
require("./search.htm");
var angular2_notifications_1 = require("angular2-notifications");
var TitleValidation_service_1 = require("../edit/TitleValidation.service");
var Permissions_component_1 = require("../../auth/Permissions.component");
var UserPrincipal_model_1 = require("../../auth/UserPrincipal.model");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(pagesService, notificationService, actualRouter, userToken) {
        this.pagesService = pagesService;
        this.notificationService = notificationService;
        this.actualRouter = actualRouter;
        this.userToken = userToken;
        this._model = {};
        this.onSearch = new core_1.EventEmitter();
        this.onSearchFail = new core_1.EventEmitter();
    }
    Object.defineProperty(SearchComponent.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (value) {
            this._model = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchComponent.prototype, "cantSearch", {
        get: function () {
            return Permissions_component_1.Permissions.canActivate(this.userToken, 'view')
                .map(function (canView) { return !canView; });
        },
        enumerable: true,
        configurable: true
    });
    SearchComponent.prototype.search = function (searchedTitle) {
        var _this = this;
        var self = this;
        this.cantSearch
            .map(function (cantCreate) { return !cantCreate; })
            .subscribe(function (canCreate) {
            if (searchedTitle) {
                _this.onSearch.emit(true);
                _this.pagesService.isValid(searchedTitle)
                    .map(function (doesNotExist) { return !doesNotExist; })
                    .subscribe(function (success) {
                    if (success) {
                        self.actualRouter.navigate(['/page/' + searchedTitle]);
                    }
                    else {
                        self.failure();
                        _this.onSearchFail.next(true);
                    }
                }, function (error) { return self.failure(); });
            }
        });
    };
    SearchComponent.prototype.failure = function () {
        this.notificationService.warn('Page not found!', 'Create one, maybe?', {
            timeOut: 3000,
            showProgressBar: true,
            clickToClose: true
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "onSearch", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "onSearchFail", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'page-search',
            template: require('./search.htm')
        }),
        __metadata("design:paramtypes", [TitleValidation_service_1.TitleValidationService,
            angular2_notifications_1.NotificationsService,
            router_1.Router,
            UserPrincipal_model_1.UserPrincipal])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=Search.component.js.map