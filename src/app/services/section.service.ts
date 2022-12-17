import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/section';
import { Observable } from 'rxjs';
import { BASEPATH } from '../constants/basepath';
import { Base } from './base.service';


@Injectable({
    providedIn: 'root'
})

export class SectionService extends Base {

    constructor(private http: HttpClient) {
        super();
    }

    addSection(body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `/api/courses/new_section`;
        return this.http.post(url, body, { 'headers': this.post_put_headers });
    }

    async getSections(): Promise<Section[]> {
        const url = `/api/courses/all_sections`;
        const res = await this.http.get<Section[]>(url, { headers: this.get_del_headers, withCredentials: true }).toPromise();
        if (res === undefined) {
            const sections: Section[] = [];
            return sections;
        }
        return res;
    }

    deleteSection(call_no: number): Observable<any> {
        const url = `/api/courses/${call_no}`;
        return this.http.delete<any>(url, { headers: this.get_del_headers, withCredentials: true });
    }

    editSection(call_no: number, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `/api/courses/${call_no}`;
        return this.http.put(url, body, { 'headers': this.post_put_headers, withCredentials: true });
    }

}