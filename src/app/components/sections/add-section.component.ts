import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { SectionService } from "src/app/services/section.service";

@Component({
    selector: 'app-add-section-component',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.css']
})

export class AddSectionComponent implements OnInit {

    addSectionForm!: FormGroup;
    sectionService: SectionService;
    semesters: string[] = ['Fall', 'Spring', 'Summer'];
    days_opts: string[] = ['M', 'T', 'W', 'R', 'F', 'MW', 'TR', 'MWF'];
    section_types: string[] = ['in_person', 'CVN']


    constructor(private router: Router, sectionService: SectionService) {
        this.sectionService = sectionService;
    }

    ngOnInit(): void {
        this.addSectionForm = new FormGroup(
            {
                year: new FormControl(''),
                semester: new FormControl(this.semesters[0]),
                day: new FormControl(this.days_opts[0]),
                start_hr: new FormControl(''),
                start_min: new FormControl(''),
                end_hr: new FormControl(''),
                end_min: new FormControl(''),
                professor: new FormControl(''),
                classroom: new FormControl(''),
                section_type: new FormControl(this.section_types[0])
            }

        );
    }

    onAdd() {

        let data = JSON.stringify({
            year: this.addSectionForm.value.year,
            semester: this.addSectionForm.value.semester,
            day: this.addSectionForm.value.day,
            start_hr: this.addSectionForm.value.start_hr,
            start_min: this.addSectionForm.value.start_min,
            end_hr: this.addSectionForm.value.end_hr,
            end_min: this.addSectionForm.value.end_min,
            professor: this.addSectionForm.value.professor,
            classroom: this.addSectionForm.value.classroom,
            section_type: this.addSectionForm.value.section_type
        });

        this.sectionService.addSection(data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['']);
            })
    }
}