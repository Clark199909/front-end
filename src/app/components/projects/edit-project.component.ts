import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/services/section.service';
import { ProjectService } from 'src/app/services/project.service';
import { StudentInfoService } from 'src/app/services/student-info.service';
import { Section } from 'src/app/models/section';
import { startWith, pairwise } from 'rxjs/operators';
import { navbartabs } from "src/app/constants/navbartabs";

@Component({
    selector: 'edit-project-component',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

    editProjectForm!: FormGroup;
    projectService: ProjectService;
    sectionService: SectionService;
    studentInfoService: StudentInfoService;
    project_id!: number;
    call_no!: number;
    students!: { [key: string]: string };
    selected_students: Set<string>;
    loggedIn = false;

    constructor(private router: Router,
        projectService: ProjectService,
        sectionService: SectionService,
        studentInfoService: StudentInfoService) {
        this.projectService = projectService;
        this.sectionService = sectionService;
        this.studentInfoService = studentInfoService;
        this.selected_students = new Set();
    }

    async ngOnInit() {
        if (history.state.loggedIn != undefined) {
            this.loggedIn = history.state.loggedIn;
        }
        if (!this.loggedIn) {
            alert("Need to login first!");
        }

        this.project_id = history.state.project_id;
        this.call_no = history.state.call_no;
        this.students = await this.studentInfoService.getAvailableStudents(history.state.call_no, history.state.project_id);

        let team_members = new FormArray([]);
        const project_members = history.state.project_members;

        for (const member of project_members) {
            let team_member = new FormGroup({
                uni: new FormControl(member)
            })
            team_members.push(team_member);
            this.selected_students.add(member);
            team_member.valueChanges.pipe(
                startWith(team_member.value),
                pairwise()
            ).subscribe(
                ([old, value]) => {
                    this.selected_students.delete(old['uni']);
                    this.selected_students.add(value['uni']);
                }
            )
        }
        this.editProjectForm = new FormGroup(
            {
                project_name: new FormControl(history.state.project_name, [Validators.required]),
                team_name: new FormControl(history.state.team_name, [Validators.required]),
                team_members: team_members
            }
        );

    }

    onEdit() {

        if (this.editProjectForm.invalid) {
            alert("Please fill in all fields!");
            return;
        }

        const project_members = Array.from(this.selected_students);

        if (project_members.length == 0) {
            alert("Need at least one member!");
            return;
        }

        let data = JSON.stringify({
            project_name: this.editProjectForm.value.project_name,
            team_name: this.editProjectForm.value.team_name,
            project_members: project_members
        });

        this.projectService.editProject(this.call_no, this.project_id, data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['management'], { state: { active: navbartabs.PROJECT } });
            })

    }

    get teamMemberFormGroups() {
        return this.editProjectForm.get('team_members') as FormArray
    }

    addTeamMember(): void {
        if (this.selected_students.size < Object.keys(this.students).length) {
            let select_student = "";
            for (const student of Object.keys(this.students)) {
                if (!this.selected_students.has(student)) {
                    select_student = student;
                    break;
                }
            }
            let new_team_member = new FormGroup({
                uni: new FormControl(select_student)
            });
            this.teamMemberFormGroups.push(new_team_member);
            this.selected_students.add(select_student);

            new_team_member.valueChanges.pipe(
                startWith(new_team_member.value),
                pairwise()
            ).subscribe(
                ([old, value]) => {
                    this.selected_students.delete(old['uni']);
                    this.selected_students.add(value['uni']);
                }
            )

        } else {
            alert("No more available students!");
        }
    }

    deleteTeamMember(i: number): void {
        const selected_name = this.teamMemberFormGroups.controls[i].get('uni')?.value;
        this.selected_students.delete(selected_name);
        this.teamMemberFormGroups.removeAt(i);

    }
}