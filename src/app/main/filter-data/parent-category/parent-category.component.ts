import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-parent-category',
    imports: [FormsModule,
        ReactiveFormsModule, CommonModule],
    templateUrl: './parent-category.component.html',
    styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent {
    title = 'ANVON_ASSESSMENT_TASK_LETHANHQUANGHUY';
    @Input() listMonths: string[] = [];
    @Input() data: any = {
        title: 'General',
        subData: [{
            title: 'Sales 200 400',
            data: []
        }, {}, {}]
    };
    @Output() deleteParent = new EventEmitter<any>();

    newLine() {
        this.data.subTitle.push({});
    }
    deleteLine() {
        this.deleteParent.emit();
    }

    deleteSubLine(i: number) {
        this.data.subData.splice(i, 1);
    }
    addNewSub() {
        this.data.subData.push({});
    }
}
