import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  addBugForm : FormGroup;
  arrayOfData : any = [];

  constructor(public formBuilder : FormBuilder) {
    this.addBugForm = this.formBuilder.group({
      'title' : ['', Validators.required],
      'assignee'  : ['',  Validators.required],
      'priority'  : ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    console.log('ngOnInit app component');
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  onSubmit()  {
    console.log(this.addBugForm);
    console.log(this.addBugForm.valid);

    if(this.addBugForm.valid) {
      console.log('the form si valid');

      // save the previous data + new data
      this.arrayOfData.push(this.addBugForm.value);

      console.log(this.arrayOfData);

      localStorage.setItem('arrayOfData', JSON.stringify(this.arrayOfData));

      // $('#exampleModal').modal('hide');
    }
  }
}
