import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { StudentInfoService } from "src/app/services/student-info.service";
import { CountryService } from "src/app/services/country.service";
import { ProjectService } from "src/app/services/project.service";
import { Section } from "src/app/models/section";
import { Project } from "src/app/models/project";
import { SectionService } from "src/app/services/section.service";
import { navbartabs } from "src/app/constants/navbartabs";

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
    projectService: ProjectService;
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
    projects!: Project[];
    addToProject: boolean;
    loggedIn = false;


    constructor(private http: HttpClient, private router: Router,
        studentInfoService: StudentInfoService,
        countryService: CountryService,
        sectionService: SectionService,
        projectService: ProjectService) {
        this.studentInfoService = studentInfoService;
        this.countryService = countryService;
        this.sectionService = sectionService;
        this.projectService = projectService;
        this.addToProject = false;
    }

    async ngOnInit(): Promise<void> {
        if (history.state.loggedIn != undefined) {
            this.loggedIn = history.state.loggedIn;
        }
        if (!this.loggedIn) {
            alert("Need to login first!");
        }

        const countries = await this.countryService.getCountries();
        for (let i = 0; i < countries.length; ++i) {
            this.country_names.push(countries[i].text);
        }
        this.sections = await this.sectionService.getSections();
        this.projects = await this.projectService.getProjects();

        const name_arr = history.state.name.split(',');

        this.editStudentForm = new FormGroup(
            {
                uni: new FormControl(history.state.uni, [Validators.required]),
                first_name: new FormControl(name_arr[0], [Validators.required]),
                last_name: new FormControl(name_arr[1], [Validators.required]),
                nationality: new FormControl(history.state.nationality, [Validators.required]),
                race: new FormControl(history.state.race, [Validators.required]),
                gender: new FormControl(history.state.gender, [Validators.required]),
                admission_date: new FormControl(new Date(history.state.admission_date), [Validators.required]),
                call_no: new FormControl(history.state.call_no, [Validators.required]),
                project_id: new FormControl(history.state.project_id)
            }

        );

        if (history.state.project_id != null) {
            this.addToProject = true;
        }
    }

    onEdit() {

        if (this.editStudentForm.invalid) {
            alert("Please fill in all fields!");
            return;
        }

        let uni = this.editStudentForm.value.uni;
        let data = JSON.stringify({
            first_name: this.editStudentForm.value.first_name,
            last_name: this.editStudentForm.value.last_name,
            nationality: this.editStudentForm.value.nationality,
            race: this.editStudentForm.value.race,
            gender: this.editStudentForm.value.gender,
            admission_date: this.editStudentForm.value.admission_date.toLocaleDateString("en-US"),
            call_no: this.editStudentForm.value.call_no,
            project_id: (this.editStudentForm.value.project_id == '') ? null : this.editStudentForm.value.project_id
        });

        this.studentInfoService.editContact(uni, data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['management'], { state: { active: navbartabs.STUDENT, loggedIn: this.loggedIn } });
            })
    }

    addProject(): void {
        if (this.projects.length > 0) {
            this.editStudentForm.patchValue({ 'project_id': this.projects[0].id });
            this.addToProject = true;
        } else {
            alert("No Project Available!");
        }

    }

    deleteProject(): void {
        this.editStudentForm.patchValue({ 'project_id': "" });
        this.addToProject = false;
    }
}