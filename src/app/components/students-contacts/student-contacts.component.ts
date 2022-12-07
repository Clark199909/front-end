import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

import { StudentContact } from 'src/app/models/student-contact';
import { Filter } from 'src/app/models/filter';
import { StudentContactService } from 'src/app/services/student-contact.service';

@Component({
    selector: 'app-student-contacts',
    templateUrl: './student-contacts.component.html',
    styleUrls: ['./student-contacts.component.css']
})

export class StudentContactsComponent implements OnInit {
    displayedColumns = ['uni', 'name', 'type', 'note', 'content', 'manipulations'];
    dataSource!: MatTableDataSource<StudentContact>;
    studentContactService: StudentContactService;
    searchOption: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(studentContactService: StudentContactService) {

        this.studentContactService = studentContactService;
        this.searchOption = this.displayedColumns[0];

    }

    ngOnInit(): void {
    }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
    async ngAfterViewInit(): Promise<void> {
        const contacts = await this.studentContactService.getContacts();

        this.dataSource = new MatTableDataSource(contacts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: StudentContact, filtersJson: string) => {
            const matchFilter: Boolean[] = [];
            const filters: Filter[] = JSON.parse(filtersJson);

            filters.forEach(filter => {
                let val = data[filter.id as keyof StudentContact] === null ? '' : data[filter.id as keyof StudentContact];
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

    deleteContact(uni: string, type: string, note: string) {
        this.studentContactService.deleteContact(uni, type, note).subscribe(() => {
            alert('Delete successful');
            this.ngAfterViewInit();
        });
    }

}