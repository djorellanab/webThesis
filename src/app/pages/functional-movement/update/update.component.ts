import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getListAngles } from '../../../models/enums/angles-of-movement';
import { getJointName } from '../../../models/enums/joints';
import { FunctionalMovement } from '../../../models/functional-movement';
import { FileService} from '../../../services/file.service';
import { FunctionalMovementService } from '../../../services/functional-movement.service';
import { first } from 'rxjs/operators';
import{ AppUtils} from '../../../app.utils';

@Component({
  selector: 'app-functional-movement-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class FunctionalMovementUpdateComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  fileForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  errorFile = '';
  steps: number[] = [];
  angles: string[] = [];
  id: string = "";
  fileUpload = {status: '', message: '', filePath: ''};
  idFile:string;
  fm: FunctionalMovement;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private functionalMovementService: FunctionalMovementService,
    private fileService: FileService) {
  }

  ngOnInit() {
    
    this.fileForm = this.formBuilder.group({
      profile: ['']
    });

    this.fm = FunctionalMovement.dummy;

    this.createForm = this.formBuilder.group({
      movementFactor: ['', Validators.required]
    });

    this.loading = false;
    this.id = this.route.snapshot.params['id'];
    this.functionalMovementService.getById(this.id)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.fm = new FunctionalMovement(data.functionalMovements[0]._id, data.functionalMovements[0].name, data.functionalMovements[0].steps,
             data.functionalMovements[0].anglesOfMovement, data.functionalMovements[0].description, data.functionalMovements[0].height, data.functionalMovements[0].depthMin,
             data.functionalMovements[0].depthMax, data.functionalMovements[0].focusJoin, data.functionalMovements[0].state, data.functionalMovements[0].movementFactor,
             data.functionalMovements[0].file, data.functionalMovements[0].time_stamp);
          this.createForm = this.formBuilder.group({
            movementFactor: [data.functionalMovements[0].movementFactor, Validators.required]
          });
          this.steps = data.functionalMovements[0].steps;
          this.angles = this.fm.namesAnglesOfMovement;
          this.idFile = data.functionalMovements[0].file;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
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

    this.functionalMovementService.put(this.id, this.fm.description, this.f.movementFactor.value)
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

  onSelectedFile(event){
    if(event.target.files.length > 0){
      const profile = event.target.files[0];
      this.fileForm.get("profile").setValue(profile);
    }
  }

  onSubmitFile(){
    this.loading = true;
    const formData = new FormData();
    formData.append('id',this.id);
    formData.append('file',this.fileForm.get("profile").value);

    this.fileService.post(formData)
    .pipe(first())
    .subscribe(
        data => {
          this.idFile = data.idFile;
          this.loading = false;
        },
        error => {
            this.errorFile = error;
            this.loading = false;
        });
  }

  downloadGBD(){
    this.fileService.getById(this.idFile)
    .pipe(first())
    .subscribe(
        data => {
          //AppUtils.saveFile(data,"");
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }

}