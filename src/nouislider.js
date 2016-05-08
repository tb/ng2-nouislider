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
var control_value_accessor_1 = require('@angular/common/src/forms/directives/control_value_accessor');
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
var NOUISLIDER_CONTROL_VALUE_ACCESSOR = new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Nouislider; }),
    multi: true
});
var Nouislider = (function () {
    function Nouislider(el) {
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.config = {};
        this.ngModelChange = new core_1.EventEmitter();
        this.el = el;
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
        this.slider = noUiSlider.create(this.el.nativeElement, Object.assign(this.config, inputsConfig));
        this.slider.on('set', function (value) {
            _this.writeValue(toValue(value));
        });
    };
    Nouislider.prototype.writeValue = function (value) {
        if (this.value == value || String(this.value) == String(value)) {
            return;
        }
        this.ngModelChange.emit(value);
        this.value = value;
        if (this.slider) {
            this.slider.set(value);
        }
    };
    Nouislider.prototype.registerOnChange = function (fn) {
        this.onTouched = fn;
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
        __metadata('design:type', Boolean)
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
    Nouislider = __decorate([
        core_1.Directive({
            selector: '[nouislider]',
            providers: [NOUISLIDER_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Nouislider);
    return Nouislider;
}());
exports.Nouislider = Nouislider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm91aXNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdWlzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLHFCQVNPLGVBQWUsQ0FBQyxDQUFBO0FBR3ZCLHVDQUFnQyw2REFBNkQsQ0FBQyxDQUFBO0FBRTlGLGlCQUF3QixLQUFlO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0FBQ0gsQ0FBQztBQVJlLGVBQU8sVUFRdEIsQ0FBQTtBQUVELElBQU0saUNBQWlDLEdBQUcsSUFBSSxlQUFRLENBQ3BELDBDQUFpQixFQUFFO0lBQ2pCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxVQUFVLEVBQVYsQ0FBVSxDQUFDO0lBQ3pDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDO0FBTUw7SUFpQkUsb0JBQW1CLEVBQWM7UUFiMUIsYUFBUSxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDbkMsY0FBUyxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFRbEMsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUVoQixrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUc5RCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBQUEsaUJBa0JDO1FBakJDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUM7U0FDM0QsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQ3pDLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFVO1lBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sK0JBQVUsR0FBakIsVUFBa0IsS0FBVTtRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0lBRU0scUNBQWdCLEdBQXZCLFVBQXdCLEVBQWtCO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxzQ0FBaUIsR0FBeEIsVUFBeUIsRUFBWTtRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBcEREO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs2Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsyQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsyQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOztxREFBQTtJQW5CWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztTQUMvQyxDQUFDOztrQkFBQTtJQTZERixpQkFBQztBQUFELENBQUMsQUE1REQsSUE0REM7QUE1RFksa0JBQVUsYUE0RHRCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBub1VpU2xpZGVyIGZyb20gJ25vdWlzbGlkZXInO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUHJvdmlkZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9jb21tb24vc3JjL2Zvcm1zL2RpcmVjdGl2ZXMvY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1ZhbHVlKHZhbHVlOiBzdHJpbmdbXSk6IG51bWJlcnxudW1iZXJbXSB7XG4gIGlmICh2YWx1ZS5sZW5ndGggPT0gMSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlWzBdKTtcbiAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcChwYXJzZUZsb2F0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5jb25zdCBOT1VJU0xJREVSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IgPSBuZXcgUHJvdmlkZXIoXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLCB7XG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm91aXNsaWRlciksXG4gICAgbXVsdGk6IHRydWVcbiAgfSk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3Vpc2xpZGVyXScsXG4gIHByb3ZpZGVyczogW05PVUlTTElERVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTm91aXNsaWRlciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBwdWJsaWMgZWw6IEVsZW1lbnRSZWY7XG4gIHB1YmxpYyBzbGlkZXI6IGFueTtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgQElucHV0KCkgYmVoYXZpb3VyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbm5lY3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbWl0OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcbiAgQElucHV0KCkgc3RlcDogbnVtYmVyO1xuICBASW5wdXQoKSBjb25maWc6IGFueSA9IHt9O1xuICBASW5wdXQoKSBuZ01vZGVsOiBudW1iZXIgfCBudW1iZXJbXTtcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGxldCBpbnB1dHNDb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGJlaGF2aW91cjogdGhpcy5iZWhhdmlvdXIsXG4gICAgICBjb25uZWN0OiB0aGlzLmNvbm5lY3QsXG4gICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgIHN0YXJ0OiB0aGlzLm5nTW9kZWwsXG4gICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICByYW5nZTogdGhpcy5jb25maWcucmFuZ2UgfHwge21pbjogdGhpcy5taW4sIG1heDogdGhpcy5tYXh9XG4gICAgfSkpO1xuXG4gICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGlucHV0c0NvbmZpZylcbiAgICApO1xuXG4gICAgdGhpcy5zbGlkZXIub24oJ3NldCcsICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICB0aGlzLndyaXRlVmFsdWUodG9WYWx1ZSh2YWx1ZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbHVlID09IHZhbHVlIHx8IFN0cmluZyh0aGlzLnZhbHVlKSA9PSBTdHJpbmcodmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5zbGlkZXIpIHtcbiAgICAgIHRoaXMuc2xpZGVyLnNldCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG59XG4iXX0=