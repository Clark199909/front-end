import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  active = 1;
  loggedIn = false;

  constructor() { }

  ngOnInit(): void {
    if (history.state.active != undefined) {
      this.active = history.state.active;
    }
    if (history.state.loggedIn != undefined) {
      this.loggedIn = history.state.loggedIn;
    }
    if (!this.loggedIn) {
      alert("Need to login first!");
    }
  }

}