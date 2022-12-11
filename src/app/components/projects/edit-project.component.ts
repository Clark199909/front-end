import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/services/section.service';
import { ProjectService } from 'src/app/services/project.service';
import { Section } from 'src/app/models/section';

@Component({
    selector: 'edit-project-component',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

    editProjectForm!: FormGroup;
    projectService: ProjectService;
    sectionService: SectionService;
    sections!: Section[];
    project_id!: number;

    constructor(private router: Router, sectionService: SectionService, projectService: ProjectService) {
        this.sectionService = sectionService;
        this.projectService = projectService;
    }

    async ngOnInit() {
        this.project_id = history.state.project_id;
        this.editProjectForm = new FormGroup(
            {
                project_name: new FormControl(history.state.project_name),
                team_name: new FormControl(history.state.team_name)
            }

        );

    }

    onEdit() {
        let data = JSON.stringify({
            project_name: this.editProjectForm.value.project_name,
            team_name: this.editProjectForm.value.team_name
        });

        this.projectService.editProject(this.project_id, data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['']);
            })
    }
}