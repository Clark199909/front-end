import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

import { Section } from 'src/app/models/section';
import { Filter } from 'src/app/models/filter';
import { SectionService } from 'src/app/services/section.service';

@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.css']
})

export class SectionsComponent implements OnInit {
    displayedColumns = ['semester', 'days', 'time', 'professor', 'classroom', 'projects_num', 'enrollments_num', 'manipulations'];
    dataSource!: MatTableDataSource<Section>;
    sectionService: SectionService;
    searchOption: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(sectionService: SectionService) {

        this.sectionService = sectionService;
        this.searchOption = this.displayedColumns[0];

    }

    ngOnInit(): void {
    }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
    async ngAfterViewInit(): Promise<void> {
        const contacts = await this.sectionService.getSections();

        this.dataSource = new MatTableDataSource(contacts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Section, filtersJson: string) => {
            const matchFilter: Boolean[] = [];
            const filters: Filter[] = JSON.parse(filtersJson);

            filters.forEach(filter => {
                let val = data[filter.id as keyof Section] === null ? '' : data[filter.id as keyof Section];
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

    deleteSection(call_no: number) {
        this.sectionService.deleteSection(call_no).subscribe(() => {
            alert('Delete successful');
            this.ngAfterViewInit();
        });
    }

}