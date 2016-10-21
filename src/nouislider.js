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
        return parseFloat(value[0]);
    }
    else if (value.length > 1) {
        return value.map(parseFloat);
    }
    else {
        return 0;
    }
}
exports.toValue = toValue;
var NOUISLIDER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Nouislider; }),
    multi: true
};
var Nouislider = (function () {
    function Nouislider(el) {
        this.el = el;
        this.config = {};
        this.ngModelChange = new core_1.EventEmitter(true);
        this.change = new core_1.EventEmitter(true);
        this.update = new core_1.EventEmitter(true);
        this.slide = new core_1.EventEmitter(true);
        this.set = new core_1.EventEmitter(true);
        this.start = new core_1.EventEmitter(true);
        this.end = new core_1.EventEmitter(true);
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.change = this.ngModelChange;
    }
    Nouislider.prototype.ngOnInit = function () {
        var _this = this;
        var inputsConfig = JSON.parse(JSON.stringify({
            behaviour: this.behaviour,
            connect: this.connect,
            limit: this.limit,
            start: this.ngModel,
            step: this.step,
            range: this.config.range || { min: this.min, max: this.max }
        }));
        this.slider = noUiSlider.create(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
        this.slider.on('set', function (value) {
            _this.writeValue(toValue(value));
            _this.set.emit(_this.value);
        });
        this.slider.on('update', function () {
            _this.update.emit(_this.value);
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
    Nouislider.prototype.writeValue = function (value) {
        if (this.value == value || String(this.value) == String(value)) {
            return;
        }
        // avoid triggering change event on slider initialization
        if (this.value !== undefined) {
            this.ngModelChange.emit(value);
        }
        this.value = value;
        if (this.slider) {
            this.slider.set(value);
        }
    };
    Nouislider.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    Nouislider.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Nouislider.prototype, "behaviour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Nouislider.prototype, "connect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Nouislider.prototype, "limit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Nouislider.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Nouislider.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Nouislider.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Nouislider.prototype, "config", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Nouislider.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Nouislider.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Nouislider.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Nouislider.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Nouislider.prototype, "slide", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Nouislider.prototype, "set", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Nouislider.prototype, "start", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Nouislider.prototype, "end", void 0);
    Nouislider = __decorate([
        core_1.Component({
            selector: 'nouislider',
            host: { '[class.ng2-nouislider]': 'true' },
            template: '<div></div>',
            styles: ["\n    :host {\n      display: block;\n      margin-top: 1rem;\n      margin-bottom: 1rem;\n    }\n  "],
            providers: [NOUISLIDER_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Nouislider);
    return Nouislider;
}());
exports.Nouislider = Nouislider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91aXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdWlzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLHFCQVFPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHNCQUdPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsaUJBQXdCLEtBQWU7SUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7QUFDSCxDQUFDO0FBUmUsZUFBTyxVQVF0QixDQUFBO0FBRUQsSUFBTSxpQ0FBaUMsR0FBUTtJQUM3QyxPQUFPLEVBQUUseUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxVQUFVLEVBQVYsQ0FBVSxDQUFDO0lBQ3pDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQWVGO0lBcUJFLG9CQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWJqQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBRWhCLGtCQUFhLEdBQXNCLElBQUksbUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxXQUFNLEdBQXNCLElBQUksbUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxXQUFNLEdBQXNCLElBQUksbUJBQVks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WUFDMUMsUUFBUSxFQUFFLGFBQWE7WUFDdkIsTUFBTSxFQUFFLENBQUMsc0dBTVIsQ0FBQztZQUNGLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQy9DLENBQUM7O2tCQUFBO0lBdUZGLGlCQUFDO0FBQUQsQ0FBQyxBQXRGRCxJQXNGQztBQXRGWSxrQkFBVSxhQXNGdEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG5vVWlTbGlkZXIgZnJvbSAnbm91aXNsaWRlcic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvVmFsdWUodmFsdWU6IHN0cmluZ1tdKTogbnVtYmVyfG51bWJlcltdIHtcbiAgaWYgKHZhbHVlLmxlbmd0aCA9PSAxKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWVbMF0pO1xuICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKHBhcnNlRmxvYXQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbmNvbnN0IE5PVUlTTElERVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm91aXNsaWRlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3Vpc2xpZGVyJyxcbiAgaG9zdDogeyAnW2NsYXNzLm5nMi1ub3Vpc2xpZGVyXSc6ICd0cnVlJyB9LFxuICB0ZW1wbGF0ZTogJzxkaXY+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgfVxuICBgXSxcbiAgcHJvdmlkZXJzOiBbTk9VSVNMSURFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIHB1YmxpYyBzbGlkZXI6IGFueTtcbiAgQElucHV0KCkgcHJpdmF0ZSBiZWhhdmlvdXI6IHN0cmluZztcbiAgQElucHV0KCkgcHJpdmF0ZSBjb25uZWN0OiBib29sZWFuW107XG4gIEBJbnB1dCgpIHByaXZhdGUgbGltaXQ6IG51bWJlcjtcbiAgQElucHV0KCkgcHJpdmF0ZSBtaW46IG51bWJlcjtcbiAgQElucHV0KCkgcHJpdmF0ZSBtYXg6IG51bWJlcjtcbiAgQElucHV0KCkgcHJpdmF0ZSBzdGVwOiBudW1iZXI7XG4gIEBJbnB1dCgpIHByaXZhdGUgY29uZmlnOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgcHJpdmF0ZSBuZ01vZGVsOiBudW1iZXIgfCBudW1iZXJbXTtcbiAgQE91dHB1dCgpIHByaXZhdGUgbmdNb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHJpdmF0ZSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIHByaXZhdGUgdXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwcml2YXRlIHNsaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwcml2YXRlIHNldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHJpdmF0ZSBzdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHJpdmF0ZSBlbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgcHJpdmF0ZSB2YWx1ZTogYW55O1xuICBwcml2YXRlIG9uQ2hhbmdlOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHByaXZhdGUgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuY2hhbmdlID0gdGhpcy5uZ01vZGVsQ2hhbmdlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgbGV0IGlucHV0c0NvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYmVoYXZpb3VyOiB0aGlzLmJlaGF2aW91cixcbiAgICAgIGNvbm5lY3Q6IHRoaXMuY29ubmVjdCxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgc3RhcnQ6IHRoaXMubmdNb2RlbCxcbiAgICAgIHN0ZXA6IHRoaXMuc3RlcCxcbiAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5yYW5nZSB8fCB7bWluOiB0aGlzLm1pbiwgbWF4OiB0aGlzLm1heH1cbiAgICB9KSk7XG5cbiAgICB0aGlzLnNsaWRlciA9IG5vVWlTbGlkZXIuY3JlYXRlKFxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLFxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgaW5wdXRzQ29uZmlnKVxuICAgICk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignc2V0JywgKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0b1ZhbHVlKHZhbHVlKSk7XG4gICAgICB0aGlzLnNldC5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignc2xpZGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNsaWRlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignc3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0LmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignZW5kJywgKCkgPT4ge1xuICAgICAgdGhpcy5lbmQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbHVlID09IHZhbHVlIHx8IFN0cmluZyh0aGlzLnZhbHVlKSA9PSBTdHJpbmcodmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYXZvaWQgdHJpZ2dlcmluZyBjaGFuZ2UgZXZlbnQgb24gc2xpZGVyIGluaXRpYWxpemF0aW9uXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLnNsaWRlcikge1xuICAgICAgdGhpcy5zbGlkZXIuc2V0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==