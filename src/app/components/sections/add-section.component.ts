import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SectionService } from "src/app/services/section.service";
import { navbartabs } from "src/app/constants/navbartabs";

@Component({
    selector: 'app-add-section-component',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.css']
})

export class AddSectionComponent implements OnInit {

    addSectionForm!: FormGroup;
    sectionService: SectionService;
    years: number[] = [];
    semesters: string[] = ['Fall', 'Spring', 'Summer'];
    days_opts: string[] = ['M', 'T', 'W', 'R', 'F', 'MW', 'TR', 'MWF'];
    section_types: string[] = ['in_person', 'CVN']
    loggedIn = false;

    constructor(private router: Router, sectionService: SectionService) {
        this.sectionService = sectionService;
    }

    ngOnInit(): void {
        if (history.state.loggedIn != undefined) {
            this.loggedIn = history.state.loggedIn;
        }
        if (!this.loggedIn) {
            alert("Need to login first!");
        }

        const cur_year = new Date().getFullYear();
        for (let y = 2000; y <= cur_year + 5; y++) {
            this.years.push(y);
        }

        this.addSectionForm = new FormGroup(
            {
                year: new FormControl(cur_year, [Validators.required]),
                semester: new FormControl(this.semesters[0], [Validators.required]),
                day: new FormControl(this.days_opts[0], [Validators.required]),
                start_time: new FormControl('', [Validators.required]),
                end_time: new FormControl('', [Validators.required]),
                professor: new FormControl('', [Validators.required]),
                classroom: new FormControl('', [Validators.required]),
                section_type: new FormControl(this.section_types[0], [Validators.required])
            }

        );
    }

    onAdd() {

        console.log(new Date(this.addSectionForm.value.start_time).getMinutes())

        if (this.addSectionForm.invalid) {
            alert("Please fill in all fields!");
            return;
        }

        let data = JSON.stringify({
            year: this.addSectionForm.value.year,
            semester: this.addSectionForm.value.semester,
            day: this.addSectionForm.value.day,
            start_hr: new Date(this.addSectionForm.value.start_time).getHours(),
            start_min: new Date(this.addSectionForm.value.start_time).getMinutes(),
            end_hr: new Date(this.addSectionForm.value.end_time).getHours(),
            end_min: new Date(this.addSectionForm.value.end_time).getMinutes(),
            professor: this.addSectionForm.value.professor,
            classroom: this.addSectionForm.value.classroom,
            section_type: this.addSectionForm.value.section_type
        });

        this.sectionService.addSection(data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['management'], { state: { active: navbartabs.SECTION, loggedIn: this.loggedIn } });
            })
    }
}