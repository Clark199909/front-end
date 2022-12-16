import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentContact } from '../models/student-contact';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BASEPATH } from '../constants/basepath';

@Injectable({
    providedIn: 'root'
})

export class StudentContactService {

    constructor(private http: HttpClient) {
    }

    async getContacts(): Promise<StudentContact[]> {
        const url = `${BASEPATH}/api/contacts/all`;
        const res = await this.http.get<StudentContact[]>(url, { withCredentials: true }).toPromise();
        if (res === undefined) {
            const students: StudentContact[] = [];
            return students
        }
        return res;
    }

    addContact(uni: string, type: string, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/contacts/${uni}/add/${type}`;
        return this.http.post(url, body, { 'headers': headers, withCredentials: true });
    }

    editContact(uni: string, type: string, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/contacts/${uni}/update/${type}`;
        return this.http.put(url, body, { 'headers': headers, withCredentials: true });
    }

    deleteContact(uni: string, type: string, note: string): Observable<any> {
        const url = `${BASEPATH}/api/contacts/${uni}/del/${type}/${note}`;
        return this.http.delete<any>(url, { withCredentials: true });
    }

    parseFormBody(formGroup: FormGroup) {
        let body = "";
        let uni: string = formGroup.value.uni;
        let type: string = formGroup.value.type;
        if (type === 'phone') {
            body = JSON.stringify({
                description: formGroup.value.phone_description,
                country_code: formGroup.value.country_code.toString(),
                phone_no: formGroup.value.phone_no.toString()
            })
        } else if (type === 'address') {
            body = JSON.stringify({
                description: formGroup.value.address_description,
                country: formGroup.value.country,
                state: formGroup.value.state,
                city: formGroup.value.city,
                zip_code: formGroup.value.zip_code.toString(),
                street: formGroup.value.street
            })
        } else {
            body = JSON.stringify({
                description: formGroup.value.email_description,
                address: formGroup.value.address
            })
        }

        return {
            uni: uni,
            type: type,
            body: body
        }
    }

    checkEmail(email: string): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    validateForm(formGroup: FormGroup): boolean {
        if (formGroup.value.type === 'phone') {
            return this.validatePhone(formGroup);
        } else if (formGroup.value.type === 'address') {
            return this.validateAddress(formGroup);
        } else if (formGroup.value.type === 'email') {
            return this.validateEmail(formGroup);
        }
        return false;
    }

    validatePhone(formGroup: FormGroup): boolean {
        const formVals = formGroup.value;
        if (formVals.phone_description.trim() === '' ||
            formVals.country_code.trim() === '' ||
            formVals.phone_no.trim() === '') {
            return false;
        }
        return true;
    }

    validateAddress(formGroup: FormGroup): boolean {
        const formVals = formGroup.value;
        if (formVals.address_description.trim() === '' ||
            formVals.country.trim() === '' ||
            formVals.state.trim() === '' ||
            formVals.city.trim() ||
            formVals.zip_code.trim() ||
            formVals.street.trim()) {
            return false;
        }
        return true;
    }

    validateEmail(formGroup: FormGroup): boolean {
        const formVals = formGroup.value;
        if (formVals.email_description.trim() === '' ||
            formVals.address.trim() === '' ||
            !this.checkEmail(formVals.address.trim())) {
            return false;
        }
        return true;
    }
}