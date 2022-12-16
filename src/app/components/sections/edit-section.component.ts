import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/services/section.service';
import { navbartabs } from "src/app/constants/navbartabs";

@Component({
    selector: 'edit-section-component',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent {

    editSectionForm!: FormGroup;
    sectionService: SectionService;
    semesters: string[] = ['Fall', 'Spring', 'Summer'];
    days_opts: string[] = ['M', 'T', 'W', 'R', 'F', 'MW', 'TR', 'MWF'];
    section_types: string[] = ['in_person', 'CVN']
    call_no!: number;
    loggedIn = false;

    constructor(private router: Router, sectionService: SectionService) {
        this.sectionService = sectionService;
    }

    ngOnInit() {
        if (history.state.loggedIn != undefined) {
            this.loggedIn = history.state.loggedIn;
        }
        if (!this.loggedIn) {
            alert("Need to login first!");
        }

        this.call_no = history.state.call_no;
        this.editSectionForm = new FormGroup(
            {
                year: new FormControl(history.state.year),
                semester: new FormControl(history.state.semester),
                day: new FormControl(history.state.day),
                start_hr: new FormControl(history.state.start_hr),
                start_min: new FormControl(history.state.start_min),
                end_hr: new FormControl(history.state.end_hr),
                end_min: new FormControl(history.state.end_min),
                professor: new FormControl(history.state.professor),
                classroom: new FormControl(history.state.classroom),
                section_type: new FormControl(history.state.section_type)
            }

        );

    }

    onEdit() {
        let data = JSON.stringify({
            year: this.editSectionForm.value.year,
            semester: this.editSectionForm.value.semester,
            day: this.editSectionForm.value.day,
            start_hr: this.editSectionForm.value.start_hr,
            start_min: this.editSectionForm.value.start_min,
            end_hr: this.editSectionForm.value.end_hr,
            end_min: this.editSectionForm.value.end_min,
            professor: this.editSectionForm.value.professor,
            classroom: this.editSectionForm.value.classroom,
            section_type: this.editSectionForm.value.section_type
        });

        this.sectionService.editSection(this.call_no, data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['management'], { state: { active: navbartabs.SECTION } });
            })
    }
}