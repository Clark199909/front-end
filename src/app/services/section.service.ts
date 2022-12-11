import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseSection } from '../models/course-section';
import { Section } from '../models/section';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class SectionService {

    constructor(private http: HttpClient) {
    }

    addSection(body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        return this.http.post('https://127.0.0.1:5011/api/courses/new_section', body, { 'headers': headers })
    }

    async getSections(): Promise<Section[]> {
        const res = await this.http.get<Section[]>('https://127.0.0.1:5011/api/courses/all_sections', { withCredentials: true }).toPromise();
        if (res === undefined) {
            const sections: Section[] = [];
            return sections
        }
        return res;
    }

    deleteSection(call_no: number): Observable<any> {
        const url = `https://127.0.0.1:5011/api/courses/${call_no}`;
        return this.http.delete<any>(url, { withCredentials: true });
    }

    editSection(call_no: number, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `https://127.0.0.1:5011/api/courses/${call_no}`;
        return this.http.put(url, body, { 'headers': headers, withCredentials: true });
    }

}