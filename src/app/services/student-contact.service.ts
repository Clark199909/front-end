import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentContact } from '../models/student-contact';
import { Observable } from 'rxjs';

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

    deleteContact(uni: string, type: string, note: string) {
        const url = `https://127.0.0.1:5011/api/contacts/${uni}/del/${type}/${note}`;
        return this.http.delete<any>(url, { withCredentials: true });
    }
}