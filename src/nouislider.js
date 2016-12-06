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
            start: this.ngModel || this.formControl.value,
            step: this.step,
            pageSteps: this.pageSteps,
            keyboard: this.keyboard,
            onKeydown: this.onKeydown,
            range: this.config.range || { min: this.min, max: this.max },
            tooltips: this.tooltips,
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
        __metadata('design:type', Boolean)
    ], NouisliderComponent.prototype, "disabled", void 0);
    __decorate([
        // tslint:disable-line
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
        __metadata('design:type', forms_1.FormControl)
    ], NouisliderComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], NouisliderComponent.prototype, "tooltips", void 0);
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
            template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91aXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdWlzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLHFCQVNPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHNCQUlPLGdCQUFnQixDQUFDLENBQUE7QUFFeEIsaUJBQXdCLEtBQWU7SUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0FBQ0gsQ0FBQztBQVJlLGVBQU8sVUFRdEIsQ0FBQTtBQU9EO0lBQUE7SUFRQSxDQUFDO0lBUEMsNkJBQUUsR0FBRixVQUFHLEtBQVU7UUFDWCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7O0lBRUQsK0JBQUksR0FBSixVQUFLLEtBQVU7UUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLHdCQUFnQixtQkFRNUIsQ0FBQTtBQXVCRDtJQTZCRSw2QkFBb0IsRUFBYztRQTdCcEMsaUJBZ0tDO1FBbklxQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBaEJqQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBTWhCLFdBQU0sR0FBc0IsSUFBSSxtQkFB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REFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztzREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztvREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztzREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztvREFBQTtJQTdDWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixJQUFJLEVBQUU7Z0JBQ0osd0JBQXdCLEVBQUUsTUFBTTthQUNqQztZQUNELFFBQVEsRUFBRSwyREFBMkQ7WUFDckUsTUFBTSxFQUFFLENBQUMsc0dBTVIsQ0FBQztZQUNGLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUseUJBQWlCO29CQUMxQixXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUM7b0JBQ2xELEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDOzsyQkFBQTtJQWlLRiwwQkFBQztBQUFELENBQUMsQUFoS0QsSUFnS0M7QUFoS1ksMkJBQW1CLHNCQWdLL0IsQ0FBQTtBQVFEO0lBQUE7SUFBZ0MsQ0FBQztJQUxqQztRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDOUIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7U0FDcEMsQ0FBQzs7d0JBQUE7SUFDOEIsdUJBQUM7QUFBRCxDQUFDLEFBQWpDLElBQWlDO0FBQXBCLHdCQUFnQixtQkFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9VaVNsaWRlciBmcm9tICdub3Vpc2xpZGVyJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9WYWx1ZSh2YWx1ZTogc3RyaW5nW10pOiBhbnkgfCBhbnlbXSB7XG4gIGlmICh2YWx1ZS5sZW5ndGggPT0gMSkge1xuICAgIHJldHVybiB2YWx1ZVswXTtcbiAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm91aUZvcm1hdHRlciB7XG4gIHRvKHZhbHVlOiBhbnkpOiBhbnk7XG4gIGZyb20odmFsdWU6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRGb3JtYXR0ZXIgaW1wbGVtZW50cyBOb3VpRm9ybWF0dGVyIHtcbiAgdG8odmFsdWU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICB9O1xuXG4gIGZyb20odmFsdWU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm91aXNsaWRlcicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm5nMi1ub3Vpc2xpZGVyXSc6ICd0cnVlJ1xuICB9LFxuICB0ZW1wbGF0ZTogJzxkaXYgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWQgPyB0cnVlIDogdW5kZWZpbmVkXCI+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgfVxuICBgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3Vpc2xpZGVyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5vdWlzbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcblxuICBwdWJsaWMgc2xpZGVyOiBhbnk7XG4gIHB1YmxpYyBoYW5kbGVzOiBhbnlbXTtcbiAgQElucHV0KCkgcHJpdmF0ZSBkaXNhYmxlZDogYm9vbGVhbjsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICBASW5wdXQoKSBwcml2YXRlIGJlaGF2aW91cjogc3RyaW5nO1xuICBASW5wdXQoKSBwcml2YXRlIGNvbm5lY3Q6IGJvb2xlYW5bXTtcbiAgQElucHV0KCkgcHJpdmF0ZSBsaW1pdDogbnVtYmVyO1xuICBASW5wdXQoKSBwcml2YXRlIG1pbjogbnVtYmVyO1xuICBASW5wdXQoKSBwcml2YXRlIG1heDogbnVtYmVyO1xuICBASW5wdXQoKSBwcml2YXRlIHN0ZXA6IG51bWJlcjtcbiAgQElucHV0KCkgcHJpdmF0ZSBmb3JtYXQ6IE5vdWlGb3JtYXR0ZXI7XG4gIEBJbnB1dCgpIHByaXZhdGUgcGFnZVN0ZXBzOiBudW1iZXI7XG4gIEBJbnB1dCgpIHByaXZhdGUgY29uZmlnOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgcHJpdmF0ZSBuZ01vZGVsOiBudW1iZXIgfCBudW1iZXJbXTtcbiAgQElucHV0KCkgcHJpdmF0ZSBrZXlib2FyZDogYm9vbGVhbjtcbiAgQElucHV0KCkgcHJpdmF0ZSBvbktleWRvd246IGFueTtcbiAgQElucHV0KCkgcHJpdmF0ZSBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gIEBJbnB1dCgpIHByaXZhdGUgdG9vbHRpcHM6IEFycmF5PGFueT47XG4gIEBPdXRwdXQoKSBwcml2YXRlIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHJpdmF0ZSB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIHByaXZhdGUgc2xpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIHByaXZhdGUgc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwcml2YXRlIHN0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwcml2YXRlIGVuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBwcml2YXRlIHZhbHVlOiBhbnk7XG4gIHByaXZhdGUgb25DaGFuZ2U6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQ6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBsZXQgaW5wdXRzQ29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7XG4gICAgICBiZWhhdmlvdXI6IHRoaXMuYmVoYXZpb3VyLFxuICAgICAgY29ubmVjdDogdGhpcy5jb25uZWN0LFxuICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICBzdGFydDogdGhpcy5uZ01vZGVsIHx8IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUsXG4gICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICBwYWdlU3RlcHM6IHRoaXMucGFnZVN0ZXBzLFxuICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICBvbktleWRvd246IHRoaXMub25LZXlkb3duLFxuICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLnJhbmdlIHx8IHttaW46IHRoaXMubWluLCBtYXg6IHRoaXMubWF4fSxcbiAgICAgIHRvb2x0aXBzOiB0aGlzLnRvb2x0aXBzLFxuICAgIH0pKTtcblxuICAgIGlucHV0c0NvbmZpZy5mb3JtYXQgPSB0aGlzLmZvcm1hdCB8fCB0aGlzLmNvbmZpZy5mb3JtYXQgfHwgbmV3IERlZmF1bHRGb3JtYXR0ZXIoKTtcblxuICAgIHRoaXMuc2xpZGVyID0gbm9VaVNsaWRlci5jcmVhdGUoXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JyksXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBpbnB1dHNDb25maWcpXG4gICAgKTtcblxuICAgIHRoaXMuaGFuZGxlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub1VpLWhhbmRsZScpKTtcblxuICAgIGlmKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICBpZih0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPSAxMDtcbiAgICAgIH1cbiAgICAgIGZvcihsZXQgaGFuZGxlIG9mIHRoaXMuaGFuZGxlcykge1xuICAgICAgICBoYW5kbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5vbktleWRvd24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5kZWZhdWx0S2V5SGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmNvbmZpZy5vbktleWRvd24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXIub24oJ3NldCcsICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICBsZXQgdiA9IHRvVmFsdWUodmFsdWUpO1xuICAgICAgaWYgKHRoaXMudmFsdWUgPT0gdiB8fCBTdHJpbmcodGhpcy52YWx1ZSkgPT0gU3RyaW5nKHYpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXQuZW1pdCh2KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3VwZGF0ZScsICh2YWx1ZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZS5lbWl0KHRvVmFsdWUodmFsdWVzKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignY2hhbmdlJywgKHZhbHVlczogc3RyaW5nW10pID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodG9WYWx1ZSh2YWx1ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uKCdzbGlkZScsICh2YWx1ZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICB0aGlzLnNsaWRlLmVtaXQodG9WYWx1ZSh2YWx1ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uKCdzdGFydCcsICh2YWx1ZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0LmVtaXQodG9WYWx1ZSh2YWx1ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uKCdlbmQnLCAodmFsdWVzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgdGhpcy5lbmQuZW1pdCh0b1ZhbHVlKHZhbHVlcykpO1xuICAgIH0pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2xpZGVyKSB7XG4gICAgICB0aGlzLnNsaWRlci5zZXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgZGVmYXVsdEtleUhhbmRsZXIgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGxldCBzdGVwU2l6ZTogYW55W10gPSB0aGlzLnNsaWRlci5zdGVwcygpO1xuICAgIGxldCBpbmRleCA9IHBhcnNlSW50KCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLmdldEF0dHJpYnV0ZSgnZGF0YS1oYW5kbGUnKSk7XG4gICAgbGV0IHNpZ24gPSAxO1xuICAgIGxldCBtdWx0aXBsaWVyOiBudW1iZXIgPSAxO1xuICAgIGxldCBzdGVwID0gMDtcbiAgICBsZXQgZGVsdGEgPSAwO1xuXG4gICAgc3dpdGNoICggZS53aGljaCApIHtcbiAgICAgIGNhc2UgMzQ6ICAvLyBQYWdlRG93blxuICAgICAgICBtdWx0aXBsaWVyID0gdGhpcy5jb25maWcucGFnZVN0ZXBzO1xuICAgICAgY2FzZSA0MDogIC8vIEFycm93RG93blxuICAgICAgY2FzZSAzNzogIC8vIEFycm93TGVmdFxuICAgICAgICBzaWduID0gLTE7XG4gICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMF07XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzM6ICAvLyBQYWdlVXBcbiAgICAgICAgbXVsdGlwbGllciA9IHRoaXMuY29uZmlnLnBhZ2VTdGVwcztcbiAgICAgIGNhc2UgMzg6ICAvLyBBcnJvd1VwXG4gICAgICBjYXNlIDM5OiAgLy8gQXJyb3dSaWdodFxuICAgICAgICBzdGVwID0gc3RlcFNpemVbaW5kZXhdWzFdO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWx0YSA9IHNpZ24gKiBtdWx0aXBsaWVyICogc3RlcDtcbiAgICBsZXQgbmV3VmFsdWU6IG51bWJlciB8IG51bWJlcltdO1xuXG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSkge1xuICAgICAgbmV3VmFsdWUgPSBbXS5jb25jYXQodGhpcy52YWx1ZSk7XG4gICAgICBuZXdWYWx1ZVtpbmRleF0gPSB0aGlzLmNvbmZpZy5mb3JtYXQudG8ocGFyc2VGbG9hdCh0aGlzLmNvbmZpZy5mb3JtYXQuZnJvbShuZXdWYWx1ZVtpbmRleF0pKSArIGRlbHRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VmFsdWUgPSB0aGlzLmNvbmZpZy5mb3JtYXQudG8ocGFyc2VGbG9hdCh0aGlzLmNvbmZpZy5mb3JtYXQuZnJvbSh0aGlzLnZhbHVlKSkgKyBkZWx0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXIuc2V0KG5ld1ZhbHVlKTtcbiAgfVxufVxuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbTm91aXNsaWRlckNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW05vdWlzbGlkZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyTW9kdWxlIHsgfVxuIl19