/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BackendService} from "../../util/backend.service";
import {ExistsPayload} from "../models/ExistsPayload.model";

@Injectable()
export class TitleValidationService {

    constructor(private backendService: BackendService) {

    }

    isValid(pageName: String): Observable<boolean> {
        return this.backendService
            .pageExists(pageName)
            .map((statusPayload: ExistsPayload) => !statusPayload.exists);
    }

}
