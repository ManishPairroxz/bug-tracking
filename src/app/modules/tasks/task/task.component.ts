import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
    selector    :   'app-task',
    templateUrl :   './task.component.html',
    styleUrls   :   ['./task.component.html']
})

export class TaskComponent implements OnInit, OnDestroy    {
    id : any;
    tasksDetails : any = [];

    constructor(public route : ActivatedRoute)   {
        this.route.paramMap.subscribe((param : any) =>  {
            console.log(param);
            console.log( param['params']['id'] );
            this.id = param['params']['id'];
            console.log(this.id);

            console.log('oninit taks');
            let result : any = [];
            let parsedData : any =  [];
            let specificElementIndex: any;
            
            result = (localStorage.getItem('milestones'));
            parsedData = JSON.parse(result);
            console.log(parsedData);

            // specificElementIndex = parsedData.findIndex((x: any) => x['_id'] == this.id);
            parsedData.forEach((element : any) => {
                console.log(element);
                specificElementIndex    =    element.tasks.findIndex((x : any) => x[0]['_id'] == this.id);
                console.log(specificElementIndex);
                console.log(element.tasks[specificElementIndex]);
                this.tasksDetails   =   element.tasks[specificElementIndex];
                console.log(this.tasksDetails);
            });
            // console.log(specificElementIndex);


    
            
        })
    }

    ngOnInit(): void {


    }

    ngOnDestroy(): void {
        console.log('destroy task component');
    }
}