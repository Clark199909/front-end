import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StudentContactService } from "src/app/services/student-contact.service";
import { navbartabs } from "src/app/constants/navbartabs";

@Component({
    selector: 'app-add-contact-component',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})

export class AddContactComponent implements OnInit {

    addContactForm!: FormGroup;
    studentContactService: StudentContactService;
    types: string[] = ['phone', 'address', 'email'];
    phone_desc: string[] = ['home', 'mobile', 'work'];
    address_desc: string[] = ['home', 'campus', 'work'];
    email_desc: string[] = ['personal', 'education', 'work'];
    loggedIn = false;

    constructor(private router: Router, studentContactService: StudentContactService) {
        this.studentContactService = studentContactService;
    }

    ngOnInit(): void {
        if (history.state.loggedIn != undefined) {
            this.loggedIn = history.state.loggedIn;
        }
        if (!this.loggedIn) {
            alert("Need to login first!");
        }

        this.addContactForm = new FormGroup(
            {
                uni: new FormControl('', [Validators.required]),
                type: new FormControl(this.types[0], [Validators.required]),
                phone_description: new FormControl(this.phone_desc[0]),
                country_code: new FormControl(''),
                phone_no: new FormControl(''),
                address_description: new FormControl(this.address_desc[0]),
                country: new FormControl(''),
                state: new FormControl(''),
                city: new FormControl(''),
                zip_code: new FormControl(''),
                street: new FormControl(''),
                email_description: new FormControl(this.email_desc[0]),
                address: new FormControl('')
            }

        );
    }

    onAdd() {

        if (this.addContactForm.invalid || !this.studentContactService.validateForm(this.addContactForm)) {
            alert("Please fill in all required fields!");
            return;
        }

        const data = this.studentContactService.parseFormBody(this.addContactForm);

        this.studentContactService.addContact(data.uni, data.type, data.body)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['management'], { state: { active: navbartabs.CONTACT, loggedIn: this.loggedIn } });
            })
    }
}