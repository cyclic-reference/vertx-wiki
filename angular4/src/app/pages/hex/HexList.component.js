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
require("./hex-list.htm");
var HexRow_model_1 = require("./HexRow.model");
var HexListComponent = /** @class */ (function () {
    function HexListComponent(disElement, ngZone) {
        this.disElement = disElement;
        this.ngZone = ngZone;
        this.onClick = new core_1.EventEmitter();
        this._keyValues = [];
        var self = this;
        window.onresize = function (e) {
            self.ngZone.run(function () {
                self.layoutRows();
            });
        };
    }
    Object.defineProperty(HexListComponent.prototype, "hexRows", {
        get: function () {
            return this._hexRows;
        },
        set: function (value) {
            this._hexRows = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HexListComponent.prototype, "keyValues", {
        get: function () {
            return this._keyValues;
        },
        set: function (value) {
            this._keyValues = value;
            this.layoutRows();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HexListComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value;
        },
        enumerable: true,
        configurable: true
    });
    HexListComponent.prototype.ngAfterViewInit = function () {
        this.layoutRows();
    };
    HexListComponent.prototype.hexClicked = function (name) {
        this.onClick.emit(name);
    };
    HexListComponent.prototype.layoutRows = function () {
        this.hexRows = [];
        var hexsPerEvenRow = this.getHexsPerEvenRow();
        var hexsPerOddRow = this.getHexesPerOddRow();
        var start = 0, end = hexsPerEvenRow;
        var odd = false;
        var hexs = this.keyValues.length;
        while (hexs >= 0) {
            if (odd = !odd) {
                this.hexRows.push(new HexRow_model_1.HexRowModel(this.keyValues.slice(start, end), {
                    even: false
                }));
                start = end;
                end += hexsPerOddRow;
                hexs -= hexsPerOddRow;
            }
            else {
                this.hexRows.push(new HexRow_model_1.HexRowModel(this.keyValues.slice(start, end), {
                    even: true
                }));
                start = end;
                end += hexsPerEvenRow;
                hexs -= hexsPerEvenRow;
            }
        }
    };
    HexListComponent.prototype.getHexsPerEvenRow = function () {
        return this.getHexesPerOddRow() - 1;
    };
    HexListComponent.prototype.getHexesPerOddRow = function () {
        return Math.floor(this.getParentWidth() / this.getHexWidth());
    };
    HexListComponent.prototype.getParentWidth = function () {
        return this.disElement.nativeElement.parentNode.offsetWidth;
    };
    HexListComponent.prototype.getHexWidth = function () {
        return 104 + this.getSpacing();
    };
    HexListComponent.prototype.getSpacing = function () {
        return 5;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], HexListComponent.prototype, "onClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], HexListComponent.prototype, "keyValues", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HexListComponent.prototype, "config", null);
    HexListComponent = __decorate([
        core_1.Component({
            selector: 'hex-list',
            template: require('./hex-list.htm')
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
    ], HexListComponent);
    return HexListComponent;
}());
exports.HexListComponent = HexListComponent;
//# sourceMappingURL=HexList.component.js.map