import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TasksService } from "./service/tasks.service";
import { TaskComponent } from "./task/task.component";
import { TasksComponent } from "./tasks.component";

const tasksRouting  =   RouterModule.forChild([
    {   path : '', component : TasksComponent    },
    {   path    :   ':id',  component : TaskComponent   }
]);

@NgModule({
    declarations : [
        TasksComponent,
        
    ],
    imports : [
        FormsModule,
        CommonModule,
        tasksRouting
    ],
    exports : [],
    providers   :   [TasksService]
})

export class TasksModule    {   }