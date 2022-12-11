import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { SectionService } from "src/app/services/section.service";
import { Section } from "src/app/models/section";

@Component({
    selector: 'app-add-project-component',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

    addProjectForm!: FormGroup;
    projectService: ProjectService;
    sectionService: SectionService;
    sections!: Section[];


    constructor(private router: Router, projectService: ProjectService, sectionService: SectionService) {
        this.projectService = projectService;
        this.sectionService = sectionService;
    }

    async ngOnInit(): Promise<void> {
        this.sections = await this.sectionService.getSections();
        this.addProjectForm = new FormGroup(
            {
                call_no: new FormControl(this.sections[0].call_no),
                project_name: new FormControl(''),
                team_name: new FormControl('')
            }

        );
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
}