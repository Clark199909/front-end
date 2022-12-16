import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/section';
import { Observable } from 'rxjs';
import { BASEPATH } from '../constants/basepath';


@Injectable({
    providedIn: 'root'
})

export class SectionService {

    constructor(private http: HttpClient) {
    }

    addSection(body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/courses/new_section`;
        return this.http.post(url, body, { 'headers': headers });
    }

    async getSections(): Promise<Section[]> {
        const url = `${BASEPATH}/api/courses/all_sections`;
        const res = await this.http.get<Section[]>(url, { withCredentials: true }).toPromise();
        if (res === undefined) {
            const sections: Section[] = [];
            return sections;
        }
        return res;
    }

    deleteSection(call_no: number): Observable<any> {
        const url = `${BASEPATH}/api/courses/${call_no}`;
        return this.http.delete<any>(url, { withCredentials: true });
    }

    editSection(call_no: number, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/courses/${call_no}`;
        return this.http.put(url, body, { 'headers': headers, withCredentials: true });
    }

}