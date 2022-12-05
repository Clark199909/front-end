import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

import { StudentInfo } from 'src/app/models/student-info';
import { StudentInfoService } from 'src/app/services/student-info.service';

@Component({
    selector: 'app-student-info',
    templateUrl: './student-info.component.html',
    styleUrls: ['./student-info.component.css']
})

export class StudentInfoComponent implements OnInit {
    displayedColumns = ['uni', 'name', 'nationality', 'ethnicity', 'gender', 'admission_date', 'manipulations'];
    dataSource!: MatTableDataSource<StudentInfo>;
    studentInfoService: StudentInfoService;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(studentInfoService: StudentInfoService) {

        this.studentInfoService = studentInfoService;

    }

    ngOnInit(): void {
    }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
    async ngAfterViewInit(): Promise<void> {
        const students = await this.studentInfoService.getStudents();

        this.dataSource = new MatTableDataSource(students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}