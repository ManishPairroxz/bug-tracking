import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router, RouterModule } from "@angular/router";
import { NgxEditInlineModule } from "ngx-edit-inline";
import { ToastrModule } from "ngx-toastr";
import { BugsComponent } from "./bugs.component";

const bugsRouting = RouterModule.forChild([
    { path: '', component: BugsComponent }
]);

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxEditInlineModule,
        ToastrModule.forRoot(),
        bugsRouting
    ],
    declarations: [
        
    ],
    exports: [RouterModule]
})

export class BugsModule { }