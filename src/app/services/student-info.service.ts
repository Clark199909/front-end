import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentInfo } from '../models/student-info';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StudentInfoService {

    constructor(private http: HttpClient) {
    }

    async getStudents(): Promise<StudentInfo[]> {
        const res = await this.http.get<StudentInfo[]>('https://127.0.0.1:5011/api/students/all', { withCredentials: true }).toPromise();
        if (res === undefined) {
            const students: StudentInfo[] = [];
            return students
        }
        return res;
    }

    async getAvailableStudents(call_no: number, project_id: number): Promise<{ [key: string]: string }> {
        const url = `https://127.0.0.1:5011/api/courses/${call_no}/projects/${project_id}/available_students`;
        const res = await this.http.get<{ [key: string]: string }>(url, { withCredentials: true }).toPromise();
        if (res === undefined) {
            const student_names: { [key: string]: string } = {};
            return student_names
        }
        return res;
    }

    deleteStudent(call_no: number, uni: string): Observable<any> {
        const url = `https://127.0.0.1:5011/api/students/delete/${call_no}/${uni}`;
        return this.http.delete<any>(url, { withCredentials: true });
    }

    addStudent(body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `https://127.0.0.1:5011/api/students/add`
        return this.http.post(url, body, { 'headers': headers })
    }

    editContact(uni: string, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `https://127.0.0.1:5011/api/students/update/${uni}`;
        return this.http.put(url, body, { 'headers': headers, withCredentials: true });
    }
}