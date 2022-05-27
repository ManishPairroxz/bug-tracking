import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BugsComponent } from "../bugs/bugs.component";
import { TaskComponent } from "../tasks/task/task.component";

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations : [
        BugsComponent,
        TaskComponent
    ],
    exports : [
        BugsComponent,
        TaskComponent
    ]
})

export class SharedModule   {   }