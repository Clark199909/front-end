import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentContact } from '../models/student-contact';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class StudentContactService {

    constructor(private http: HttpClient) {
    }

    async getContacts(): Promise<StudentContact[]> {
        const res = await this.http.get<StudentContact[]>('https://127.0.0.1:5011/api/contacts/all', { withCredentials: true }).toPromise();
        if (res === undefined) {
            const students: StudentContact[] = [];
            return students
        }
        return res;
    }

    addContact(uni: string, type: string, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `https://127.0.0.1:5011/api/contacts/${uni}/add/${type}`;
        return this.http.post(url, body, { 'headers': headers, withCredentials: true });
    }

    editContact(uni: string, type: string, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `https://127.0.0.1:5011/api/contacts/${uni}/update/${type}`;
        return this.http.put(url, body, { 'headers': headers, withCredentials: true });
    }

    deleteContact(uni: string, type: string, note: string): Observable<any> {
        const url = `https://127.0.0.1:5011/api/contacts/${uni}/del/${type}/${note}`;
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
}