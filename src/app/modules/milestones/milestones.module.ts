import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router, RouterModule } from "@angular/router";
import { NgbAccordionModule, NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxEditInlineModule } from "ngx-edit-inline";
import { ToastrModule } from "ngx-toastr";
import { BugsComponent } from "../bugs/bugs.component";
import { SharedModule } from "../shared/shared.module";
import { MileStoneComponent } from "./milestone/milestone.component";
import { MilestonesComponent } from "./milestones.component";

const mileStonesRouting = RouterModule.forChild([
    { path: '', component: MilestonesComponent },
    {   path    :   ':id',  component   :   MileStoneComponent},
]);

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        NgxEditInlineModule,
        NgbAccordionModule,
        NgbCollapseModule,
        ToastrModule.forRoot(),
        mileStonesRouting,
    ],
    declarations: [
        MilestonesComponent,
    ],
    exports: [RouterModule]
})

export class MilestonesModule { }