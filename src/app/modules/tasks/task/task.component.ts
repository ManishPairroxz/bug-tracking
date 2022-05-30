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
             
             
            this.id = param['params']['id'];
             

             
            let result : any = [];
            let parsedData : any =  [];
            let specificElementIndex: any;
            
            result = (localStorage.getItem('milestones'));
            parsedData = JSON.parse(result);
             

            // specificElementIndex = parsedData.findIndex((x: any) => x['_id'] == this.id);
            parsedData.forEach((element : any) => {
                 
                specificElementIndex    =    element.tasks.findIndex((x : any) => x[0]['_id'] == this.id);
                 
                 
                this.tasksDetails   =   element.tasks[specificElementIndex];
                 
            });
            //  


    
            
        })
    }

    ngOnInit(): void {


    }

    ngOnDestroy(): void {
         
    }
}