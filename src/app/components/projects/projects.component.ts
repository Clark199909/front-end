import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Project } from 'src/app/models/project';
import { Filter } from 'src/app/models/filter';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
    displayedColumns = ['section_period', 'project_name', 'team_name', 'team_members', 'manipulations'];
    dataSource!: MatTableDataSource<Project>;
    projectService: ProjectService;
    searchOption: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(projectService: ProjectService) {

        this.projectService = projectService;
        this.searchOption = this.displayedColumns[0];

    }

    ngOnInit(): void {
    }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
    async ngAfterViewInit(): Promise<void> {
        const projects = await this.projectService.getProjects();

        this.dataSource = new MatTableDataSource(projects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Project, filtersJson: string) => {
            const matchFilter: Boolean[] = [];
            const filters: Filter[] = JSON.parse(filtersJson);

            filters.forEach(filter => {
                let val = data[filter.id as keyof Project] === null ? '' : data[filter.id as keyof Project];
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

    deleteProject(project_id: number) {
        this.projectService.deleteProject(project_id).subscribe(data => {
            alert(data);
            this.ngAfterViewInit();
        });
    }

}