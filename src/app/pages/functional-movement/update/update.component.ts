import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getListAngles } from '../../../models/enums/angles-of-movement';
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
  stepsReferences = [];
  angleReferences = [];
  id: string = "";
  fileUpload = {status: '', message: '', filePath: ''};
  idFile:string;

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

    const formControls = this.angleReferences.map(control => new FormControl(false));
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      movementFactor: ["", Validators.required],
      height: ['', Validators.required],
      depthMin: ['', Validators.required],
      depthMax: ['', Validators.required],
      anglesOfMovement: new FormArray(formControls)
    });

    this.loading = true;
    this.id = this.route.snapshot.params['id'];
    this.angleReferences = getListAngles();
    this.functionalMovementService.getById(this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.angleReferences.map(angle =>{
            angle.checked = data.anglesOfMovement.includes(angle.id);
            return angle;
          });
          let checkedsAngles = this.angleReferences.map(angle => {
            return this.formBuilder.control(angle.checked);
          });
          this.createForm = this.formBuilder.group({
            name: [data.name, Validators.required],
            description: [data.description],
            movementFactor: [data.movementFactor, Validators.required],
            height: [data.height, Validators.required],
            depthMin: [data.depthMin, Validators.required],
            depthMax: [data.depthMax, Validators.required],
            anglesOfMovement: checkedsAngles
          });
          this.idFile = data.file;
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

    /*let selectedPreferences:number[] = this.angleReferences
    .filter(angle => angle.checked === true)
    .map((angle) => {return angle.id});*/

    this.functionalMovementService.put(this.id, this.f.description.value, this.f.movementFactor.value)
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
    const formData = new FormData();
    formData.append('id',this.id);
    formData.append('file',this.fileForm.get("profile").value);

    this.fileService.post(formData).subscribe(
      res => this.fileUpload = res,
      err => this.errorFile = err
    );
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