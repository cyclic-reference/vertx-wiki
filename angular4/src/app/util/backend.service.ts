/**
 * Created by alex on 9/17/17.
 */


import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserPrincipal} from "../auth/UserPrincipal.model";

import {PagePayload} from "../pages/models/PagePayload.model";
import {FullPagePayload} from "../pages/models/PageFullPayload.model";
import {StatusPayload} from "../pages/models/StatusPayload.model";
import {ExistsPayload} from "../pages/models/ExistsPayload.model";
import {ArchivesPayload} from "../pages/archive/ArchivesPayload.model";

@Injectable()
export class BackendService {

    constructor(private http: Http,
                private userToken: UserPrincipal) {

    }

    fetchAllPages(pageNumber: number): Observable<PagePayload> {
        return this.httpPost("./base/pages", {pageNumber: pageNumber})
            .map((response: Response) => new PagePayload(response.json()));
    }

    fetchAllArchives(pageNumber: number): Observable<ArchivesPayload> {
        return this.httpPost("./base/archives", {pageNumber: pageNumber})
            .map((response: Response) => new ArchivesPayload(response.json()));
    }

    fetchPage(pageName: String): Observable<FullPagePayload> {
        return this.httpGet("./base/pages/" + pageName)
            .map((response: Response) => new FullPagePayload(response.json()));
    }

    fetchArchivedPage(pageId: String): Observable<FullPagePayload> {
        return this.httpPost("./base/archive", {_id: pageId})
            .map((response: Response) => new FullPagePayload(response.json()));
    }

    deletePage(pageName: String): Observable<StatusPayload> {
        return this.httpDelete("./api/page/" + pageName)
            .map((response: Response) => new StatusPayload(response.json()));
    }

    restoreArchive(pageId: String): Observable<StatusPayload> {
        return this.httpPut("./api/archive/restore/" + pageId, {})
            .map((response: Response) => new StatusPayload(response.json()));
    }

    logoutUser(): Observable<StatusPayload> {
        return this.httpPost("./user/logout", {})
            .map((response: Response) => new StatusPayload(response.json()));
    }

    pageExists(pageName: String): Observable<ExistsPayload> {
        return this.httpGet("./base/exists/" + pageName)
            .map((response: Response) => new ExistsPayload(response.json()));
    }

    userExists(userName: String): Observable<ExistsPayload> {
        return this.httpPost("./user/exists/" + userName, {})
            .map((response: Response) => new ExistsPayload(response.json()));
    }

    updatePage(pageName: String, pageBody: String): Observable<StatusPayload> {
        return this.httpPut("./api/pages",
            {"name": pageName, "markdown": pageBody})
            .map((response: Response) => new StatusPayload(response.json()));
    }

    updateUser(role: String, password: String): Observable<Response> {
        return this.httpPut("./api/user",
            {"role": role, "password": password});
    }

    createPage(pageName: String, pageBody: String): Observable<StatusPayload> {
        return this.httpPost("./api/pages/create",
            {"name": pageName, "markdown": pageBody})
            .map((response: Response) => new StatusPayload(response.json()));
    }

    private httpGet(s: string): Observable<Response> {
        return this.http.get( s, this.getRequestOptions());
    }

    private httpPut(s: string, body: any): Observable<Response> {
        return this.http.put( s, body, this.getRequestOptions());
    }

    private httpDelete(s: string): Observable<Response> {
        return this.http.delete( s, this.getRequestOptions());
    }

    private httpPost(s: string, body: any): Observable<Response> {
        return this.http.post( s, body, this.getRequestOptions());
    }

    private getRequestOptions(): RequestOptionsArgs {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.userToken.token);
        let returnVal: RequestOptionsArgs = {headers: headers};
        return returnVal;
    }
}
