import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgxEditInlineComponent } from 'ngx-edit-inline';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  addBugForm: FormGroup;
  arrayOfData: any = [];
  result: any = [];
  currentStatus: any = '';
  bugClosed: boolean = false;
  formSubscription: any;

  constructor(public formBuilder: FormBuilder, public router: Router, private toastr  : ToastrService) {
    this.addBugForm = this.formBuilder.group({
      '_id': [''],
      'title': ['', [Validators.required, this.noWhitespaceValidator]],
      'assignee': ['', Validators.required],
      'priority': ['', Validators.required],
      'status': ['assinged']
    });


  }

  ngOnInit(): void {

    if (localStorage.getItem('arrayOfData')) {
      let result: any = [];

      result = (localStorage.getItem('arrayOfData'));
      this.result = JSON.parse(result);
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

    if (item.status == 'fixed') {
      this.result[specificElementIndex].assignee = 'tester';
    } else if (item.status == 'assinged' || item.status == 'reopen') {
      this.result[specificElementIndex].assignee = 'developer';
    } else if (item.status == 'verified') {
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

  myFunction(item: any, event: any) { 
    // .classList.toggle("show")
    const element = document?.getElementById("myDropdown-" + item._id);
    console.log(element?.id);

    const querySelector = document.querySelectorAll('.dropdown-content');
    // console.log(querySelector);

    for (let i = 0; i <= querySelector.length - 1; i++) {
      console.log(querySelector[i]);
      console.log(querySelector[i].id);
      if(element?.id == querySelector[i].id)  {
        console.log('true');

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
    console.log(item);
    console.log(value);

    let result: any = [];
    let parsedData: any = [];
    let specificElementIndex: any;

    console.log('closed');
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

      localStorage.setItem('arrayOfData', JSON.stringify(this.result));
      this.toastr.success('Bug has been added successfully');
      // close the modal & clear the form
      $('#exampleModal').modal('hide');
      this.addBugForm.reset();
    }
  }
}

// https://www.javatpoint.com/jira-bug-life-cycle#:~:text=JIRA%20bug%20life%20cycle%20is,varies%20from%20project%20to%20project.