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
var noUiSlider = require('nouislider');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
function toValue(value) {
    if (value.length == 1) {
        return value[0];
    }
    else if (value.length > 1) {
        return value;
    }
    else {
        return 0;
    }
}
exports.toValue = toValue;
var DefaultFormatter = (function () {
    function DefaultFormatter() {
    }
    DefaultFormatter.prototype.to = function (value) {
        return parseFloat(value);
    };
    ;
    DefaultFormatter.prototype.from = function (value) {
        return parseFloat(value).toFixed(2);
    };
    return DefaultFormatter;
}());
exports.DefaultFormatter = DefaultFormatter;
var NouisliderComponent = (function () {
    function NouisliderComponent(el) {
        this.el = el;
        this.config = {};
        this.change = new core_1.EventEmitter(true);
        this.update = new core_1.EventEmitter(true);
        this.slide = new core_1.EventEmitter(true);
        this.set = new core_1.EventEmitter(true);
        this.start = new core_1.EventEmitter(true);
        this.end = new core_1.EventEmitter(true);
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    NouisliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var inputsConfig = JSON.parse(JSON.stringify({
            behaviour: this.behaviour,
            connect: this.connect,
            limit: this.limit,
            start: this.ngModel,
            step: this.step,
            range: this.config.range || { min: this.min, max: this.max }
        }));
        inputsConfig.format = this.format || this.config.format || new DefaultFormatter();
        this.slider = noUiSlider.create(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
        this.slider.on('set', function (value) {
            var v = toValue(value);
            if (_this.value == v || String(_this.value) == String(v)) {
                return;
            }
            if (_this.value !== undefined) {
                _this.set.emit(v);
                _this.onChange(v);
            }
            _this.value = v;
        });
        this.slider.on('update', function () {
            _this.update.emit(_this.value);
        });
        this.slider.on('change', function () {
            _this.change.emit(_this.value);
        });
        this.slider.on('slide', function () {
            _this.slide.emit(_this.value);
        });
        this.slider.on('start', function () {
            _this.start.emit(_this.value);
        });
        this.slider.on('end', function () {
            _this.end.emit(_this.value);
        });
    };
    NouisliderComponent.prototype.writeValue = function (value) {
        if (this.slider) {
            this.slider.set(value);
        }
    };
    NouisliderComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NouisliderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NouisliderComponent.prototype, "behaviour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], NouisliderComponent.prototype, "connect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NouisliderComponent.prototype, "limit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NouisliderComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NouisliderComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NouisliderComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NouisliderComponent.prototype, "format", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NouisliderComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NouisliderComponent.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NouisliderComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NouisliderComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NouisliderComponent.prototype, "slide", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NouisliderComponent.prototype, "set", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NouisliderComponent.prototype, "start", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NouisliderComponent.prototype, "end", void 0);
    NouisliderComponent = __decorate([
        core_1.Component({
            selector: 'nouislider',
            host: {
                '[class.ng2-nouislider]': 'true'
            },
            template: '<div></div>',
            styles: ["\n    :host {\n      display: block;\n      margin-top: 1rem;\n      margin-bottom: 1rem;\n    }\n  "],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return NouisliderComponent; }),
                    multi: true
                }
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], NouisliderComponent);
    return NouisliderComponent;
}());
exports.NouisliderComponent = NouisliderComponent;
var NouisliderModule = (function () {
    function NouisliderModule() {
    }
    NouisliderModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [NouisliderComponent],
            declarations: [NouisliderComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], NouisliderModule);
    return NouisliderModule;
}());
exports.NouisliderModule = NouisliderModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91aXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdWlzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLHFCQVNPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHNCQUdPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsaUJBQXdCLEtBQWU7SUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0FBQ0gsQ0FBQztBQVJlLGVBQU8sVUFRdEIsQ0FBQTtBQU9EO0lBQUE7SUFRQSxDQUFDO0lBUEMsNkJBQUUsR0FBRixVQUFHLEtBQVU7UUFDWCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7O0lBRUQsK0JBQUksR0FBSixVQUFLLEtBQVU7UUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLHdCQUFnQixtQkFRNUIsQ0FBQTtBQXVCRDtJQXNCRSw2QkFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFaakIsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUVoQixXQUFNLEdBQXNCLElBQUksbUJBQVksQ0FBQyxJQUFJLENBQUMs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c0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7b0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7c0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7b0RBQUE7SUF0Q1g7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFO2dCQUNKLHdCQUF3QixFQUFFLE1BQU07YUFDakM7WUFDRCxRQUFRLEVBQUUsYUFBYTtZQUN2QixNQUFNLEVBQUUsQ0FBQyxzR0FNUixDQUFDO1lBQ0YsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx5QkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQztvQkFDbEQsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7OzJCQUFBO0lBd0ZGLDBCQUFDO0FBQUQsQ0FBQyxBQXZGRCxJQXVGQztBQXZGWSwyQkFBbUIsc0JBdUYvQixDQUFBO0FBUUQ7SUFBQTtJQUFnQyxDQUFDO0lBTGpDO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUM5QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztTQUNwQyxDQUFDOzt3QkFBQTtJQUM4Qix1QkFBQztBQUFELENBQUMsQUFBakMsSUFBaUM7QUFBcEIsd0JBQWdCLG1CQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBub1VpU2xpZGVyIGZyb20gJ25vdWlzbGlkZXInO1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgTmdNb2R1bGUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1JcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9WYWx1ZSh2YWx1ZTogc3RyaW5nW10pOiBhbnkgfCBhbnlbXSB7XHJcbiAgaWYgKHZhbHVlLmxlbmd0aCA9PSAxKSB7XHJcbiAgICByZXR1cm4gdmFsdWVbMF07XHJcbiAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiAxKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3VpRm9ybWF0dGVyIHtcclxuICB0byh2YWx1ZTogYW55KTogYW55O1xyXG4gIGZyb20odmFsdWU6IGFueSk6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRGb3JtYXR0ZXIgaW1wbGVtZW50cyBOb3VpRm9ybWF0dGVyIHtcclxuICB0byh2YWx1ZTogYW55KTogYW55IHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICB9O1xyXG5cclxuICBmcm9tKHZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdWlzbGlkZXInLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MubmcyLW5vdWlzbGlkZXJdJzogJ3RydWUnXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogJzxkaXY+PC9kaXY+JyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm91aXNsaWRlckNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm91aXNsaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgc2xpZGVyOiBhbnk7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBiZWhhdmlvdXI6IHN0cmluZztcclxuICBASW5wdXQoKSBwcml2YXRlIGNvbm5lY3Q6IGJvb2xlYW5bXTtcclxuICBASW5wdXQoKSBwcml2YXRlIGxpbWl0OiBudW1iZXI7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBtaW46IG51bWJlcjtcclxuICBASW5wdXQoKSBwcml2YXRlIG1heDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgc3RlcDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgZm9ybWF0OiBOb3VpRm9ybWF0dGVyO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgY29uZmlnOiBhbnkgPSB7fTtcclxuICBASW5wdXQoKSBwcml2YXRlIG5nTW9kZWw6IG51bWJlciB8IG51bWJlcltdO1xyXG4gIEBPdXRwdXQoKSBwcml2YXRlIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xyXG4gIEBPdXRwdXQoKSBwcml2YXRlIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xyXG4gIEBPdXRwdXQoKSBwcml2YXRlIHNsaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XHJcbiAgQE91dHB1dCgpIHByaXZhdGUgc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XHJcbiAgQE91dHB1dCgpIHByaXZhdGUgc3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcclxuICBAT3V0cHV0KCkgcHJpdmF0ZSBlbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcclxuICBwcml2YXRlIHZhbHVlOiBhbnk7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG4gIHByaXZhdGUgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGxldCBpbnB1dHNDb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgYmVoYXZpb3VyOiB0aGlzLmJlaGF2aW91cixcclxuICAgICAgY29ubmVjdDogdGhpcy5jb25uZWN0LFxyXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcclxuICAgICAgc3RhcnQ6IHRoaXMubmdNb2RlbCxcclxuICAgICAgc3RlcDogdGhpcy5zdGVwLFxyXG4gICAgICByYW5nZTogdGhpcy5jb25maWcucmFuZ2UgfHwgeyBtaW46IHRoaXMubWluLCBtYXg6IHRoaXMubWF4IH1cclxuICAgIH0pKTtcclxuXHJcbiAgICBpbnB1dHNDb25maWcuZm9ybWF0ID0gdGhpcy5mb3JtYXQgfHwgdGhpcy5jb25maWcuZm9ybWF0IHx8IG5ldyBEZWZhdWx0Rm9ybWF0dGVyKCk7XHJcblxyXG4gICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLFxyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBpbnB1dHNDb25maWcpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLm9uKCdzZXQnLCAodmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICBsZXQgdiA9IHRvVmFsdWUodmFsdWUpO1xyXG4gICAgICBpZiAodGhpcy52YWx1ZSA9PSB2IHx8IFN0cmluZyh0aGlzLnZhbHVlKSA9PSBTdHJpbmcodikpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuc2V0LmVtaXQodik7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnZhbHVlID0gdjtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLm9uKCd1cGRhdGUnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlLmVtaXQodGhpcy52YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNsaWRlci5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zbGlkZXIub24oJ3NsaWRlJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnNsaWRlLmVtaXQodGhpcy52YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNsaWRlci5vbignc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhcnQuZW1pdCh0aGlzLnZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2xpZGVyLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZW5kLmVtaXQodGhpcy52YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2xpZGVyKSB7XHJcbiAgICAgIHRoaXMuc2xpZGVyLnNldCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW10sXHJcbiAgZXhwb3J0czogW05vdWlzbGlkZXJDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW05vdWlzbGlkZXJDb21wb25lbnRdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm91aXNsaWRlck1vZHVsZSB7IH1cclxuIl19