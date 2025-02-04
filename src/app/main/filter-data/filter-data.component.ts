import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ParentCategoryComponent } from './parent-category/parent-category.component';

@Component({
    selector: 'app-filter-data',
    imports: [FormsModule,
        ReactiveFormsModule, CommonModule],
    templateUrl: './filter-data.component.html',
    styleUrl: './filter-data.component.css'
})
export class FilterDataComponent {
    title = 'ANVON_ASSESSMENT_TASK_LETHANHQUANGHUY';

    @Input() listMonths: string[] = [];
    data = [{ title: 'a', subData: [{}], index: 0 }];
    dataExpenses = [{ title: 'a', subData: [{}], index: 0 }];

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            document.getElementById(`first_focus_${this.data[0].index}`)?.focus();
        }, 500);
    }

    newLine() {
        this.data.push({ subData: [], title: '', index: this.data.length + 1 });
    }
    deleteLine(i: number) {
        const _index = this.data.findIndex((_i) => _i.index == i)
        if (_index > -1) {
            this.data.splice(_index, 1);
        }
    }
    newParent() {
        this.data.push({ title: 'b', subData: [{}], index: this.data.length + 1 });
    }
    addNewSub(index) {
        this.data.find((_i) => _i.index == index)?.subData.push({});
    }
    deleteSubLine(index: number, i) {
        this.data.find((_i) => _i.index == index)?.subData.splice(i, 1);
        setTimeout(() => {
            this.listMonths.forEach((value) => {
                this.countIcomeByMonth(value, index);
            })
        }, 500);
    }

    recountIncome($event) {
        const idEl = $event.target.id.toString();
        const month: string = idEl.split('_')[$event.target.id.split('_').length - 1];
        const parentIndex = idEl.split('_')[1];
        this.countIcomeByMonth(month, parentIndex);
    }

    countIcomeByMonth(month: string, parentIndex: number) {
        let sum: number = 0;
        this.data.find((_i) => _i.index == parentIndex)?.subData.forEach((value, index) => {
            const id = `sub_${parentIndex}_${index}_${month}`;
            sum += Number.parseInt((document.getElementById(id) as HTMLInputElement).value) || 0;
        })
        sum += Number.parseInt((document.getElementById(`parent_${parentIndex}_${month}`) as HTMLInputElement).value) || 0;
        document.getElementById(`subTotalIncome_${parentIndex}_${month}`)?.setAttribute('value', sum ? sum.toString() : '');

        //total

        this.listMonths.forEach(_month => {
            let total: number = 0;
            this.data.forEach((_data) => {
                total += Number.parseInt((document.getElementById(`subTotalIncome_${_data.index}_${_month}`) as HTMLInputElement).value) || 0;
            })
            document.getElementById(`totalIncome_${_month}`)?.setAttribute('value', total ? total.toString() : '');
            const totalExpenses: number = Number((document.getElementById(`totalExpenses_${_month}`) as HTMLInputElement).value) || 0;
            document.getElementById(`profit_${_month}`)?.setAttribute('value', totalExpenses && total ? (total - totalExpenses).toString() : '');
        })

    }

    countExpensesByMonth(month: string, parentIndex: number) {
        let sum: number = 0;
        this.dataExpenses.find((_i) => _i.index == parentIndex)?.subData.forEach((value, index) => {
            const id = `expensessub_${parentIndex}_${index}_${month}`;
            sum += Number.parseInt((document.getElementById(id) as HTMLInputElement).value) || 0;
        })
        sum += Number.parseInt((document.getElementById(`expensesparent_${parentIndex}_${month}`) as HTMLInputElement).value) || 0;
        document.getElementById(`subTotalExpenses_${parentIndex}_${month}`)?.setAttribute('value', sum ? sum.toString() : '');

        //total

        this.listMonths.forEach(_month => {
            let total: number = 0;
            this.dataExpenses.forEach((_data) => {
                total += Number.parseInt((document.getElementById(`subTotalExpenses_${_data.index}_${_month}`) as HTMLInputElement).value) || 0;
            })
            document.getElementById(`totalExpenses_${_month}`)?.setAttribute('value', total ? total.toString() : '');
            const totalImcome: number = Number((document.getElementById(`totalIncome_${_month}`) as HTMLInputElement).value) || 0;
            document.getElementById(`profit_${_month}`)?.setAttribute('value', totalImcome && total ? (totalImcome - total).toString() : '');
        })

    }

    recountExpenses($event) {
        const idEl = $event.target.id.toString();
        const month: string = idEl.split('_')[$event.target.id.split('_').length - 1];
        const parentIndex = idEl.split('_')[1];
        this.countExpensesByMonth(month, parentIndex);
    }

    deleteExpensesLine(i) {
        const _index = this.dataExpenses.findIndex((_i) => _i.index == i)
        if (_index > -1) {
            this.dataExpenses.splice(_index, 1);
        }
    }
    deleteExpensesSubLine(index: number, i) {
        this.dataExpenses.find((_i) => _i.index == index)?.subData.splice(i, 1);
        setTimeout(() => {
            this.listMonths.forEach((value) => {
                this.countExpensesByMonth(value, index);
            })
        }, 500);
    }

    addNewExpensesSub(index) {
        this.dataExpenses.find((_i) => _i.index == index)?.subData.push({});
    }

    newExpensesParent() {
        this.dataExpenses.push({ title: 'b', subData: [{}], index: this.dataExpenses.length + 1 });
    }
}
