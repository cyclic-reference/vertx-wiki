import {Component, Input} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    selector: 'loading-indicator',
    template: require('./loading.indicator.component.htm')
})
export class LoadingIndicatorComponent {

    constructor() {
    }

    private _doneLoading: Observable<void> = Observable.empty();
    private _startLoading: Observable<void> = Observable.empty();
    private completed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @Input()
    get doneLoading(): Observable<void> {
        return this._doneLoading;
    }

    set doneLoading(value: Observable<void>) {
        this._doneLoading = value;
        let emissionHandler = ()=>{this.completed.next(true);};
        this.doneLoading.subscribe(emissionHandler, emissionHandler, emissionHandler)

    }

    @Input()
    get startLoading(): Observable<void> {
        return this._startLoading;
    }

    set startLoading(value: Observable<void>) {
        this._startLoading = value;
        let emissionHandler = ()=>{this.completed.next(false);};
        this.startLoading.subscribe(emissionHandler, emissionHandler, emissionHandler)

    }

    get completedLoading(): Observable<boolean> {
        return this.completed;
    }


}
