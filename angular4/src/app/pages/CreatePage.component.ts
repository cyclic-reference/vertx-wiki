/**
 * Created by alex on 9/17/17.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "./create.page.htm";
import {PageFull} from "./Page.full.model";
import {PagesService} from "./Pages.service";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs/Observable";
import {BasePageComponent} from "./BasePage.component";
import {EditOptions} from "./EditOptions.model";
@Component({
  selector: 'new-page',
  templateUrl: './templates/create.page.htm'
})
export class CreatePageComponent extends BasePageComponent {
  private _validTitle: boolean;

  constructor(protected router: ActivatedRoute, private pagesService: PagesService, private notificationService: NotificationsService, private actualRouter: Router) {
    super(router);
    this.editMode = true;
  }

  save(): Observable<boolean> {
    let self = this;
    if (self.validTitle) {
      let returnGuy = this.pagesService
        .createPage(this.title, this.content);
      returnGuy.subscribe((success: boolean) => {
        if (success) {
          self.actualRouter.navigate(['/page/' + self.title]);
        } else {
          self.failure()
        }
      }, (error: any) => self.failure());
      return
    } else {
      self.failure();
      return Observable.of(false);
    }
  }

  private failure() {
    this.notificationService.error('Page NOT Saved!', ':( Try again.', {
      timeOut: 3000,
      showProgressBar: true,
      clickToClose: true
    })
  }

  reset(): void {
    let self = this;
    this.pagesService
      .fetchPage(self.pageFull.name)
      .flatMap((pageFull: PageFull) => self.load(pageFull))
      .subscribe((result: boolean)=> self.notificationService.success("Page Reloaded!", "Things might have changed!", {
          timeOut: 3000,
          showProgressBar: true,
          clickToClose: true
        }),
        (error: any)=>self.notificationService.error("Unable to Reset!", "Try again, or not, it may no work :/",{
          timeOut: 3000,
          showProgressBar: true,
          clickToClose: true
        }));
  }


  get validTitle(): boolean {
    return this._validTitle;
  }

  set validTitle(value: boolean) {
    this._validTitle = value;
  }

  titleValidationChange(delta: boolean): void {
    this.validTitle = delta;
  }

  titleChange(delta: string): void {
    this.title = delta;
  }
}