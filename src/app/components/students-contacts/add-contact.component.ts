import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { StudentContactService } from "src/app/services/student-contact.service";
import { StudentPhone } from "src/app/models/student-phone";
import { StudentAddress } from "src/app/models/student-address";
import { StudentEmail } from "src/app/models/student-email";

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

    constructor(private router: Router, studentContactService: StudentContactService) {
        this.studentContactService = studentContactService;
    }

    ngOnInit(): void {
        this.addContactForm = new FormGroup(
            {
                uni: new FormControl(''),
                type: new FormControl(this.types[0]),
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
        const data = this.studentContactService.parseFormBody(this.addContactForm);

        this.studentContactService.addContact(data.uni, data.type, data.body)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['']);
            })
    }
}