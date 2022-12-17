import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { BASEPATH } from './constants/basepath';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  loggedIn: boolean;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.title = 'student-management';
    this.loggedIn = false;

    if (window.location.href.indexOf('/?uid=') > -1) {
      if (!sessionStorage.getItem('uid')) {
        let reg = /(uid=)(.*)/;
        let result = reg.exec(window.location.href);
        if (result?.length !== undefined && result?.length > 2) {
          sessionStorage.setItem('uid', result[2]);
        }
      }
      router.navigate(['']);
    }
  }

  ngOnInit(): void {

    let headers = new HttpHeaders();

    if (sessionStorage.getItem("uid") != null) {
      headers = headers.set("Uid", sessionStorage.getItem("uid") || "")
    }

    console.log(headers)

    this.http.get(`${BASEPATH}/`, { headers: headers, observe: 'response', withCredentials: true }).subscribe(data => {
      console.log(data.status)
      if (data.status === 200) {
        this.loggedIn = true;
        this.router.navigate(['management'], { state: { loggedIn: this.loggedIn } });
      } else {
        this.loggedIn = false;
        this.router.navigate(['']);
      }

    })
  }

  login(): void {
    this.http.get(`${BASEPATH}/login`, { observe: 'response', withCredentials: true }).subscribe(data => {
      if (data.status === 200 && data.body != null) {
        window.location.href = String(data.body)
      }
    })
  }

  logout(): void {
    let headers = new HttpHeaders();

    if (sessionStorage.getItem("uid") != null) {
      headers = headers.set("Uid", sessionStorage.getItem("uid") || "")
    }
    this.http.get(`/logout`, { headers: headers, observe: 'response', withCredentials: true }).subscribe(data => {
      if (data.status === 200) {
        this.loggedIn = false;
        sessionStorage.clear();
        alert("Successfully Logged out!");
        this.ngOnInit();
      }
    })
  }
}
