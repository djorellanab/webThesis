import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getListAngles } from '../../../models/enums/angles-of-movement';
import { getListJoints } from '../../../models/enums/joints';
import { FunctionalMovement } from '../../../models/functional-movement';
import { FunctionalMovementService } from '../../../services/functional-movement.service';
import { first } from 'rxjs/operators';
import {ModalService } from '../../../services/modal.service';

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
  jointsReferences = [];
  checkAngles = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private functionalMovementService: FunctionalMovementService,
    private modalService: ModalService) { }

  ngOnInit() { 
    this.angleReferences = getListAngles();
    this.jointsReferences = getListJoints();
    const formControls = this.angleReferences.map(control => new FormControl(false));
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      steps: ['', Validators.required],
      height: ['', Validators.required],
      depthMin: ['', Validators.required],
      depthMax: ['', Validators.required],
      anglesOfMovement: new FormArray(formControls),
      focusJoin:  ['', Validators.required],
    });
  }
  ngOnDestroy() { }

  get f() { return this.createForm.controls; }

  changeJoint(e) {
    //this.createForm.get("focusJoin").setValue(e.target.value.split(':')[1]);
  }
    
  onSubmit() {

    this.submitted = true;

    let selectedPreferences:number[] = this.f.anglesOfMovement.value
    .map((checked, index) => checked ? this.angleReferences[index].id : null)
    .filter(value => value !== null);
    if(selectedPreferences.length===0){ 
      this.checkAngles = true;
      return;
    }else{
      this.checkAngles = false;
    }

    // stop here if form is invalid
    if (this.createForm.invalid) {
        return;
    }

    let tagValue:number = 1/(this.f.steps.value-1);
    tagValue = parseFloat(tagValue.toFixed(2)); 

    let stepsTags:number[] = [];

    for (let index = 0; index < this.f.steps.value; index++) {
      stepsTags.push(tagValue*index);
    }

    let fm = new FunctionalMovement('', this.f.name.value, stepsTags, selectedPreferences,
       this.f.description.value, this.f.height.value, this.f.depthMin.value, this.f.depthMax.value, 
       this.f.focusJoin.value);
    console.log(fm);
    this.functionalMovementService.post(fm)
    .pipe(first())
    .subscribe(
        data => {
          this.router.navigate(["/functionalmovement/" + data.functionalMovements[0]._id]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }

  backIndex(): void{
    this.router.navigate(["/functionalmovement"]);
  }


  openModal(id: string) {
    console.log(id);
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}
}
