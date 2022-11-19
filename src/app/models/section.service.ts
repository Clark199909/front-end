import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseSection } from '../services/course-section';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SectionService {

    constructor(private http: HttpClient) {
    }

    addSection(courseSection: CourseSection): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(courseSection);
        console.log(body)
        return this.http.post('http://localhost:5011/api/sections/new_section', body, { 'headers': headers })
    }
}