import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddContactComponent } from './components/students-contacts/add-contact.component';
import { EditContactComponent } from './components/students-contacts/edit-contact.component';
import { AddSectionComponent } from './components/sections/add-section.component';
import { EditSectionComponent } from './components/sections/edit-section.component';
import { AddProjectComponent } from './components/projects/add-project.component';
import { EditProjectComponent } from './components/projects/edit-project.component';
import { AddStudentComponent } from './components/student_info/add-student-info.component';
import { EditStudentComponent } from './components/student_info/edit-student-info.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'management', component: NavbarComponent },
  { path: 'management/add-contact', component: AddContactComponent },
  { path: 'management/edit-contact', component: EditContactComponent },
  { path: 'management/add-section', component: AddSectionComponent },
  { path: 'management/edit-section', component: EditSectionComponent },
  { path: 'management/add-project', component: AddProjectComponent },
  { path: 'management/edit-project', component: EditProjectComponent },
  { path: 'management/add-student', component: AddStudentComponent },
  { path: 'management/edit-student', component: EditStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
