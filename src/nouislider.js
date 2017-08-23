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
var noUiSlider = require("nouislider");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DefaultFormatter = (function () {
    function DefaultFormatter() {
    }
    DefaultFormatter.prototype.to = function (value) {
        // formatting with http://stackoverflow.com/a/26463364/478584
        return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    };
    ;
    DefaultFormatter.prototype.from = function (value) {
        return parseFloat(value);
    };
    return DefaultFormatter;
}());
exports.DefaultFormatter = DefaultFormatter;
var NouisliderComponent = NouisliderComponent_1 = (function () {
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
                newValue[index] = newValue[index] + delta;
            }
            else {
                newValue = _this.value + delta;
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
            start: this.formControl !== undefined ? this.formControl.value : this.ngModel,
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
            var _loop_1 = function (handle) {
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
        this.slider.on('set', function (values, handle, unencoded) {
            var v = _this.toValues(values);
            var emitEvents = false;
            if (_this.value === undefined) {
                _this.value = v;
                return;
            }
            if (Array.isArray(v) && _this.value[handle] != v[handle]) {
                emitEvents = true;
            }
            if (!Array.isArray(v) && _this.value != v) {
                emitEvents = true;
            }
            if (emitEvents) {
                _this.set.emit(v);
                _this.onChange(v);
            }
            if (Array.isArray(v)) {
                _this.value[handle] = v[handle];
            }
            else {
                _this.value = v;
            }
        });
        this.slider.on('update', function (values, handle, unencoded) {
            _this.update.emit(_this.toValues(values));
        });
        this.slider.on('change', function (values, handle, unencoded) {
            _this.change.emit(_this.toValues(values));
        });
        this.slider.on('slide', function (values, handle, unencoded) {
            _this.slide.emit(_this.toValues(values));
        });
        this.slider.on('start', function (values, handle, unencoded) {
            _this.start.emit(_this.toValues(values));
        });
        this.slider.on('end', function (values, handle, unencoded) {
            _this.end.emit(_this.toValues(values));
        });
    };
    NouisliderComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.slider && (changes.min || changes.max || changes.step)) {
            setTimeout(function () {
                _this.slider.updateOptions({
                    range: {
                        min: _this.min,
                        max: _this.max
                    },
                    step: _this.step
                });
            });
        }
    };
    NouisliderComponent.prototype.toValues = function (values) {
        var v = values.map(this.config.format.from);
        return (v.length == 1 ? v[0] : v);
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
    return NouisliderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NouisliderComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NouisliderComponent.prototype, "behaviour", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], NouisliderComponent.prototype, "connect", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NouisliderComponent.prototype, "limit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NouisliderComponent.prototype, "min", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NouisliderComponent.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NouisliderComponent.prototype, "step", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NouisliderComponent.prototype, "format", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NouisliderComponent.prototype, "pageSteps", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NouisliderComponent.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NouisliderComponent.prototype, "ngModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NouisliderComponent.prototype, "keyboard", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NouisliderComponent.prototype, "onKeydown", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], NouisliderComponent.prototype, "formControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], NouisliderComponent.prototype, "tooltips", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NouisliderComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NouisliderComponent.prototype, "update", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NouisliderComponent.prototype, "slide", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NouisliderComponent.prototype, "set", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NouisliderComponent.prototype, "start", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NouisliderComponent.prototype, "end", void 0);
NouisliderComponent = NouisliderComponent_1 = __decorate([
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
                useExisting: core_1.forwardRef(function () { return NouisliderComponent_1; }),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], NouisliderComponent);
exports.NouisliderComponent = NouisliderComponent;
var NouisliderModule = (function () {
    function NouisliderModule() {
    }
    return NouisliderModule;
}());
NouisliderModule = __decorate([
    core_1.NgModule({
        imports: [],
        exports: [NouisliderComponent],
        declarations: [NouisliderComponent],
    }),
    __metadata("design:paramtypes", [])
], NouisliderModule);
exports.NouisliderModule = NouisliderModule;
var NouisliderComponent_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91aXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdWlzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVDQUF5QztBQUN6QyxzQ0FVdUI7QUFDdkIsd0NBSXdCO0FBT3hCO0lBQUE7SUFTQSxDQUFDO0lBUkMsNkJBQUUsR0FBRixVQUFHLEtBQWE7UUFDZCw2REFBNkQ7UUFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUFBLENBQUM7SUFFRiwrQkFBSSxHQUFKLFVBQUssS0FBYTtRQUNoQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksNENBQWdCO0FBZ0M3QixJQUFhLG1CQUFtQjtJQTZCOUIsNkJBQW9CLEVBQWM7UUFBbEMsaUJBQXVDO1FBQW5CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFoQmxCLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFNaEIsV0FBTSxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsV0FBTSxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsVUFBSyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsUUFBRyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsVUFBSyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsUUFBRyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekQsYUFBUSxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDbkMsY0FB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a0RBQStCO0FBQ3pEO0lBQVQsYUFBTSxFQUFFOzhCQUFhLG1CQUFZO2dEQUErQjtBQUN2RDtJQUFULGFBQU0sRUFBRTs4QkFBZSxtQkFBWTtrREFBK0I7QUFDekQ7SUFBVCxhQUFNLEVBQUU7OEJBQWEsbUJBQVk7Z0RBQStCO0FBeEJ0RCxtQkFBbUI7SUFyQi9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtRQUN0QixJQUFJLEVBQUU7WUFDSix3QkFBd0IsRUFBRSxNQUFNO1NBQ2pDO1FBQ0QsUUFBUSxFQUFFLDJEQUEyRDtRQUNyRSxNQUFNLEVBQUUsQ0FBQyxzR0FNUixDQUFDO1FBQ0YsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLHlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLHFCQUFtQixFQUFuQixDQUFtQixDQUFDO2dCQUNsRCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7S0FDRixDQUFDO3FDQThCd0IsaUJBQVU7R0E3QnZCLG1CQUFtQixDQStML0I7QUEvTFksa0RBQW1CO0FBdU1oQyxJQUFhLGdCQUFnQjtJQUE3QjtJQUFnQyxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBQWpDLElBQWlDO0FBQXBCLGdCQUFnQjtJQUw1QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO1FBQzlCLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO0tBQ3BDLENBQUM7O0dBQ1csZ0JBQWdCLENBQUk7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9VaVNsaWRlciBmcm9tICdub3Vpc2xpZGVyJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgTmdNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIEZvcm1Db250cm9sLFxuICBOR19WQUxVRV9BQ0NFU1NPUlxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm91aUZvcm1hdHRlciB7XG4gIHRvKHZhbHVlOiBudW1iZXIpOiBzdHJpbmc7XG4gIGZyb20odmFsdWU6IHN0cmluZyk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRGb3JtYXR0ZXIgaW1wbGVtZW50cyBOb3VpRm9ybWF0dGVyIHtcbiAgdG8odmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgLy8gZm9ybWF0dGluZyB3aXRoIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NDYzMzY0LzQ3ODU4NFxuICAgIHJldHVybiBTdHJpbmcocGFyc2VGbG9hdChwYXJzZUZsb2F0KFN0cmluZyh2YWx1ZSkpLnRvRml4ZWQoMikpKTtcbiAgfTtcblxuICBmcm9tKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3Vpc2xpZGVyJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubmcyLW5vdWlzbGlkZXJdJzogJ3RydWUnXG4gIH0sXG4gIHRlbXBsYXRlOiAnPGRpdiBbYXR0ci5kaXNhYmxlZF09XCJkaXNhYmxlZCA/IHRydWUgOiB1bmRlZmluZWRcIj48L2Rpdj4nLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICB9XG4gIGBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdWlzbGlkZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTm91aXNsaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgcHVibGljIHNsaWRlcjogYW55O1xuICBwdWJsaWMgaGFuZGxlczogYW55W107XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICBASW5wdXQoKSBwdWJsaWMgYmVoYXZpb3VyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb25uZWN0OiBib29sZWFuW107XG4gIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgbWluOiBudW1iZXI7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIHN0ZXA6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIGZvcm1hdDogTm91aUZvcm1hdHRlcjtcbiAgQElucHV0KCkgcHVibGljIHBhZ2VTdGVwczogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgcHVibGljIG5nTW9kZWw6IG51bWJlciB8IG51bWJlcltdO1xuICBASW5wdXQoKSBwdWJsaWMga2V5Ym9hcmQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBvbktleWRvd246IGFueTtcbiAgQElucHV0KCkgcHVibGljIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgQElucHV0KCkgcHVibGljIHRvb2x0aXBzOiBBcnJheTxhbnk+O1xuICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHVibGljIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHVibGljIHNsaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgc3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBlbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgcHJpdmF0ZSB2YWx1ZTogYW55O1xuICBwcml2YXRlIG9uQ2hhbmdlOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHByaXZhdGUgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgbGV0IGlucHV0c0NvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYmVoYXZpb3VyOiB0aGlzLmJlaGF2aW91cixcbiAgICAgIGNvbm5lY3Q6IHRoaXMuY29ubmVjdCxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgc3RhcnQ6IHRoaXMuZm9ybUNvbnRyb2wgIT09IHVuZGVmaW5lZCA/IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgOiB0aGlzLm5nTW9kZWwsXG4gICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICBwYWdlU3RlcHM6IHRoaXMucGFnZVN0ZXBzLFxuICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICBvbktleWRvd246IHRoaXMub25LZXlkb3duLFxuICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLnJhbmdlIHx8IHttaW46IHRoaXMubWluLCBtYXg6IHRoaXMubWF4fSxcbiAgICAgIHRvb2x0aXBzOiB0aGlzLnRvb2x0aXBzLFxuICAgIH0pKTtcblxuICAgIGlucHV0c0NvbmZpZy5mb3JtYXQgPSB0aGlzLmZvcm1hdCB8fCB0aGlzLmNvbmZpZy5mb3JtYXQgfHwgbmV3IERlZmF1bHRGb3JtYXR0ZXIoKTtcblxuICAgIHRoaXMuc2xpZGVyID0gbm9VaVNsaWRlci5jcmVhdGUoXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JyksXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBpbnB1dHNDb25maWcpXG4gICAgKTtcblxuICAgIHRoaXMuaGFuZGxlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub1VpLWhhbmRsZScpKTtcblxuICAgIGlmKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICBpZih0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPSAxMDtcbiAgICAgIH1cbiAgICAgIGZvcihsZXQgaGFuZGxlIG9mIHRoaXMuaGFuZGxlcykge1xuICAgICAgICBoYW5kbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5vbktleWRvd24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5kZWZhdWx0S2V5SGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmNvbmZpZy5vbktleWRvd24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXIub24oJ3NldCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgbGV0IHYgPSB0aGlzLnRvVmFsdWVzKHZhbHVlcyk7XG4gICAgICBsZXQgZW1pdEV2ZW50cyA9IGZhbHNlO1xuICAgICAgaWYodGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZihBcnJheS5pc0FycmF5KHYpICYmIHRoaXMudmFsdWVbaGFuZGxlXSAhPSB2W2hhbmRsZV0pIHtcbiAgICAgICAgZW1pdEV2ZW50cyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZighQXJyYXkuaXNBcnJheSh2KSAmJiB0aGlzLnZhbHVlICE9IHYpIHtcbiAgICAgICAgZW1pdEV2ZW50cyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZihlbWl0RXZlbnRzKSB7XG4gICAgICAgIHRoaXMuc2V0LmVtaXQodik7XG4gICAgICAgIHRoaXMub25DaGFuZ2Uodik7XG4gICAgICB9XG4gICAgICBpZihBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICAgIHRoaXMudmFsdWVbaGFuZGxlXSA9IHZbaGFuZGxlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3VwZGF0ZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ2NoYW5nZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3NsaWRlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLnNsaWRlLmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uKCdzdGFydCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgdGhpcy5zdGFydC5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignZW5kJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLmVuZC5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICBpZiAodGhpcy5zbGlkZXIgJiYgKGNoYW5nZXMubWluIHx8IGNoYW5nZXMubWF4IHx8IGNoYW5nZXMuc3RlcCkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNsaWRlci51cGRhdGVPcHRpb25zKHtcbiAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgICAgICAgIG1heDogdGhpcy5tYXhcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0ZXA6IHRoaXMuc3RlcFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRvVmFsdWVzKHZhbHVlczogc3RyaW5nW10pOiBhbnkgfCBhbnlbXSB7XG4gICAgbGV0IHYgPSB2YWx1ZXMubWFwKHRoaXMuY29uZmlnLmZvcm1hdC5mcm9tKTtcbiAgICByZXR1cm4gKHYubGVuZ3RoID09IDEgPyB2WzBdIDogdik7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zbGlkZXIpIHtcbiAgICAgIHRoaXMuc2xpZGVyLnNldCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0S2V5SGFuZGxlciA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgbGV0IHN0ZXBTaXplOiBhbnlbXSA9IHRoaXMuc2xpZGVyLnN0ZXBzKCk7XG4gICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoKDxIVE1MRWxlbWVudD5lLnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLWhhbmRsZScpKTtcbiAgICBsZXQgc2lnbiA9IDE7XG4gICAgbGV0IG11bHRpcGxpZXI6IG51bWJlciA9IDE7XG4gICAgbGV0IHN0ZXAgPSAwO1xuICAgIGxldCBkZWx0YSA9IDA7XG5cbiAgICBzd2l0Y2ggKCBlLndoaWNoICkge1xuICAgICAgY2FzZSAzNDogIC8vIFBhZ2VEb3duXG4gICAgICAgIG11bHRpcGxpZXIgPSB0aGlzLmNvbmZpZy5wYWdlU3RlcHM7XG4gICAgICBjYXNlIDQwOiAgLy8gQXJyb3dEb3duXG4gICAgICBjYXNlIDM3OiAgLy8gQXJyb3dMZWZ0XG4gICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgc3RlcCA9IHN0ZXBTaXplW2luZGV4XVswXTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzMzogIC8vIFBhZ2VVcFxuICAgICAgICBtdWx0aXBsaWVyID0gdGhpcy5jb25maWcucGFnZVN0ZXBzO1xuICAgICAgY2FzZSAzODogIC8vIEFycm93VXBcbiAgICAgIGNhc2UgMzk6ICAvLyBBcnJvd1JpZ2h0XG4gICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMV07XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRlbHRhID0gc2lnbiAqIG11bHRpcGxpZXIgKiBzdGVwO1xuICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyIHwgbnVtYmVyW107XG5cbiAgICBpZihBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpKSB7XG4gICAgICBuZXdWYWx1ZSA9IFtdLmNvbmNhdCh0aGlzLnZhbHVlKTtcbiAgICAgIG5ld1ZhbHVlW2luZGV4XSA9IG5ld1ZhbHVlW2luZGV4XSArIGRlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWUgKyBkZWx0YTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlci5zZXQobmV3VmFsdWUpO1xuICB9XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGV4cG9ydHM6IFtOb3Vpc2xpZGVyQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbTm91aXNsaWRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdWlzbGlkZXJNb2R1bGUgeyB9XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==