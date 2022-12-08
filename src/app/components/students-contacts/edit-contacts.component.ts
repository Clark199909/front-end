import { Component, Input } from '@angular/core';

@Component({
    selector: 'edit-contacts-component',
    templateUrl: './edit-contacts-component.html',
    styleUrls: ['./edit-contacts-component.css']
})
export class EditContactsComponent {

    @Input()
    customTitle!: string;

    constructor() {
    }

    ngOnInit() {
        console.log(this.customTitle);
    }
}