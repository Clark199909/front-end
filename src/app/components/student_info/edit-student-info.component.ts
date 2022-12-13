import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { StudentInfoService } from "src/app/services/student-info.service";
import { CountryService } from "src/app/services/country.service";
import { Section } from "src/app/models/section";
import { SectionService } from "src/app/services/section.service";

@Component({
    selector: 'app-edit-student-info-component',
    templateUrl: './edit-student-info.component.html',
    styleUrls: ['./edit-student-info.component.css']
})

export class EditStudentComponent implements OnInit {

    editStudentForm!: FormGroup;
    studentInfoService: StudentInfoService;
    countryService: CountryService;
    sectionService: SectionService;
    country_names: string[] = [];
    races: string[] =
        [
            'American Indian or Alaska Native',
            'Asian',
            'Native Hawaiian or Other Pacific Islander',
            'Black or African American',
            'white'
        ];
    genders: string[] =
        [
            'Agender',
            'Female/Woman',
            'Genderqueer',
            'Gender Fluid',
            'Gender Non-Conforming',
            'Intergender',
            'Intersex',
            'Male/Man',
            'Nonbinary',
            'Other',
            'Transgender',
            'Trans Man/Male',
            'Trans Woman/Female'
        ]
    sections!: Section[];


    constructor(private http: HttpClient, private router: Router,
        studentInfoService: StudentInfoService,
        countryService: CountryService,
        sectionService: SectionService) {
        this.studentInfoService = studentInfoService;
        this.countryService = countryService;
        this.sectionService = sectionService;
    }

    async ngOnInit(): Promise<void> {
        const countries = await this.countryService.getCountries();
        for (let i = 0; i < countries.length; ++i) {
            this.country_names.push(countries[i].text);
        }
        this.sections = await this.sectionService.getSections();

        const name_arr = history.state.name.split(',');

        this.editStudentForm = new FormGroup(
            {
                uni: new FormControl(history.state.uni),
                first_name: new FormControl(name_arr[0]),
                last_name: new FormControl(name_arr[1]),
                nationality: new FormControl(history.state.nationality),
                race: new FormControl(history.state.race),
                gender: new FormControl(history.state.gender),
                admission_date: new FormControl(new Date(history.state.admission_date)),
                call_no: new FormControl(history.state.call_no),
                project_id: new FormControl(history.state.project_id)
            }

        );
    }

    onEdit() {
        let uni = this.editStudentForm.value.uni;
        let data = JSON.stringify({
            first_name: this.editStudentForm.value.first_name,
            last_name: this.editStudentForm.value.last_name,
            nationality: this.editStudentForm.value.nationality,
            race: this.editStudentForm.value.race,
            gender: this.editStudentForm.value.gender,
            admission_date: this.editStudentForm.value.admission_date.toLocaleDateString("en-US"),
            call_no: this.editStudentForm.value.call_no,
            project_id: this.editStudentForm.value.project_id,
        });

        this.studentInfoService.editContact(uni, data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['']);
            })
    }
}