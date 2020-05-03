import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../vo/user-info';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder: string;
  ui :UserInfo = new UserInfo();
  url : string = 'user/login';
  apiUrl: string = 'http://localhost:80/';
  loginUrl: string;
  
  constructor(private activatedRoute: ActivatedRoute,
              private _http: HttpClient) { 

  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      if (error['error']) {
      }
      throw error;
    };
  }

  async login(){
    this.loginUrl = `${this.apiUrl}${this.url}`;
    await this.postJson<UserInfo>(this.loginUrl,this.ui).subscribe(
      async res=>{
 
      },err=>{
        console.log(err);
      }
    )
  }


  postJson<T>(url: string, obj: any, confs?: any): Observable<T> {
    const httpJson = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
    return this._http.post<T>(url, obj, httpJson).pipe(
      tap(res => {
        console.log(res);
      }),
      catchError(this.handleError<T>(`obj = ${obj}`))
    );
  }

}
