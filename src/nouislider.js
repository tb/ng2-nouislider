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
        var _this = this;
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
        this.defaultKeyHandler = function (e) {
            var stepSize = _this.slider.steps();
            var index = parseInt(e.target.getAttribute('data-handle'));
            var sign = 1;
            var multiplier = 1;
            var step = 0;
            var delta = 0;
            switch (e.which) {
                case 34:
                    multiplier = _this.config.pageSteps;
                case 40: // ArrowDown
                case 37:
                    sign = -1;
                    step = stepSize[index][0];
                    e.preventDefault();
                    break;
                case 33:
                    multiplier = _this.config.pageSteps;
                case 38: // ArrowUp
                case 39:
                    step = stepSize[index][1];
                    e.preventDefault();
                    break;
                default:
                    break;
            }
            delta = sign * multiplier * step;
            var newValue;
            if (Array.isArray(_this.value)) {
                newValue = [].concat(_this.value);
                newValue[index] = _this.config.format.to(parseFloat(_this.config.format.from(newValue[index])) + delta);
            }
            else {
                newValue = _this.config.format.to(parseFloat(_this.config.format.from(_this.value)) + delta);
            }
            _this.slider.set(newValue);
        };
    }
    NouisliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var inputsConfig = JSON.parse(JSON.stringify({
            behaviour: this.behaviour,
            connect: this.connect,
            limit: this.limit,
            start: this.ngModel || this.formControl,
            step: this.step,
            pageSteps: this.pageSteps,
            keyboard: this.keyboard,
            onKeydown: this.onKeydown,
            range: this.config.range || { min: this.min, max: this.max }
        }));
        inputsConfig.format = this.format || this.config.format || new DefaultFormatter();
        this.slider = noUiSlider.create(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
        this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));
        if (this.config.keyboard) {
            if (this.config.pageSteps === undefined) {
                this.config.pageSteps = 10;
            }
            var _loop_1 = function(handle) {
                handle.setAttribute('tabindex', 0);
                handle.addEventListener('click', function () {
                    handle.focus();
                });
                if (this_1.config.onKeydown === undefined) {
                    handle.addEventListener('keydown', this_1.defaultKeyHandler);
                }
                else {
                    handle.addEventListener('keydown', this_1.config.onKeydown);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.handles; _i < _a.length; _i++) {
                var handle = _a[_i];
                _loop_1(handle);
            }
        }
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
        this.slider.on('update', function (values) {
            _this.update.emit(toValue(values));
        });
        this.slider.on('change', function (values) {
            _this.change.emit(toValue(values));
        });
        this.slider.on('slide', function (values) {
            _this.slide.emit(toValue(values));
        });
        this.slider.on('start', function (values) {
            _this.start.emit(toValue(values));
        });
        this.slider.on('end', function (values) {
            _this.end.emit(toValue(values));
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
        __metadata('design:type', Number)
    ], NouisliderComponent.prototype, "pageSteps", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NouisliderComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NouisliderComponent.prototype, "ngModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NouisliderComponent.prototype, "keyboard", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NouisliderComponent.prototype, "onKeydown", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NouisliderComponent.prototype, "formControl", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91aXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdWlzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLHFCQVNPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHNCQUdPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsaUJBQXdCLEtBQWU7SUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0FBQ0gsQ0FBQztBQVJlLGVBQU8sVUFRdEIsQ0FBQTtBQU9EO0lBQUE7SUFRQSxDQUFDO0lBUEMsNkJBQUUsR0FBRixVQUFHLEtBQVU7UUFDWCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7O0lBRUQsK0JBQUksR0FBSixVQUFLLEtBQVU7UUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLHdCQUFnQixtQkFRNUIsQ0FBQTtBQXVCRDtJQTJCRSw2QkFBb0IsRUFBYztRQTNCcEMsaUJBNkpDO1FBbElxQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBZmpCLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFLaEIsV0FBTSxHQUFzQixJQUFJLG1CQUFZ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QUE7SUEzQ1g7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFO2dCQUNKLHdCQUF3QixFQUFFLE1BQU07YUFDakM7WUFDRCxRQUFRLEVBQUUsYUFBYTtZQUN2QixNQUFNLEVBQUUsQ0FBQyxzR0FNUixDQUFDO1lBQ0YsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx5QkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQztvQkFDbEQsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7OzJCQUFBO0lBOEpGLDBCQUFDO0FBQUQsQ0FBQyxBQTdKRCxJQTZKQztBQTdKWSwyQkFBbUIsc0JBNkovQixDQUFBO0FBUUQ7SUFBQTtJQUFnQyxDQUFDO0lBTGpDO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUM5QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztTQUNwQyxDQUFDOzt3QkFBQTtJQUM4Qix1QkFBQztBQUFELENBQUMsQUFBakMsSUFBaUM7QUFBcEIsd0JBQWdCLG1CQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBub1VpU2xpZGVyIGZyb20gJ25vdWlzbGlkZXInO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgTmdNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvVmFsdWUodmFsdWU6IHN0cmluZ1tdKTogYW55IHwgYW55W10ge1xuICBpZiAodmFsdWUubGVuZ3RoID09IDEpIHtcbiAgICByZXR1cm4gdmFsdWVbMF07XG4gIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdWlGb3JtYXR0ZXIge1xuICB0byh2YWx1ZTogYW55KTogYW55O1xuICBmcm9tKHZhbHVlOiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0Rm9ybWF0dGVyIGltcGxlbWVudHMgTm91aUZvcm1hdHRlciB7XG4gIHRvKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgfTtcblxuICBmcm9tKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKS50b0ZpeGVkKDIpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdWlzbGlkZXInLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uZzItbm91aXNsaWRlcl0nOiAndHJ1ZSdcbiAgfSxcbiAgdGVtcGxhdGU6ICc8ZGl2PjwvZGl2PicsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgIH1cbiAgYF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm91aXNsaWRlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG5cbiAgcHVibGljIHNsaWRlcjogYW55O1xuICBwdWJsaWMgaGFuZGxlczogYW55W107XG4gIEBJbnB1dCgpIHByaXZhdGUgYmVoYXZpb3VyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByaXZhdGUgY29ubmVjdDogYm9vbGVhbltdO1xuICBASW5wdXQoKSBwcml2YXRlIGxpbWl0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHByaXZhdGUgbWluOiBudW1iZXI7XG4gIEBJbnB1dCgpIHByaXZhdGUgbWF4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHByaXZhdGUgc3RlcDogbnVtYmVyO1xuICBASW5wdXQoKSBwcml2YXRlIGZvcm1hdDogTm91aUZvcm1hdHRlcjtcbiAgQElucHV0KCkgcHJpdmF0ZSBwYWdlU3RlcHM6IG51bWJlcjtcbiAgQElucHV0KCkgcHJpdmF0ZSBjb25maWc6IGFueSA9IHt9O1xuICBASW5wdXQoKSBwcml2YXRlIG5nTW9kZWw6IG51bWJlciB8IG51bWJlcltdO1xuICBASW5wdXQoKSBwcml2YXRlIGtleWJvYXJkOiBib29sZWFuO1xuICBASW5wdXQoKSBwcml2YXRlIG9uS2V5ZG93bjogYW55O1xuICBASW5wdXQoKSBwcml2YXRlIGZvcm1Db250cm9sOiBudW1iZXIgfCBudW1iZXJbXTtcbiAgQE91dHB1dCgpIHByaXZhdGUgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwcml2YXRlIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHJpdmF0ZSBzbGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHJpdmF0ZSBzZXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIHByaXZhdGUgc3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIHByaXZhdGUgZW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIHByaXZhdGUgdmFsdWU6IGFueTtcbiAgcHJpdmF0ZSBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGxldCBpbnB1dHNDb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGJlaGF2aW91cjogdGhpcy5iZWhhdmlvdXIsXG4gICAgICBjb25uZWN0OiB0aGlzLmNvbm5lY3QsXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgIHN0YXJ0OiB0aGlzLm5nTW9kZWwgfHwgdGhpcy5mb3JtQ29udHJvbCxcbiAgICAgIHN0ZXA6IHRoaXMuc3RlcCxcbiAgICAgIHBhZ2VTdGVwczogdGhpcy5wYWdlU3RlcHMsXG4gICAgICBrZXlib2FyZDogdGhpcy5rZXlib2FyZCxcbiAgICAgIG9uS2V5ZG93bjogdGhpcy5vbktleWRvd24sXG4gICAgICByYW5nZTogdGhpcy5jb25maWcucmFuZ2UgfHwge21pbjogdGhpcy5taW4sIG1heDogdGhpcy5tYXh9XG4gICAgfSkpO1xuXG4gICAgaW5wdXRzQ29uZmlnLmZvcm1hdCA9IHRoaXMuZm9ybWF0IHx8IHRoaXMuY29uZmlnLmZvcm1hdCB8fCBuZXcgRGVmYXVsdEZvcm1hdHRlcigpO1xuXG4gICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKSxcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGlucHV0c0NvbmZpZylcbiAgICApO1xuXG4gICAgdGhpcy5oYW5kbGVzID0gW10uc2xpY2UuY2FsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vVWktaGFuZGxlJykpO1xuXG4gICAgaWYodGhpcy5jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgIGlmKHRoaXMuY29uZmlnLnBhZ2VTdGVwcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnBhZ2VTdGVwcyA9IDEwO1xuICAgICAgfVxuICAgICAgZm9yKGxldCBoYW5kbGUgb2YgdGhpcy5oYW5kbGVzKSB7XG4gICAgICAgIGhhbmRsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGUuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnLm9uS2V5ZG93biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmRlZmF1bHRLZXlIYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuY29uZmlnLm9uS2V5ZG93bik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlci5vbignc2V0JywgKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIGxldCB2ID0gdG9WYWx1ZSh2YWx1ZSk7XG4gICAgICBpZiAodGhpcy52YWx1ZSA9PSB2IHx8IFN0cmluZyh0aGlzLnZhbHVlKSA9PSBTdHJpbmcodikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldC5lbWl0KHYpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbigndXBkYXRlJywgKHZhbHVlczogc3RyaW5nW10pID0+IHtcbiAgICAgIHRoaXMudXBkYXRlLmVtaXQodG9WYWx1ZSh2YWx1ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uKCdjaGFuZ2UnLCAodmFsdWVzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0b1ZhbHVlKHZhbHVlcykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3NsaWRlJywgKHZhbHVlczogc3RyaW5nW10pID0+IHtcbiAgICAgIHRoaXMuc2xpZGUuZW1pdCh0b1ZhbHVlKHZhbHVlcykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3N0YXJ0JywgKHZhbHVlczogc3RyaW5nW10pID0+IHtcbiAgICAgIHRoaXMuc3RhcnQuZW1pdCh0b1ZhbHVlKHZhbHVlcykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ2VuZCcsICh2YWx1ZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICB0aGlzLmVuZC5lbWl0KHRvVmFsdWUodmFsdWVzKSk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zbGlkZXIpIHtcbiAgICAgIHRoaXMuc2xpZGVyLnNldCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0S2V5SGFuZGxlciA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgbGV0IHN0ZXBTaXplOiBhbnlbXSA9IHRoaXMuc2xpZGVyLnN0ZXBzKCk7XG4gICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoKDxIVE1MRWxlbWVudD5lLnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLWhhbmRsZScpKTtcbiAgICBsZXQgc2lnbiA9IDE7XG4gICAgbGV0IG11bHRpcGxpZXI6IG51bWJlciA9IDE7XG4gICAgbGV0IHN0ZXAgPSAwO1xuICAgIGxldCBkZWx0YSA9IDA7XG5cbiAgICBzd2l0Y2ggKCBlLndoaWNoICkge1xuICAgICAgY2FzZSAzNDogIC8vIFBhZ2VEb3duXG4gICAgICAgIG11bHRpcGxpZXIgPSB0aGlzLmNvbmZpZy5wYWdlU3RlcHM7XG4gICAgICBjYXNlIDQwOiAgLy8gQXJyb3dEb3duXG4gICAgICBjYXNlIDM3OiAgLy8gQXJyb3dMZWZ0XG4gICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgc3RlcCA9IHN0ZXBTaXplW2luZGV4XVswXTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMzogIC8vIFBhZ2VVcFxuICAgICAgICBtdWx0aXBsaWVyID0gdGhpcy5jb25maWcucGFnZVN0ZXBzO1xuICAgICAgY2FzZSAzODogIC8vIEFycm93VXBcbiAgICAgIGNhc2UgMzk6ICAvLyBBcnJvd1JpZ2h0XG4gICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMV07XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRlbHRhID0gc2lnbiAqIG11bHRpcGxpZXIgKiBzdGVwO1xuICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyIHwgbnVtYmVyW107XG5cbiAgICBpZihBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpKSB7XG4gICAgICBuZXdWYWx1ZSA9IFtdLmNvbmNhdCh0aGlzLnZhbHVlKTtcbiAgICAgIG5ld1ZhbHVlW2luZGV4XSA9IHRoaXMuY29uZmlnLmZvcm1hdC50byhwYXJzZUZsb2F0KHRoaXMuY29uZmlnLmZvcm1hdC5mcm9tKG5ld1ZhbHVlW2luZGV4XSkpICsgZGVsdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMuY29uZmlnLmZvcm1hdC50byhwYXJzZUZsb2F0KHRoaXMuY29uZmlnLmZvcm1hdC5mcm9tKHRoaXMudmFsdWUpKSArIGRlbHRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlci5zZXQobmV3VmFsdWUpO1xuICB9XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtOb3Vpc2xpZGVyQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbTm91aXNsaWRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdWlzbGlkZXJNb2R1bGUgeyB9XG4iXX0=