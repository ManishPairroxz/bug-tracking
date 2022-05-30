import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgxEditInlineComponent } from 'ngx-edit-inline';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
    selector: 'app-bugs-tracking',
    templateUrl: './bugs.component.html',
    styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    addBugForm: FormGroup;
    arrayOfData: any = [];
    result: any = [];
    milestones: any = [];
    tasks: any = [];
    currentStatus: any = '';
    bugClosed: boolean = false;
    formSubscription: any;
    specifiElementIndex: any;

    constructor(public formBuilder: FormBuilder, public router: Router, private toastr: ToastrService) {
        this.addBugForm = this.formBuilder.group({
            '_id': [''],
            'title': ['', [Validators.required, this.noWhitespaceValidator]],
            'assignee': ['', Validators.required],
            'priority': ['', Validators.required],
            'milestones': [''],
            'tasks': [''],
            'status': ['assinged']
        });
    }

    ngOnInit(): void {

        if (localStorage.getItem('arrayOfData')) {
            let result: any = [];

            result = (localStorage.getItem('arrayOfData'));
            this.result = JSON.parse(result);
        }

        if (localStorage.getItem('milestones')) {
            let result: any = [];

            result = localStorage.getItem('milestones');
            //  

            this.milestones = JSON.parse(result);
             
        }

        $('#exampleModal').on('hidden.bs.modal', () => {
            $("input").val("");
            $("textarea").val("");
            $(".error").hide();
            this.addBugForm.reset();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    onSeeMilestone(event: any) {
         

        let result: any = [];
        let parsedData: any = [];
        let specificElementIndex: any;

        if (event) {
            result = this.milestones;
             
            // parsedData = JSON.parse(result);
            //  

            specificElementIndex = result.findIndex((x: any) => x._id == event.target.value);
             
            this.specifiElementIndex = specificElementIndex;
             

             
            this.tasks = this.milestones[specificElementIndex]['tasks'][0];
             


            // this.result[specificElementIndex].title = event;
            // localStorage.setItem('arrayOfData', JSON.stringify(this.result));
        }
    }

    onSeeTasks(event: any) {
         
    }

    changedValue(event: any, item: any) {

        // get the item from db.
        let result: any = [];
        let parsedData: any = [];
        let specificElementIndex: any;

        if (event) {
            result = (localStorage.getItem('arrayOfData'));
            parsedData = JSON.parse(result);
            specificElementIndex = parsedData.findIndex((x: any) => x._id == item._id);

            this.result[specificElementIndex].title = event;
            localStorage.setItem('arrayOfData', JSON.stringify(this.result));
        }
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        if (this.formSubscription) {
            this.formSubscription.unsubscribe();
        }
    }

    updateStatus(item: any, event: any) {
        // get the item from db.
        let result: any = [];
        let parsedData: any = [];
        let specificElementIndex: any;

        result = (localStorage.getItem('arrayOfData'));
        parsedData = JSON.parse(result);
        specificElementIndex = parsedData.findIndex((x: any) => x._id == item._id);

        this.result[specificElementIndex].status = event.target.value;

        if (item.status == 'fixed' || item.status == 'reopenByClient') {
            this.result[specificElementIndex].assignee = 'tester';
        } else if (item.status == 'assinged' || item.status == 'reopen') {
            this.result[specificElementIndex].assignee = 'developer';
        } else if (item.status == 'sendToClient') {
            this.result[specificElementIndex].assignee = 'client';
        } else if (item.status == 'closed') {
            this.bugClosed = true;
        }

        localStorage.setItem('arrayOfData', JSON.stringify(this.result));
    }

    onDeleteItem(item: any) {

        let result: any = [];
        let parsedData: any = [];
        let specificElementIndex: any;

        result = (localStorage.getItem('arrayOfData'));
        parsedData = JSON.parse(result);
        specificElementIndex = parsedData.findIndex((x: any) => x._id == item._id);

        this.result.splice(specificElementIndex, 1);
        localStorage.setItem('arrayOfData', JSON.stringify(this.result));

        $('#deleteModal').modal('hide');
        this.toastr.error('Bug has been deleted successfully.');

    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any) {

        if (!event.target['classList'].contains('dropbtn')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;

            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];

                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    openDeleteModal() {
        $('#deleteModal').modal('show');
    }

    closeDeleteModal() {
        $('#deleteModal').modal('hide');
    }

    myFunction(item: any, event: any) {
        const element = document?.getElementById("myDropdown-" + item._id);
        const querySelector = document.querySelectorAll('.dropdown-content');
        for (let i = 0; i <= querySelector.length - 1; i++) {
            if (element?.id == querySelector[i].id) {
                element.classList.toggle('show');
            } else {
                querySelector[i].classList.remove('show');
            }
        }

    }

    public noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    updatePriority(item: any, value: any) {
        let result: any = [];
        let parsedData: any = [];
        let specificElementIndex: any;

        result = (localStorage.getItem('arrayOfData'));
        parsedData = JSON.parse(result);
        specificElementIndex = parsedData.findIndex((x: any) => x._id == item._id);

        // update operation
        this.result[specificElementIndex].priority = value;
        localStorage.setItem('arrayOfData', JSON.stringify(this.result));
    }

    onSubmit() {

        if (this.addBugForm.valid) {
            this.addBugForm.controls['_id'].setValue(Math.floor(Math.random() * 90000) + 10000);
            this.addBugForm.controls['status'].setValue('assinged');
            // save the previous data + new data & save it to loaclstorage
            this.result.push(this.addBugForm.value);

            // Find the milestones & tasks related to the bug & do the entry in the respective tables
            // FInd the milestone

             
             
            

            // Find the spcific tasks & push to the tasks
             
             

            let singleTask: any = [];
            let parsedData: any = [];
            let specificElementIndex: any;
    
            singleTask = (this.milestones[this.specifiElementIndex]['tasks'][0]);
            parsedData = (singleTask);
            specificElementIndex = parsedData.findIndex((x: any) => x._id == this.addBugForm.controls['tasks'].value);

            singleTask[specificElementIndex]['bugs']?.push(this.addBugForm.value);
            this.milestones[this.specifiElementIndex]['tasks'][specificElementIndex].bugs?.push(this.addBugForm.value);
            // set the entry in the tasks table aslo


            // this.milestones[this.specifiElementIndex]['tasks'][0].bugs?.push(this.addBugForm.value);

            localStorage.setItem('arrayOfData', JSON.stringify(this.result));
            localStorage.setItem('milestones', JSON.stringify(this.milestones));
            this.toastr.success('Bug has been added successfully');
            // // // close the modal & clear the form
            $('#exampleModal').modal('hide');
            this.addBugForm.reset();
        }
    }
}

// https://www.javatpoint.com/jira-bug-life-cycle#:~:text=JIRA%20bug%20life%20cycle%20is,varies%20from%20project%20to%20project.