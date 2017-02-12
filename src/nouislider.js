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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91aXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdWlzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVDQUF5QztBQUN6QyxzQ0FTdUI7QUFDdkIsd0NBSXdCO0FBT3hCO0lBQUE7SUFTQSxDQUFDO0lBUkMsNkJBQUUsR0FBRixVQUFHLEtBQWE7UUFDZCw2REFBNkQ7UUFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUFBLENBQUM7SUFFRiwrQkFBSSxHQUFKLFVBQUssS0FBYTtRQUNoQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksNENBQWdCO0FBZ0M3QixJQUFhLG1CQUFtQjtJQTZCOUIsNkJBQW9CLEVBQWM7UUFBbEMsaUJBQXVDO1FBQW5CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFoQmxCLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFNaEIsV0FBTSxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsV0FBTSxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsVUFBSyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsUUFBRyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsVUFBSyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsUUFBRyxHQUFzQixJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekQsYUFBUSxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDbkMsY0FB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QkFDbEQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGO0tBQ0YsQ0FBQztxQ0E4QndCLGlCQUFVO0dBN0J2QixtQkFBbUIsQ0FpTC9CO0FBakxZLGtEQUFtQjtBQXlMaEMsSUFBYSxnQkFBZ0I7SUFBN0I7SUFBZ0MsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUFqQyxJQUFpQztBQUFwQixnQkFBZ0I7SUFMNUIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztRQUM5QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztLQUNwQyxDQUFDOztHQUNXLGdCQUFnQixDQUFJO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG5vVWlTbGlkZXIgZnJvbSAnbm91aXNsaWRlcic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBOZ01vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3VpRm9ybWF0dGVyIHtcbiAgdG8odmFsdWU6IG51bWJlcik6IHN0cmluZztcbiAgZnJvbSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZvcm1hdHRlciBpbXBsZW1lbnRzIE5vdWlGb3JtYXR0ZXIge1xuICB0byh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAvLyBmb3JtYXR0aW5nIHdpdGggaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY0NjMzNjQvNDc4NTg0XG4gICAgcmV0dXJuIFN0cmluZyhwYXJzZUZsb2F0KHBhcnNlRmxvYXQoU3RyaW5nKHZhbHVlKSkudG9GaXhlZCgyKSkpO1xuICB9O1xuXG4gIGZyb20odmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdWlzbGlkZXInLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5uZzItbm91aXNsaWRlcl0nOiAndHJ1ZSdcbiAgfSxcbiAgdGVtcGxhdGU6ICc8ZGl2IFthdHRyLmRpc2FibGVkXT1cImRpc2FibGVkID8gdHJ1ZSA6IHVuZGVmaW5lZFwiPjwvZGl2PicsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgIH1cbiAgYF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm91aXNsaWRlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG5cbiAgcHVibGljIHNsaWRlcjogYW55O1xuICBwdWJsaWMgaGFuZGxlczogYW55W107XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICBASW5wdXQoKSBwdWJsaWMgYmVoYXZpb3VyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb25uZWN0OiBib29sZWFuW107XG4gIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgbWluOiBudW1iZXI7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIHN0ZXA6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIGZvcm1hdDogTm91aUZvcm1hdHRlcjtcbiAgQElucHV0KCkgcHVibGljIHBhZ2VTdGVwczogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgcHVibGljIG5nTW9kZWw6IG51bWJlciB8IG51bWJlcltdO1xuICBASW5wdXQoKSBwdWJsaWMga2V5Ym9hcmQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBvbktleWRvd246IGFueTtcbiAgQElucHV0KCkgcHVibGljIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgQElucHV0KCkgcHVibGljIHRvb2x0aXBzOiBBcnJheTxhbnk+O1xuICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHVibGljIHVwZGF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICBAT3V0cHV0KCkgcHVibGljIHNsaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgc3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBlbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgcHJpdmF0ZSB2YWx1ZTogYW55O1xuICBwcml2YXRlIG9uQ2hhbmdlOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHByaXZhdGUgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgbGV0IGlucHV0c0NvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYmVoYXZpb3VyOiB0aGlzLmJlaGF2aW91cixcbiAgICAgIGNvbm5lY3Q6IHRoaXMuY29ubmVjdCxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgc3RhcnQ6IHRoaXMuZm9ybUNvbnRyb2wgIT09IHVuZGVmaW5lZCA/IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgOiB0aGlzLm5nTW9kZWwsXG4gICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICBwYWdlU3RlcHM6IHRoaXMucGFnZVN0ZXBzLFxuICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICBvbktleWRvd246IHRoaXMub25LZXlkb3duLFxuICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLnJhbmdlIHx8IHttaW46IHRoaXMubWluLCBtYXg6IHRoaXMubWF4fSxcbiAgICAgIHRvb2x0aXBzOiB0aGlzLnRvb2x0aXBzLFxuICAgIH0pKTtcblxuICAgIGlucHV0c0NvbmZpZy5mb3JtYXQgPSB0aGlzLmZvcm1hdCB8fCB0aGlzLmNvbmZpZy5mb3JtYXQgfHwgbmV3IERlZmF1bHRGb3JtYXR0ZXIoKTtcblxuICAgIHRoaXMuc2xpZGVyID0gbm9VaVNsaWRlci5jcmVhdGUoXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JyksXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBpbnB1dHNDb25maWcpXG4gICAgKTtcblxuICAgIHRoaXMuaGFuZGxlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub1VpLWhhbmRsZScpKTtcblxuICAgIGlmKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICBpZih0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPSAxMDtcbiAgICAgIH1cbiAgICAgIGZvcihsZXQgaGFuZGxlIG9mIHRoaXMuaGFuZGxlcykge1xuICAgICAgICBoYW5kbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLmNvbmZpZy5vbktleWRvd24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5kZWZhdWx0S2V5SGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmNvbmZpZy5vbktleWRvd24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXIub24oJ3NldCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgbGV0IHYgPSB0aGlzLnRvVmFsdWVzKHZhbHVlcyk7XG4gICAgICBsZXQgZW1pdEV2ZW50cyA9IGZhbHNlO1xuICAgICAgaWYodGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZihBcnJheS5pc0FycmF5KHYpICYmIHRoaXMudmFsdWVbaGFuZGxlXSAhPSB2W2hhbmRsZV0pIHtcbiAgICAgICAgZW1pdEV2ZW50cyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZighQXJyYXkuaXNBcnJheSh2KSAmJiB0aGlzLnZhbHVlICE9IHYpIHtcbiAgICAgICAgZW1pdEV2ZW50cyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZihlbWl0RXZlbnRzKSB7XG4gICAgICAgIHRoaXMuc2V0LmVtaXQodik7XG4gICAgICAgIHRoaXMub25DaGFuZ2Uodik7XG4gICAgICB9XG4gICAgICBpZihBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICAgIHRoaXMudmFsdWVbaGFuZGxlXSA9IHZbaGFuZGxlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3VwZGF0ZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ2NoYW5nZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3NsaWRlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLnNsaWRlLmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uKCdzdGFydCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgdGhpcy5zdGFydC5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNsaWRlci5vbignZW5kJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICB0aGlzLmVuZC5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgfSk7XG4gIH1cblxuICB0b1ZhbHVlcyh2YWx1ZXM6IHN0cmluZ1tdKTogYW55IHwgYW55W10ge1xuICAgIGxldCB2ID0gdmFsdWVzLm1hcCh0aGlzLmNvbmZpZy5mb3JtYXQuZnJvbSk7XG4gICAgcmV0dXJuICh2Lmxlbmd0aCA9PSAxID8gdlswXSA6IHYpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2xpZGVyKSB7XG4gICAgICB0aGlzLnNsaWRlci5zZXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgZGVmYXVsdEtleUhhbmRsZXIgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGxldCBzdGVwU2l6ZTogYW55W10gPSB0aGlzLnNsaWRlci5zdGVwcygpO1xuICAgIGxldCBpbmRleCA9IHBhcnNlSW50KCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLmdldEF0dHJpYnV0ZSgnZGF0YS1oYW5kbGUnKSk7XG4gICAgbGV0IHNpZ24gPSAxO1xuICAgIGxldCBtdWx0aXBsaWVyOiBudW1iZXIgPSAxO1xuICAgIGxldCBzdGVwID0gMDtcbiAgICBsZXQgZGVsdGEgPSAwO1xuXG4gICAgc3dpdGNoICggZS53aGljaCApIHtcbiAgICAgIGNhc2UgMzQ6ICAvLyBQYWdlRG93blxuICAgICAgICBtdWx0aXBsaWVyID0gdGhpcy5jb25maWcucGFnZVN0ZXBzO1xuICAgICAgY2FzZSA0MDogIC8vIEFycm93RG93blxuICAgICAgY2FzZSAzNzogIC8vIEFycm93TGVmdFxuICAgICAgICBzaWduID0gLTE7XG4gICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMF07XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzM6ICAvLyBQYWdlVXBcbiAgICAgICAgbXVsdGlwbGllciA9IHRoaXMuY29uZmlnLnBhZ2VTdGVwcztcbiAgICAgIGNhc2UgMzg6ICAvLyBBcnJvd1VwXG4gICAgICBjYXNlIDM5OiAgLy8gQXJyb3dSaWdodFxuICAgICAgICBzdGVwID0gc3RlcFNpemVbaW5kZXhdWzFdO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWx0YSA9IHNpZ24gKiBtdWx0aXBsaWVyICogc3RlcDtcbiAgICBsZXQgbmV3VmFsdWU6IG51bWJlciB8IG51bWJlcltdO1xuXG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSkge1xuICAgICAgbmV3VmFsdWUgPSBbXS5jb25jYXQodGhpcy52YWx1ZSk7XG4gICAgICBuZXdWYWx1ZVtpbmRleF0gPSBuZXdWYWx1ZVtpbmRleF0gKyBkZWx0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlICsgZGVsdGE7XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXIuc2V0KG5ld1ZhbHVlKTtcbiAgfVxufVxuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBleHBvcnRzOiBbTm91aXNsaWRlckNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW05vdWlzbGlkZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyTW9kdWxlIHsgfVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=