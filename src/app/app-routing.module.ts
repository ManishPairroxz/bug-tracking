import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
    { path: '', redirectTo: 'bugs', pathMatch: 'full' },
    { path: 'bugs', loadChildren : () => import('./modules/bugs/bugs.module').then(m => m.BugsModule) }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }