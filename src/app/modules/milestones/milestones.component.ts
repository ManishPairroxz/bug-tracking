import { OnInit, OnDestroy, Component } from "@angular/core";
import { BugsComponent } from "../bugs/bugs.component";
import { NgbModal, ModalDismissReasons, NgbDatepicker, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from "moment";
declare var $: any;

@Component({
    selector: 'app-milestones',
    templateUrl: './milestones.component.html',
    styleUrls: ['./milestones.component.css']
})

export class MilestonesComponent implements OnInit, OnDestroy {
    dropdownList: any = [];
    selectedItems: any = [];
    dropdownSettings = {};
    closeResult = '';
    milestonesForm: FormGroup;
    tasksForm: FormGroup;
    editTasksForm: FormGroup;
    result: any = [];
    tasks: any = [];
    model: any;
    date: any = {};
    public isCollapsed = true;
    public isTasksCollapesed    :   boolean =   true;

    isToggle: boolean = false;
    isDisabled: boolean = false;
    isEndDateDisabled: boolean = true;
    public minDate: any = {};
    public endMinDate: any = {};
    public startDate: any;
    public endDate: any;
    public isEndDateSmaller: boolean = false;
    public showTasks    :   boolean =   false;

    constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService, private calendar: NgbCalendar) {
        this.milestonesForm = this.formBuilder.group({
            _id: new FormControl(''),
            title: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
            description: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
            tasks: new FormControl([])
            // dueDate :   new FormControl({'year': 2018, 'month': 12, 'day': 12}, [Validators.required])
        });

        this.tasksForm = this.formBuilder.group({
            _id: new FormControl(''),
            title: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
            assignee: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
            milestones: new FormControl('', [Validators.required]),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required)
        });

        this.editTasksForm = this.formBuilder.group({
            _id: new FormControl(''),
            title: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
            assignee: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
            milestones: new FormControl('', [Validators.required]),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required)
        });

        let date = new Date();

        this.minDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getUTCDate() };

    }

    ngOnInit(): void {
        if (localStorage.getItem('milestones')) {
            let result: any = [];
            let localTasks: any = [];

            result = (localStorage.getItem('milestones'));
            localTasks = localStorage.getItem('tasks');

            this.result = JSON.parse(result);
            console.log(this.result);
             
            this.tasks = JSON.parse(localTasks);
            if(!this.tasks) {
                this.tasks = [];
                 
            }
        }

        this.dropdownList = [
            { item_id: 'manish_pamnani', item_text: 'Manish Pamnani' },
            { item_id: 'lalit_singh_fatehpuria', item_text: 'Lalit Prakash Fatehpuria' },
            { item_id: 'kamal_suyal', item_text: 'Kamal Suyal' },
            { item_id: 'fahim_khokar', item_text: 'Fahim Khokar' },
            { item_id: 'sonu_sharma', item_text: 'Sonu Sharma' }
        ];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };
    }

    onItemSelect(event: any) {
    }

    onSelectAll(event: any) {
    }

    createTasksUpdateForm(userData: any) {
         

        let _id = '';
        let title = '';
        let assignee = '';
        let status = '';
        let milestones = '';
        let startDate = '';
        let endDate = '';

        if (typeof (userData[0]._id) != 'undefined') {
            _id = userData[0]._id;

        }
        if (typeof (userData[0].title) != 'undefined') {
            title = userData[0].title;

        }
        if (typeof (userData[0].assignee) != 'undefined') {
            assignee = userData[0].assignee;
        }
        if (typeof (userData[0].status) != 'undefined') {
            status = userData[0].status;
        }
        if (typeof (userData[0].milestones) != 'undefined') {
            milestones = userData[0].milestones;
        }
        if (typeof (userData[0].startDate) != 'undefined') {
            startDate = userData[0].startDate;
        }
        if (typeof (userData[0].endDate) != 'undefined') {
            endDate = userData[0].endDate;
        }

        this.editTasksForm = this.formBuilder.group({
            _id: new FormControl(_id),
            title: new FormControl(title, [Validators.required, this.noWhitespaceValidator]),
            assignee: new FormControl(assignee, [Validators.required]),
            status: new FormControl(status, [Validators.required]),
            milestones: new FormControl(milestones, [Validators.required]),
            startDate: new FormControl(startDate, [Validators.required]),
            endDate: new FormControl(endDate, [Validators.required]),
        });

    }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
             
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    setEndDate(event: any) {
        this.startDate = event;
        this.endMinDate = event;
        let startDate = new Date(this.startDate['year'], this.startDate['month'], this.startDate['day']);

        if (this.endDate && startDate) {
            let endDate = new Date(this.endDate['year'], this.endDate['month'], this.endDate['day']);

            if (endDate >= startDate) {
                this.isEndDateSmaller = false;
            } else if (endDate < startDate) {
                this.isEndDateSmaller = true;
            }
        }

    }

    onEndDateSelect(event: any) {
        this.endDate = event;

        let startDate = new Date(this.startDate['year'], this.startDate['month'], this.startDate['day']);
        let endDate = new Date(event['year'], event['month'], event['day']);

        if (endDate >= startDate) {
            this.isEndDateSmaller = false;
        } else if (endDate < startDate) {
            this.isEndDateSmaller = true;
        }
    }

    updateTasks(item: any) {
        let specificElementIndex;
        let result: any = [];
        let parsedData: any = [];
        result = localStorage.getItem('tasks');
        parsedData = JSON.parse(result);
         

        specificElementIndex = parsedData.findIndex((x: any) => x[0]._id == item._id);
         

        this.createTasksUpdateForm(parsedData[specificElementIndex]);

         
    }

    buttonClick(item: any) {
        this.isToggle = !this.isToggle;
        this.isCollapsed = item['_id'];
    }

    updateAssignee(item: any, value: any) {
        let result: any = [];
        let parsedData: any = [];
        let specificElementIndex: any;

        result = (localStorage.getItem('tasks'));
        parsedData = JSON.parse(result);

        if (item) {
            specificElementIndex = parsedData.findIndex((x: any) => x._id == item._id);
            // update operation
            this.result[specificElementIndex].priority = value;
            localStorage.setItem('tasks', JSON.stringify(this.result));
        }
    }

    public noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    private getDismissReason(reason: any): string {
         

        this.milestonesForm.reset();
        this.tasksForm.reset();
        $("input").val("");
        $("textarea").val("");
        $(".error").hide();
        
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    closeDialog() {
        this.modalService.dismissAll();
         

    }

    onAddMilestones() {
        if (this.milestonesForm.valid) {
            this.milestonesForm.controls['_id'].setValue(Math.floor(Math.random() * 90000) + 10000);
            this.result.push(this.milestonesForm.value);

            localStorage.setItem('milestones', JSON.stringify(this.result));
            this.toastr.success('Milestone has been added successfully');
            this.closeDialog();
            this.milestonesForm.reset();
            location.reload();
        }
    }

    onAddTasks() {
        if (this.tasksForm.valid) {
            this.tasksForm.controls['_id'].setValue(Math.floor(Math.random() * 90000) + 10000);

            const tasks = [
                {
                    '_id' : this.tasksForm.controls['_id'].value,
                    'title' :   this.tasksForm.controls['title'].value,
                    'status'    :   this.tasksForm.controls['status'].value,
                    'startDate' :   this.tasksForm.controls['startDate'].value,
                    'milestones'    :   this.tasksForm.controls['milestones'].value,
                    'endDate'   :   this.tasksForm.controls['endDate'].value,
                    'assignee'  :   this.tasksForm.controls['assignee'].value,
                    'bugs'  :   []
                }
            ];

             
            this.tasks?.push(tasks);
             

            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            let result: any = [];

            // Find the milestone realted with the tasks & update the table
            // FInd the milestone realted with this task
            result = (localStorage.getItem('milestones'));
            let parsedData = JSON.parse(result);

            let milestoneItem = parsedData.findIndex((x: any) => x._id == this.tasksForm.get('milestones')?.value);
            // update the table
             
            this.result[milestoneItem].tasks?.push(tasks);
             
            localStorage.setItem('milestones', JSON.stringify(this.result));
            this.toastr.success('Tasks has been added successfully');
            this.closeDialog();
            this.tasksForm.reset();
        }
    }

    onEditTasks() {

        if (this.editTasksForm.valid) {
            let specificElementIndex;
            let parsedData: any = [];
            let result: any = [];

            result = localStorage.getItem('tasks');
            parsedData = JSON.parse(result);
            specificElementIndex = parsedData.findIndex((x: any) => x._id == this.editTasksForm.value._id);
            parsedData[specificElementIndex] = this.editTasksForm.value;
            this.tasks[specificElementIndex] = this.editTasksForm.value;

            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            // update the item in milestones table also
            // Find the milestone realted with the tasks & update the table

            // FInd the milestone realted with this task
            let milestonesParsedData: any = [];
            result = (localStorage.getItem('milestones'));
            milestonesParsedData = JSON.parse(result);
            let milestoneItem = milestonesParsedData.findIndex((x: any) => x._id == this.editTasksForm.get('milestones')?.value);

            // update the table
            this.result[milestoneItem].tasks = this.editTasksForm.value;
            localStorage.setItem('milestones', JSON.stringify(this.result));

            this.toastr.success('Tasks has been updated successfully');
            this.closeDialog();
            this.tasksForm.reset();
        }
    }

    ngOnDestroy(): void {

    }
}