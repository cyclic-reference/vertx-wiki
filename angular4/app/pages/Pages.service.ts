/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {PageMin} from "./Page.min.model";
import {BackendService} from "../util/backend.service";
import {PagePayload} from "./PagePayload.model";
import {PageFull} from "./Page.full.model";
import {FullPagePayload} from "./PageFullPayload.model";

@Injectable()
export class PagesService {

  constructor(private backendService: BackendService) {

  }

  fetchAllMinPages(): Observable<PageMin[]> {
    return this.backendService.fetchAllPages()
      .map((payload: PagePayload) => payload.pages);
  }

  fetchPage(name: string): Observable<PageFull> {
    return this.backendService.fetchPage(name)
      .map((pagePayload: FullPagePayload)=>pagePayload.page);
}
}
