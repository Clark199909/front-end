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
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from 'mat-timepicker';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentInfoComponent } from './components/student_info/student-info.component';
import { StudentContactsComponent } from './components/students-contacts/student-contacts.component';
import { AddContactComponent } from './components/students-contacts/add-contact.component';
import { EditContactComponent } from './components/students-contacts/edit-contact.component';
import { SectionsComponent } from './components/sections/sections.component';
import { AddSectionComponent } from './components/sections/add-section.component';
import { EditSectionComponent } from './components/sections/edit-section.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/projects/add-project.component';
import { EditProjectComponent } from './components/projects/edit-project.component';
import { AddStudentComponent } from './components/student_info/add-student-info.component';
import { EditStudentComponent } from './components/student_info/edit-student-info.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentInfoComponent,
    StudentContactsComponent,
    AddContactComponent,
    EditContactComponent,
    SectionsComponent,
    AddSectionComponent,
    EditSectionComponent,
    ProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    AddStudentComponent,
    EditStudentComponent,
    HomeComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
