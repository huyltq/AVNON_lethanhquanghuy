import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Datepicker from 'flowbite-datepicker/Datepicker';
import moment from 'moment';
@Component({
  selector: 'app-calendar-filter',
  imports: [FormsModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './calendar-filter.component.html',
  styleUrl: './calendar-filter.component.css'
})

export class CalendarFilterComponent {
  form: FormGroup = new FormGroup({});
  @Output() changeDate = new EventEmitter<any>();
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      from: ['2024-01'],
      to: ['2024-12']
    });
    this.emitChangeDate();
  }
  changeFrom($event) {
    const fromDate: Date = new Date($event.target.value);
    const toDate: Date = new Date(this.form.controls['to'].value);
    if (toDate && toDate < fromDate) {
      const newToDate = new Date(moment(fromDate).add(1, 'year').format('YYYY-MM-DD').toString());
      this.form.controls['to'].setValue(`${newToDate.getFullYear()}-${newToDate.getMonth() < 10 ? '0' + newToDate.getMonth() : newToDate.getMonth()}`);
    }
    this.emitChangeDate();
  }
  changeTo($event) {
    const toDate: Date = new Date($event.target.value);
    const fromDate: Date = new Date(this.form.controls['from'].value);
    if (fromDate && fromDate > toDate) {
      const newfromDate = new Date(moment(toDate).subtract(1, 'year').format('YYYY-MM-DD').toString());
      this.form.controls['from'].setValue(`${newfromDate.getFullYear()}-${newfromDate.getMonth() < 10 ? '0' + newfromDate.getMonth() : newfromDate.getMonth()}`);
    }
    this.emitChangeDate();
  }
  emitChangeDate() {
    this.changeDate.emit({
      fromDate: this.form.controls['from'].value,
      toDate: this.form.controls['to'].value
    });
  }
}
