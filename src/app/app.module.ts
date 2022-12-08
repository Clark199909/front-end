import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddSectionComponent } from './components/add_section/add-section.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StudentInfoComponent } from './components/student_info/student-info.component';
import { StudentContactsComponent } from './components/students-contacts/student-contacts.component';
import { AddContactComponent } from './components/students-contacts/add-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddSectionComponent,
    LoginComponent,
    SignupComponent,
    StudentInfoComponent,
    StudentContactsComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NgbNavModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
