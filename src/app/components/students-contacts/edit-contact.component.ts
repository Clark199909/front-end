import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentContactService } from 'src/app/services/student-contact.service';

@Component({
    selector: 'edit-contacts-component',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {

    // @Input()
    // customTitle!: string;
    editContactForm!: FormGroup;
    phone_desc: string[] = ['home', 'mobile', 'work'];
    address_desc: string[] = ['home', 'campus', 'work'];
    email_desc: string[] = ['personal', 'education', 'work'];
    studentContactService: StudentContactService;
    // uni!: string;
    // type!: string;
    // description!: string;
    // content!: string;

    constructor(private router: Router, studentContactService: StudentContactService) {
        this.studentContactService = studentContactService;
    }

    ngOnInit() {
        const uni = history.state.uni;
        const type = history.state.type;
        const description = history.state.description;
        const content = history.state.content;

        this.editContactForm = new FormGroup(
            {
                uni: new FormControl(''),
                type: new FormControl(type),
                phone_description: new FormControl(""),
                country_code: new FormControl(''),
                phone_no: new FormControl(''),
                address_description: new FormControl(""),
                country: new FormControl(''),
                state: new FormControl(''),
                city: new FormControl(''),
                zip_code: new FormControl(''),
                street: new FormControl(''),
                email_description: new FormControl(""),
                address: new FormControl('')
            }

        );

        if (type === 'phone') {
            const content_arr = content.split(' ');
            const country_code = content_arr[0].trim();
            const phone_no = content_arr[1].trim();

            this.editContactForm.patchValue(
                {
                    uni: uni,
                    phone_description: description,
                    country_code: country_code,
                    phone_no: phone_no
                }
            );

        } else if (type === 'address') {
            const content_arr = content.split(',');
            const street = content_arr[0].trim();
            const city = content_arr[1].trim();
            const state = content_arr[2].trim();
            const country = content_arr[3].trim();
            const zip_code = content_arr[4].trim();
            this.editContactForm.patchValue(
                {
                    uni: uni,
                    address_description: description,
                    country: country,
                    state: state,
                    city: city,
                    street: street,
                    zip_code: zip_code
                }
            );
        } else {
            this.editContactForm.patchValue(
                {
                    uni: uni,
                    email_description: description,
                    address: content.trim()
                }
            );
        }


    }

    onEdit() {
        let body = "";
        let uni: string = this.editContactForm.value.uni;
        let type: string = this.editContactForm.value.type;
        if (type === 'phone') {
            body = JSON.stringify({
                description: this.editContactForm.value.phone_description,
                country_code: this.editContactForm.value.country_code.toString(),
                phone_no: this.editContactForm.value.phone_no.toString()
            })
        } else if (type === 'address') {
            body = JSON.stringify({
                description: this.editContactForm.value.address_description,
                country: this.editContactForm.value.country,
                state: this.editContactForm.value.state,
                city: this.editContactForm.value.city,
                zip_code: this.editContactForm.value.zip_code.toString(),
                street: this.editContactForm.value.street
            })
        } else {
            body = JSON.stringify({
                description: this.editContactForm.value.email_description,
                address: this.editContactForm.value.address
            })
        }

        this.studentContactService.editContact(uni, type, body)
            .subscribe(data => {
                alert(data);
                this.router.navigate(['']);
            })
    }
}