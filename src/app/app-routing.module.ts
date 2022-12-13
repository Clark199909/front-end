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

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'edit-contact', component: EditContactComponent },
  { path: 'add-section', component: AddSectionComponent },
  { path: 'edit-section', component: EditSectionComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'edit-project', component: EditProjectComponent },
  { path: 'add-student', component: AddStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
