import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getListAngles } from '../../../models/enums/angles-of-movement';
import { FunctionalMovement } from '../../../models/functional-movement';
import { FunctionalMovementService } from '../../../services/functional-movement.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-functional-movement-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class FunctionalMovementCreateComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  angleReferences = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private functionalMovementService: FunctionalMovementService) { }

  ngOnInit() { 
    this.angleReferences = getListAngles();
    const formControls = this.angleReferences.map(control => new FormControl(false));
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      steps: ['', Validators.required],
      height: ['', Validators.required],
      depthMin: ['', Validators.required],
      depthMax: ['', Validators.required],
      anglesOfMovement: new FormArray(formControls)
    });
  }
  ngOnDestroy() { }

  get f() { return this.createForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
        return;
    }

    let selectedPreferences:number[] = this.f.anglesOfMovement.value
    .map((checked, index) => checked ? this.angleReferences[index].id : null)
    .filter(value => value !== null);

    let tagValue:number = 1/this.f.steps.value;
    tagValue = parseFloat(tagValue.toFixed(2)); 

    let stepsTags:number[] = [];

    for (let index = 0; index < this.f.steps.value; index++) {
      stepsTags.push(tagValue*index);
    }

    let fm = new FunctionalMovement(0, this.f.name.value, stepsTags, selectedPreferences,
       this.f.description.value, this.f.height.value, this.f.depthMin.value, this.f.depthMax.value);

    this.functionalMovementService.post(fm)
    .pipe(first())
    .subscribe(
        data => {
          this.router.navigate(["/functionalmovement"]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }

}
