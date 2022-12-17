import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

import { StudentInfo } from 'src/app/models/student-info';
import { Filter } from 'src/app/models/filter';
import { StudentInfoService } from 'src/app/services/student-info.service';

@Component({
    selector: 'app-student-info',
    templateUrl: './student-info.component.html',
    styleUrls: ['./student-info.component.css']
})

export class StudentInfoComponent implements OnInit {
    displayedColumns = ['uni', 'name', 'nationality', 'race', 'gender', 'admission_date', 'section_period', 'project_name', 'team_name', 'manipulations'];
    dataSource!: MatTableDataSource<StudentInfo>;
    studentInfoService: StudentInfoService;
    searchOption: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(studentInfoService: StudentInfoService) {

        this.studentInfoService = studentInfoService;
        this.searchOption = this.displayedColumns[0];

    }

    ngOnInit(): void {
    }

    async ngAfterViewInit(): Promise<void> {
        const students = await this.studentInfoService.getStudents();

        this.dataSource = new MatTableDataSource(students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: StudentInfo, filtersJson: string) => {
            const matchFilter: Boolean[] = [];
            const filters: Filter[] = JSON.parse(filtersJson);

            filters.forEach(filter => {
                let val = data[filter.id as keyof StudentInfo] === null ? '' : data[filter.id as keyof StudentInfo];
                if (typeof val === "number") {
                    val = val.toString();
                }
                matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
        };
    }

    applyFilter(event: Event) {
        let filterValue = (event.target as HTMLInputElement).value
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();

        const tableFilters: Filter[] = [];
        tableFilters.push({
            id: this.searchOption,
            value: filterValue
        });
        this.dataSource.filter = JSON.stringify(tableFilters);
    }

    deleteStudent(call_no: number, uni: string): void {
        this.studentInfoService.deleteStudent(call_no, uni).subscribe({
            next: () => {
                alert('Delete successfully!');
                this.ngAfterViewInit();
            },
            error: () => {
                alert("Delete failed!");
            }

        });
    }

}