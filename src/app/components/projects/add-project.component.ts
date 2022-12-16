import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { SectionService } from "src/app/services/section.service";
import { StudentInfoService } from "src/app/services/student-info.service";
import { Section } from "src/app/models/section";
import { startWith, pairwise } from 'rxjs/operators';
import { navbartabs } from "src/app/constants/navbartabs";

@Component({
    selector: 'app-add-project-component',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

    addProjectForm!: FormGroup;
    projectService: ProjectService;
    sectionService: SectionService;
    studentInfoService: StudentInfoService;
    sections!: Section[];
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

    async ngOnInit(): Promise<void> {
        if (history.state.loggedIn != undefined) {
            this.loggedIn = history.state.loggedIn;
        }
        if (!this.loggedIn) {
            alert("Need to login first!");
        }

        this.sections = await this.sectionService.getSections();
        if (this.sections.length == 0) {
            alert("No Section is available!");
            this.router.navigate(['']);
        }
        this.students = await this.studentInfoService.getAvailableStudents(this.sections[0].call_no, 0);

        let team_members = new FormArray([]);
        if (Object.keys(this.students).length != 0) {
            let new_team_member = new FormGroup({
                uni: new FormControl(Object.keys(this.students)[0])
            });

            team_members.push(new_team_member);
            this.selected_students.add(Object.keys(this.students)[0]);
            new_team_member.valueChanges.pipe(
                startWith(new_team_member.value),
                pairwise()
            ).subscribe(
                ([old, value]) => {
                    this.selected_students.delete(old['uni']);
                    this.selected_students.add(value['uni']);
                }
            )
        }

        this.addProjectForm = new FormGroup(
            {
                call_no: new FormControl(this.sections[0].call_no),
                project_name: new FormControl(''),
                team_name: new FormControl(''),
                team_members: team_members
            }
        );

        this.addProjectForm.controls['call_no'].valueChanges.subscribe(async value => {
            this.students = await this.studentInfoService.getAvailableStudents(value, 0);


            while (this.teamMemberFormGroups.length !== 0) {
                this.teamMemberFormGroups.removeAt(0);
            }
            this.selected_students = new Set();
            if (Object.keys(this.students).length != 0) {
                let team_member = new FormGroup({
                    uni: new FormControl(Object.keys(this.students)[0])
                });
                this.teamMemberFormGroups.push(team_member);

                this.selected_students.add(Object.keys(this.students)[0]);
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

        });
    }

    onAdd() {

        const call_no = this.addProjectForm.value.call_no;
        const project_members = Array.from(this.selected_students);



        if (project_members.length == 0) {
            alert("Need at least one member!");
        } else if (this.addProjectForm.value.project_name.trim() == ''
            || this.addProjectForm.value.team_name.trim() == '') {
            alert("Cannot have empty fields!");
        } else {
            let data = JSON.stringify({
                project_name: this.addProjectForm.value.project_name,
                team_name: this.addProjectForm.value.team_name,
                project_members: project_members
            });
            this.projectService.addProject(call_no, data)
                .subscribe(data => {
                    alert(data);
                    this.router.navigate(['management'], { state: { active: navbartabs.PROJECT } });
                })
        }

    }

    get teamMemberFormGroups() {
        return this.addProjectForm.get('team_members') as FormArray
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