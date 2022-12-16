import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
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
    selector: 'app-add-student-info-component',
    templateUrl: './add-student-info.component.html',
    styleUrls: ['./add-student-info.component.css']
})

export class AddStudentComponent implements OnInit {

    addStudentForm!: FormGroup;
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

        this.addStudentForm = new FormGroup(
            {
                uni: new FormControl(''),
                first_name: new FormControl(''),
                last_name: new FormControl(''),
                nationality: new FormControl(this.country_names.length === 0 ? '' : this.country_names[0]),
                race: new FormControl(this.races[0]),
                gender: new FormControl(this.genders[0]),
                admission_date: new FormControl(new Date()),
                call_no: new FormControl(this.sections[0].call_no),
                project_id: new FormControl('')
            }

        );
    }

    onAdd() {
        let data = JSON.stringify({
            uni: this.addStudentForm.value.uni,
            first_name: this.addStudentForm.value.first_name,
            last_name: this.addStudentForm.value.last_name,
            nationality: this.addStudentForm.value.nationality,
            race: this.addStudentForm.value.race,
            gender: this.addStudentForm.value.gender,
            admission_date: this.addStudentForm.value.admission_date.toLocaleDateString("en-US"),
            call_no: this.addStudentForm.value.call_no,
            project_id: (this.addStudentForm.value.project_id == '') ? null : this.addStudentForm.value.project_id
        });

        this.studentInfoService.addStudent(data)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['management'], { state: { active: navbartabs.STUDENT } });
            })
    }

    addProject(): void {
        if (this.projects.length > 0) {
            this.addStudentForm.patchValue({ 'project_id': this.projects[0].id });
            this.addToProject = true;
        } else {
            alert("No Project Available!");
        }

    }

    deleteProject(): void {
        this.addStudentForm.patchValue({ 'project_id': "" });
        this.addToProject = false;
    }
}