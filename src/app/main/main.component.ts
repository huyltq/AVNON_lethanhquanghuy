import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarFilterComponent } from './calendar-filter/calendar-filter.component';
import { FilterDataComponent } from './filter-data/filter-data.component';
import moment from 'moment';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [CalendarFilterComponent, FilterDataComponent]
})
export class MainComponent {
    from: string = '';
    to: string = '';
    listMonths: string[] = [];
    theMonths: string[] = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"];
    constructor() { }
    changeDate($event) {
        var from = new Date($event?.fromDate);
        const to = new Date($event?.toDate);
        this.listMonths = [];
        this.listMonths.push(`${this.theMonths[from.getMonth()]} ${from.getFullYear()}`)
        while (from < to) {
            from = new Date(moment(from).add(1, 'month').format('YYYY-MM-DD').toString());
            this.listMonths.push(`${this.theMonths[from.getMonth()]} ${from.getFullYear()}`);
        }
        console.log(this.listMonths);
    }
}
