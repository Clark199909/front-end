import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { BASEPATH } from '../constants/basepath';


@Injectable({
    providedIn: 'root'
})

export class ProjectService {

    constructor(private http: HttpClient) {
    }

    async getProjects(): Promise<Project[]> {
        const url = `${BASEPATH}/api/courses/all_projects`;
        const res = await this.http.get<Project[]>(url, { withCredentials: true }).toPromise();
        if (res === undefined) {
            const projects: Project[] = [];
            return projects
        }
        return res;
    }

    deleteProject(call_no: number, project_id: number): Observable<any> {
        const url = `${BASEPATH}/api/courses/${call_no}/projects/${project_id}`;
        return this.http.delete<any>(url, { withCredentials: true });
    }

    addProject(call_no: number, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/courses/${call_no}/new_project`
        return this.http.post(url, body, { 'headers': headers })
    }

    editProject(call_no: number, project_id: number, body: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const url = `${BASEPATH}/api/courses/${call_no}/projects/${project_id}`;
        return this.http.put(url, body, { 'headers': headers, withCredentials: true });
    }

}