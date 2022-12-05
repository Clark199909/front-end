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
        const res = await this.http.get<StudentInfo[]>('https://localhost:5011/api/students/all', { withCredentials: true }).toPromise();
        if (res === undefined) {
            const students: StudentInfo[] = [];
            return students
        }
        return res;
    }
}