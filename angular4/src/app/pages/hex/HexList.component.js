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
var HexListComponent = (function () {
    function HexListComponent(disElement) {
        this.disElement = disElement;
        this._hexRows = [];
        this._pages = [];
        this.onClick = new core_1.EventEmitter();
    }
    HexListComponent.prototype.ngAfterViewInit = function () {
        var hexsPerEvenRow = this.getHexsPerEvenRow();
        var hexsPerOddRow = this.getHexesPerOddRow();
        var start = 0, end = hexsPerEvenRow;
        var rows = 0, odd = false;
        var hexs = this.pages.length;
        while (hexs > 0) {
            if (odd = !odd) {
                this.hexRows.push(new HexRow_model_1.HexRowModel(this.pages.slice(start, end), {
                    even: false
                }));
                start = end;
                end += hexsPerOddRow;
                hexs -= hexsPerOddRow;
            }
            else {
                this.hexRows.push(new HexRow_model_1.HexRowModel(this.pages.slice(start, end), {
                    even: true
                }));
                start = end;
                end += hexsPerEvenRow;
                hexs -= hexsPerEvenRow;
            }
        }
    };
    Object.defineProperty(HexListComponent.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        set: function (value) {
            this._pages = value;
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
    HexListComponent.prototype.hexClicked = function (name) {
        this.onClick.emit(name);
    };
    return HexListComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HexListComponent.prototype, "onClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], HexListComponent.prototype, "pages", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], HexListComponent.prototype, "config", null);
HexListComponent = __decorate([
    core_1.Component({
        selector: 'hex-list',
        templateUrl: './templates/hex-list.htm'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], HexListComponent);
exports.HexListComponent = HexListComponent;
//# sourceMappingURL=HexList.component.js.map