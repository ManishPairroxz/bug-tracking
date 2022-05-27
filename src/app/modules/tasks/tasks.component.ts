import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        console.log('oninit tasks');
    }

    ngOnDestroy(): void {
        console.log('ondestroy tasks');
    }
}