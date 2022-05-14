import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  addBugForm: FormGroup;
  arrayOfData: any = [];
  result  : any = [];
  currentStatus : any = '';
  bugClosed : boolean = false;

  constructor(public formBuilder: FormBuilder) {
    this.addBugForm = this.formBuilder.group({
      '_id'  : [''],
      'title': ['', Validators.required],
      'assignee': ['', Validators.required],
      'priority': ['', Validators.required],
      'status'  : ['assinged']
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit app component');

    if(localStorage.getItem('arrayOfData')) {
      let result : any = [];

      result = (localStorage.getItem('arrayOfData'));
      this.result = JSON.parse(result);
      console.log(this.result);

    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  updateStatus(item : any, event  : any)  {
    console.log(item);
    console.log(event);

    console.log(event.target.value);

    // get the item from db.
    let result : any = [];
    let parsedData  : any = [];
    let specificElementIndex : any;

    result = (localStorage.getItem('arrayOfData'));
    parsedData = JSON.parse(result);
    specificElementIndex = parsedData.findIndex((x : any) => x._id == item._id);

    console.log('before object',this.result[specificElementIndex]);
    this.result[specificElementIndex].status = event.target.value;
    console.log('after object',this.result[specificElementIndex]);

    if(item.status == 'fixed') {
      this.result[specificElementIndex].assignee  = 'tester';
    } else if (item.status == 'assinged' || item.status == 'reopen') {
      console.log('reopen');
      this.result[specificElementIndex].assignee  = 'developer';
    } else if (item.status == 'verified') {
      this.result[specificElementIndex].assignee  = 'client';
    } else if (item.status == 'closed') {
      this.bugClosed = true;
    }
    
    localStorage.setItem('arrayOfData' , JSON.stringify(this.result));
    // this.ngOnInit();
  }

  onSubmit() {

    if (this.addBugForm.valid) {
      this.addBugForm.controls['_id'].setValue(Math.floor(Math.random()*90000) + 10000);
      this.addBugForm.controls['status'].setValue('assinged');
      // save the previous data + new data & save it to loaclstorage
      this.result.push(this.addBugForm.value);
      console.log(this.result);

      localStorage.setItem('arrayOfData', JSON.stringify(this.result));

      // close the modal & clear the form
      $('#exampleModal').modal('hide');
      this.addBugForm.reset();

      // refresh the data
      // this.ngOnInit();
      // location.reload();
    }
  }
}

// https://www.javatpoint.com/jira-bug-life-cycle#:~:text=JIRA%20bug%20life%20cycle%20is,varies%20from%20project%20to%20project.