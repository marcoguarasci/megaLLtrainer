import { Injectable } from '@angular/core';
import { CaseLL } from '../../../public/utilites/CaseLL.type';
import { cases } from '../../../public/db/db.json'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataReader {

  constructor(private http: HttpClient) {
    this.getJSON().subscribe();
  }

  public getJSON(): Observable<any> { return this.http.get("/db/DB2.JSON"); }

  static getImgPath(ccase: CaseLL | undefined): string {

    if (typeof ccase == "undefined")
      // return "/imgs/default.png";
      return "";

    return "/imgs/" + ccase.name + ".png";
  }
}