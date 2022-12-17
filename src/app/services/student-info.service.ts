import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentInfo } from '../models/student-info';
import { Observable } from 'rxjs';
import { BASEPATH } from '../constants/basepath';
import { Base } from './base.service';

@Injectable({
    providedIn: 'root'
})

export class StudentInfoService extends Base {

    constructor(private http: HttpClient) {
        super();
    }

    async getStudents(): Promise<StudentInfo[]> {
        const url = `/api/students/all`;
        const res = await this.http.get<StudentInfo[]>(url, { headers: this.get_del_headers, withCredentials: true }).toPromise();
        if (res === undefined) {
            const students: StudentInfo[] = [];
            return students
        }
        return res;
    }

    async getAvailableStudents(call_no: number, project_id: number): Promise<{ [key: string]: string }> {
        const url = `/api/courses/${call_no}/projects/${project_id}/available_students`;
        const res = await this.http.get<{ [key: string]: string }>(url, { headers: this.get_del_headers, withCredentials: true }).toPromise();
        if (res === undefined) {
            const student_names: { [key: string]: string } = {};
            return student_names
        }
        return res;
    }

    deleteStudent(call_no: number, uni: string): Observable<any> {
        const url = `/api/students/delete/${call_no}/${uni}`;
        return this.http.delete<any>(url, { headers: this.get_del_headers, withCredentials: true });
    }

    addStudent(body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `/api/students/add`
        return this.http.post(url, body, { 'headers': this.post_put_headers })
    }

    editContact(uni: string, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `/api/students/update/${uni}`;
        return this.http.put(url, body, { 'headers': this.post_put_headers, withCredentials: true });
    }
}