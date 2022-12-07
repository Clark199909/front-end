import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentInfo } from '../models/student-info';

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
}