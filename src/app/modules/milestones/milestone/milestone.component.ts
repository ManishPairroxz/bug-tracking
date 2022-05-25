import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgxEditInlineComponent } from 'ngx-edit-inline';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
    selector: 'app-milestone',
    templateUrl: './milestone.component.html',
    styleUrls: ['./milestone.component.css']
})
export class MileStoneComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

    constructor() {

    }

    ngOnInit(): void {
        console.log('ngOnInit milestone');
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
}