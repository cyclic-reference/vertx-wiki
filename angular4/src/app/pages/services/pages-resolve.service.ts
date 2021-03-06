/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Permissions} from "../../auth/Permissions.component";
import {PageMin} from "../models/Page.min.model";
import {PagesService} from "./Pages.service";
import {PagePayload} from "../models/PagePayload.model";

@Injectable()
export class PagesResolve implements Resolve<PagePayload> {
    constructor(private permissons: Permissions, private pagesService: PagesService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagePayload> {
        return this.permissons.canView
            .flatMap(canView => {
                if (canView) {
                    return this.pagesService.fetchAllMinPages(parseInt(route.params['pageNumber']));
                } else {
                    return Observable.empty();
                }
            });
    }

}
