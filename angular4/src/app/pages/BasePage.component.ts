/**
 * Created by alex on 9/17/17.
 */
import {Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "./page.htm";
import {Resetable} from "../objects/Resetable";
import {Saveable} from "../objects/Saveable";
import {Observable} from "rxjs/Observable";
import {EditOptions} from "./EditOptions.model";
import {Page} from "./Page.model";


export abstract class BasePageComponent implements OnInit, Resetable, Saveable {
  get page(): Page {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }

  private _title: string;
  private _content: string;
  private _editMode: boolean = false;
  private _htmlContent: string;
  private _page: Page;
  protected _editOptions: EditOptions = {
    hideDelete: true
  };

  constructor(protected router: ActivatedRoute) {
  }

  abstract save(): Observable<boolean>;

  abstract reset(): void;

  abstract ngOnInit(): void;

  protected load(page: Page): Observable<boolean> {
    this.title = page.name;
    this.htmlContent = page.html;
    this.content = page.markdown;
    this.page = page;
    return Observable.of(true);
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  @Input()
  get editMode(): boolean {
    return this._editMode;
  }

  set editMode(value: boolean) {
    this._editMode = value;
  }

  get htmlContent(): string {
    return this._htmlContent;
  }

  set htmlContent(value: string) {
    this._htmlContent = value;
  }

  get editOptions(): EditOptions {
    return this._editOptions;
  }

  set editOptions(value: EditOptions) {
    this._editOptions = value;
  }
}
