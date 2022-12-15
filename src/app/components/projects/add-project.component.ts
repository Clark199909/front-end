import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { SectionService } from "src/app/services/section.service";
import { StudentInfoService } from "src/app/services/student-info.service";
import { Section } from "src/app/models/section";
import { startWith, pairwise } from 'rxjs/operators';

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
        this.sections = await this.sectionService.getSections();
        this.students = await this.studentInfoService.getStudentsWithNoProject(this.sections[0].call_no);
        let new_team_member = new FormGroup({
            uni: new FormControl(Object.keys(this.students)[0])
        });
        this.addProjectForm = new FormGroup(
            {
                call_no: new FormControl(this.sections[0].call_no),
                project_name: new FormControl(''),
                team_name: new FormControl(''),
                team_members: new FormArray([new_team_member])
            }
        );

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

    onAdd() {

        let call_no = this.addProjectForm.value.call_no

        let data = JSON.stringify({
            project_name: this.addProjectForm.value.project_name,
            team_name: this.addProjectForm.value.team_name
        });

        this.projectService.addProject(call_no, data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['']);
            })
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