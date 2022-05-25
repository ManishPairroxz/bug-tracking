import { OnInit, OnDestroy, Component } from "@angular/core";
import { BugsComponent } from "../bugs/bugs.component";
import { NgbModal, ModalDismissReasons, NgbDatepicker, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-milestones',
    templateUrl: './milestones.component.html',
    styleUrls: ['./milestones.component.css']
})

export class MilestonesComponent implements OnInit, OnDestroy {
    closeResult = '';
    milestonesForm: FormGroup;
    tasksForm: FormGroup;
    editTasksForm   :   FormGroup;
    result: any = [];
    tasks: any = [];
    model: any;
    date: any = {};
    public isCollapsed = true;
    isToggle: boolean = false;
    


    constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService, private calendar: NgbCalendar) {
        this.milestonesForm = this.formBuilder.group({
            _id: new FormControl(''),
            title: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
            description: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
            // dueDate :   new FormControl({'year': 2018, 'month': 12, 'day': 12}, [Validators.required])
        });

        this.tasksForm = this.formBuilder.group({
            _id: new FormControl(''),
            title: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
            assignee: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
            milestones: new FormControl('', [Validators.required])
        });

        this.editTasksForm = this.formBuilder.group({
            _id: new FormControl(''),
            title: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
            assignee: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
            milestones: new FormControl('', [Validators.required])
        });

        
    }

    ngOnInit(): void {
        console.log('milestones component');

        if (localStorage.getItem('milestones')) {
            let result: any = [];
            let localTasks : any = [];

            result = (localStorage.getItem('milestones'));
            localTasks = localStorage.getItem('tasks');

            this.result = JSON.parse(result);
            this.tasks = JSON.parse(localTasks);
        }
    }

    createTasksUpdateForm(userData : any)   {
        console.log(userData);

        console.log(userData._id);

        let _id = '';
        let title = '';
        let assignee = '';
        let status = '';
        let milestones = '';

        if(typeof(userData._id) != 'undefined') {
            _id = userData._id;
            console.log(_id);
        }
        if(typeof(userData.title) != 'undefined') {
            title = userData.title;
            console.log(title);
        }
        if(typeof(userData.assignee) != 'undefined') {
            assignee = userData.assignee;
        }
        if(typeof(userData.status) != 'undefined') {
            status = userData.status;
        }
        if(typeof(userData.milestones) != 'undefined') {
            milestones = userData.milestones;
        }

        this.editTasksForm = this.formBuilder.group({
            _id: new FormControl(_id),
            title: new FormControl(title, [Validators.required, this.noWhitespaceValidator]),
            assignee: new FormControl(assignee, [Validators.required]),
            status: new FormControl(status, [Validators.required]),
            milestones: new FormControl(milestones, [Validators.required])
        });

        console.log(this.editTasksForm);
    }

    

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    updateTasks(item    :   any)   {
        console.log(item);

        let specificElementIndex;
        let result : any = [];
        let parsedData  :   any = [];
        result = localStorage.getItem('tasks');
        parsedData = JSON.parse(result);
        console.log(parsedData);

        specificElementIndex = parsedData.findIndex((x: any) => x._id == item._id);
        console.log(parsedData[specificElementIndex]);

        this.createTasksUpdateForm(parsedData[specificElementIndex]);
    }

    buttonClick(item: any) {
        this.isToggle = !this.isToggle;

        console.log(item);
        this.isCollapsed = item['_id'];


    }

    updateAssignee(item: any, value: any) {
        console.log(item);
        console.log(value);

        let result: any = [];
        let parsedData: any = [];
        let specificElementIndex: any;

        console.log('closed');
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
        }
    }

    onAddTasks() {
        console.log('add tasks');

        if (this.tasksForm.valid) {
            this.tasksForm.controls['_id'].setValue(Math.floor(Math.random() * 90000) + 10000);
            this.tasks.push(this.tasksForm.value);

            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            let result: any = [];

            // Find the milestone realted with the tasks & update the table
            // FInd the milestone realted with this task
            result = (localStorage.getItem('milestones'));
            let parsedData = JSON.parse(result);

            console.log(parsedData);
            console.log(this.tasksForm.get('milestones')?.value);


            let milestoneItem = parsedData.findIndex((x: any) => x._id == this.tasksForm.get('milestones')?.value);
            console.log(milestoneItem);

            // update the table
            this.result[milestoneItem].tasks = this.tasksForm.value;
            localStorage.setItem('milestones', JSON.stringify(this.result));


            this.toastr.success('Tasks has been added successfully');
            this.closeDialog();
            this.tasksForm.reset();
        }
    }

    onEditTasks() {
        console.log('edit tasks');

        if (this.editTasksForm.valid) {
            console.log(this.editTasksForm.value);
            console.log(this.editTasksForm.value._id);

            let specificElementIndex;
            let parsedData : any = [];
            let result : any = [];
            
            result = localStorage.getItem('tasks');
            parsedData = JSON.parse(result);

            specificElementIndex = parsedData.findIndex((x: any) => x._id == this.editTasksForm.value._id);
            console.log(specificElementIndex);
            console.log(parsedData[specificElementIndex]);
            parsedData[specificElementIndex] = this.editTasksForm.value;
            console.log(parsedData);

            console.log('before update', this.tasks);
            console.log(this.tasks[specificElementIndex]);
            this.tasks[specificElementIndex]    =   this.editTasksForm.value;
            // this.tasks.splice(specificElementIndex, 0, parsedData[specificElementIndex])
            console.log('after update' , this.tasks);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));

            // update the item in milestones table also
            // Find the milestone realted with the tasks & update the table
            // FInd the milestone realted with this task
            let milestonesParsedData : any = [];
            result = (localStorage.getItem('milestones'));
            milestonesParsedData = JSON.parse(result);

            console.log(milestonesParsedData);
            console.log(this.editTasksForm.get('milestones')?.value);


            let milestoneItem = milestonesParsedData.findIndex((x: any) => x._id == this.editTasksForm.get('milestones')?.value);
            console.log(milestoneItem);

            // update the table
            this.result[milestoneItem].tasks = this.editTasksForm.value;
            localStorage.setItem('milestones', JSON.stringify(this.result));




            this.toastr.success('Tasks has been updated successfully');
            this.closeDialog();
            this.tasksForm.reset();
        }
    }

    ngOnDestroy(): void {
        console.log('milestgons ondestroy');
    }
}