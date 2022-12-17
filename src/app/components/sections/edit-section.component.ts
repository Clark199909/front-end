import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
        let start_time = new Date();
        start_time.setHours(history.state.start_hr);
        start_time.setMinutes(history.state.start_min);

        let end_time = new Date();
        end_time.setHours(history.state.end_hr);
        end_time.setMinutes(history.state.end_min);
        this.editSectionForm = new FormGroup(
            {
                year: new FormControl(history.state.year, [Validators.required]),
                semester: new FormControl(history.state.semester, [Validators.required]),
                day: new FormControl(history.state.day, [Validators.required]),
                start_time: new FormControl(start_time, [Validators.required]),
                end_time: new FormControl(end_time, [Validators.required]),
                professor: new FormControl(history.state.professor, [Validators.required]),
                classroom: new FormControl(history.state.classroom, [Validators.required]),
                section_type: new FormControl(history.state.section_type, [Validators.required])
            }

        );

    }

    onEdit() {

        if (this.editSectionForm.invalid) {
            alert("Please fill in all fields!");
            return;
        }

        let data = JSON.stringify({
            year: this.editSectionForm.value.year,
            semester: this.editSectionForm.value.semester,
            day: this.editSectionForm.value.day,
            start_hr: new Date(this.editSectionForm.value.start_time).getHours(),
            start_min: new Date(this.editSectionForm.value.start_time).getMinutes(),
            end_hr: new Date(this.editSectionForm.value.end_time).getHours(),
            end_min: new Date(this.editSectionForm.value.end_time).getMinutes(),
            professor: this.editSectionForm.value.professor,
            classroom: this.editSectionForm.value.classroom,
            section_type: this.editSectionForm.value.section_type
        });

        this.sectionService.editSection(this.call_no, data)
            .subscribe({
                next: () => {
                    alert("Edit successfully!");
                    this.router.navigate(['management'], { state: { active: navbartabs.SECTION, loggedIn: this.loggedIn } });
                },
                error: () => {
                    alert("Edit failed!");
                }
            })
    }
}