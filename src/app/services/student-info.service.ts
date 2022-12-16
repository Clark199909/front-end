import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentInfo } from '../models/student-info';
import { Observable } from 'rxjs';
import { BASEPATH } from '../constants/basepath';

@Injectable({
    providedIn: 'root'
})

export class StudentInfoService {

    constructor(private http: HttpClient) {
    }

    async getStudents(): Promise<StudentInfo[]> {
        const url = `${BASEPATH}/api/students/all`;
        const res = await this.http.get<StudentInfo[]>(url, { withCredentials: true }).toPromise();
        if (res === undefined) {
            const students: StudentInfo[] = [];
            return students
        }
        return res;
    }

    async getAvailableStudents(call_no: number, project_id: number): Promise<{ [key: string]: string }> {
        const url = `${BASEPATH}/api/courses/${call_no}/projects/${project_id}/available_students`;
        const res = await this.http.get<{ [key: string]: string }>(url, { withCredentials: true }).toPromise();
        if (res === undefined) {
            const student_names: { [key: string]: string } = {};
            return student_names
        }
        return res;
    }

    deleteStudent(call_no: number, uni: string): Observable<any> {
        const url = `${BASEPATH}/api/students/delete/${call_no}/${uni}`;
        return this.http.delete<any>(url, { withCredentials: true });
    }

    addStudent(body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/students/add`
        return this.http.post(url, body, { 'headers': headers })
    }

    editContact(uni: string, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/students/update/${uni}`;
        return this.http.put(url, body, { 'headers': headers, withCredentials: true });
    }
}