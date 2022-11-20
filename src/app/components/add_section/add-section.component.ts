import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SectionService } from 'src/app/services/section.service';
import { CourseSection } from 'src/app/models/course-section';

@Component({
    selector: 'app-add-section',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.css']
})

export class AddSectionComponent implements OnInit {

    toggleSection: boolean;
    year: number;
    semester: string;
    day: string;
    start_hr: number;
    start_min: number;
    end_hr: number;
    end_min: number;
    professor: string;
    classroom: string;
    section_type: string;
    sectionService: SectionService;

    constructor(sectionService: SectionService) {
        this.toggleSection = false;
        this.year = 2022;
        this.semester = "Fall";
        this.day = "MW";
        this.start_hr = 8;
        this.start_min = 0;
        this.end_hr = 8;
        this.end_min = 45;
        this.professor = "";
        this.classroom = "";
        this.section_type = "CVN";
        this.sectionService = sectionService;
    }

    ngOnInit(): void {
    }

    toggleCard(cardId: string): void {
        if (cardId == 'artist') {
            this.toggleSection = !this.toggleSection;
        }
    }

    addSection(): void {
        const courseSection: CourseSection = {
            year: this.year,
            semester: this.semester,
            day: this.day,
            start_hr: this.start_hr,
            start_min: this.start_min,
            end_hr: this.end_hr,
            end_min: this.end_min,
            professor: this.professor,
            classroom: this.classroom,
            section_type: this.section_type
        };
        this.sectionService.addSection(courseSection)
            .subscribe(data => {
                console.log(data)
            })
    }
}