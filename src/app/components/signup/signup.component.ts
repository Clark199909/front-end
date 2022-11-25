import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    selector: 'app-signup-component',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

    signupForm!: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.signupForm = new FormGroup(
            {
                username: new FormControl('', [Validators.required, Validators.minLength(4)]),
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', [Validators.required, Validators.minLength(6)])
            }
        );
    }

    onSignup() {

    }
}