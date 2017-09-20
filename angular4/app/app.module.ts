import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MarkdownModule} from 'angular2-markdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from "./app.component";
import {HttpModule} from "@angular/http";
import {UiSwitchModule} from "angular2-ui-switch";
import {MessageComponent} from "./messages/message.component";
import {SwitchComponent} from "./switch/switch.component";
import {HostService} from "./session/host.service";
import {SessionService} from "./session/session.service";
import {MessageService} from "./messages/message.service";
import {WindowRef} from "./util/window";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login.component";
import {BaseComponent} from "./base.component";
import {LogoutComponent} from "./auth/logout.component";
import {UserPrincipal} from "./auth/UserPrincipal.model";
import {PagesComponent} from "./pages/Pages.component";
import {Permissions} from "./auth/Permissions.component";
import {PagesResolve} from "./pages/pages-resolve.service";
import {PagesService} from "./pages/Pages.service";
import {BackendService} from "./util/backend.service";
import {BasePageComponent} from "./pages/BasePage.component";
import {PageResolve} from "./pages/page-resolve.service";
import {EditComponent} from "./pages/Edit.component";
import {SimpleNotificationsModule} from "angular2-notifications";

const appRoutes = [
  {path: '', component: BaseComponent, canActivate: [AuthGuard], resolve: {pages: PagesResolve}},
  {path: 'page/:name', component: BasePageComponent, canActivate: [AuthGuard], resolve: {pages: PageResolve}},
  {path: 'butt', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UiSwitchModule,
    MarkdownModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AppComponent,
    MessageComponent,
    SwitchComponent,
    BaseComponent,
    LoginComponent,
    LogoutComponent,
    PagesComponent,
    BasePageComponent,
    EditComponent
  ],
  bootstrap: [AppComponent],
  providers: [HostService,
    SessionService,
    MessageService,
    WindowRef,
    AuthService,
    AuthGuard,
    UserPrincipal,
    Permissions,
    PagesResolve,
    PageResolve,
    PagesService,
    BackendService]
})
export class AppModule {
}
