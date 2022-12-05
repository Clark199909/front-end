import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  loggedIn: boolean;

  constructor(private http: HttpClient) {
    this.title = 'student-management';
    this.loggedIn = false;
  }

  ngOnInit(): void {

    this.http.get('https://127.0.0.1:5011/', { observe: 'response', withCredentials: true }).subscribe(data => {
      console.log(data.status)
      if (data.status === 200) {
        this.loggedIn = true;
      }
    })
  }

  login(): void {
    this.http.get('https://127.0.0.1:5011/login', { observe: 'response', withCredentials: true }).subscribe(data => {
      if (data.status === 200 && data.body != null) {
        window.location.href = String(data.body)
      }
    })
  }
}
