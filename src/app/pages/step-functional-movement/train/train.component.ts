import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {StepFunctionalMovementService} from '../../../services/step-functional-movement.service';
import {ReadFileService} from '../../../services/read-file.service';

import {StepFunctionalMovement} from '../../../models/step-functional-movement'


@Component({
  selector: 'app-step-functional-movement-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit, OnDestroy {
  fileForm: FormGroup;
  stepForm: FormGroup;
  stepsDetail: {
    name: "",
    steps: []
  };
  stepsFunctionalMovement: StepFunctionalMovement[];
  loading:boolean = false;
  id:string = "";
  error = '';
  index:number = 0;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stepFunctionalMovementService: StepFunctionalMovementService,
    private readFileService: ReadFileService
  ) { }

  ngOnInit() {  
    this.fileForm = this.formBuilder.group({
      profile: ['']
    });

    this.stepForm = this.formBuilder.group({
      clasification: ['', Validators.required]
    });

    this.stepsFunctionalMovement = [StepFunctionalMovement.dummy()];
    this.loading = true;
    this.id = this.route.snapshot.params['id'];
    this.stepFunctionalMovementService.get(this.id)
    .pipe(first())
    .subscribe(
      data => {
        this.stepsDetail.name = data.name;
        this.stepsDetail.steps = data.steps;
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

  onSelectedFile(event){
    if(event.target.files.length > 0){
      const profile = event.target.files[0];
      this.fileForm.get("profile").setValue(profile);
    }
  }

  onSubmitFile(){
    this.loading = true;
    let file = this.fileForm.get("profile").value;
    this.readFileService.readFile(file).subscribe(
      res => {
        let jsonArray = JSON.parse(res); 
        jsonArray.forEach(function (json) {
          this.stepsFunctionalMovement.push(StepFunctionalMovement.decodeJson(json));
      });
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onSubmitStep(){
    this.submitted = true;
    this.loading = true;
    if (this.stepForm.invalid) {
        return;
    }
    this.stepsFunctionalMovement[this.index].clasification = this.fileForm.get("clasification").value;
    this.index++;
    if(this.index === this.stepsFunctionalMovement.length)
    {
      this.stepFunctionalMovementService.post(this.stepsFunctionalMovement)
      .pipe(first())
      .subscribe(
        data => {
          this.stepsDetail.name = data.name;
          this.stepsDetail.steps = data.steps;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }

  }

  ngOnDestroy() { }

}
