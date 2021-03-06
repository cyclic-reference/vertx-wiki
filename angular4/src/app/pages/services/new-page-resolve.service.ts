/**
 * Created by alex on 9/17/17.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Permissions} from "../../auth/Permissions.component";
import {PagesService} from "./Pages.service";
import {Page} from "../models/Page.model";

@Injectable()
export class NewPageResolve implements Resolve<Page> {
    constructor(private permissons: Permissions, private pagesService: PagesService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page> {
        return this.permissons.canView
            .flatMap(canView => {
                console.log(canView);
                if (canView) {
                    return this.pagesService.freshPage();
                } else {
                    return Observable.empty();
                }
            });
    }

}
