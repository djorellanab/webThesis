import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { StepFunctionalMovementService } from '../../../services/step-functional-movement.service';
import { ReadFileService } from '../../../services/read-file.service';

import { StepFunctionalMovement } from '../../../models/step-functional-movement';
import { getJointName } from '../../../models/enums/joints';
import { Chart } from 'chart.js';
import { AppUtils} from '../../../app.utils';

@Component({
  selector: 'app-step-functional-movement-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit, OnDestroy {
  fileForm: FormGroup;
  stepForm: FormGroup;
  chartForm: FormGroup;
  stadistics: any[];
  stepsDetail: any;
  stepsFunctionalMovement: StepFunctionalMovement[];
  loading: boolean = false;
  loading2: boolean = false;
  error2 = '';
  error3 = '';
  id: string = "";
  error = '';
  index: number = 0;
  submitted = false;
  messageFinalTrain: string = '';
  messageTrain: string = 'Siguiente dato de entrenamiento';
  anglesOfMovement: any[];
  stepSelect: number = 0;
  ordersChart: Chart;
  datasets = [];
  cloneStadistics = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stepFunctionalMovementService: StepFunctionalMovementService,
    private readFileService: ReadFileService
  ) { }

  ngOnInit() {
    this.stepSelect = 0;
    this.ordersChart = null;
    this.fileForm = this.formBuilder.group({
      profile: ['']
    });
    this.datasets = [];
    this.stepForm = this.formBuilder.group({
      clasification: ['true', Validators.required]
    });
    this.chartForm = this.formBuilder.group({
      clasification: ['true', Validators.required],
      step: ['', Validators.required]
    });
    this.stepsFunctionalMovement = [];
    this.loading2 = true;
    this.id = this.route.snapshot.params['id'];
    this.stepsDetail = {
      name: "",
      arraySteps: [],
    };
    this.stadistics = [];
    this.cloneStadistics = [];
    this.anglesOfMovement = [];
    this.getDataForChart(true,0);
  }

  toggleVisibility(e){
    let id = e.target.value;
    if(e.target.checked === true){
      this.datasets.find(x =>{
        if(x.joint == id){
          this.ordersChart.data.datasets.push(x);
          return true;
        }
        return false;
      });
      this.cloneStadistics.forEach((x,indexTable) =>{
        x.find(y =>{
          if(y.joint == id){
            this.stadistics[indexTable].table.push(y);
            return true;
          }
          return false;
        });
      });
    }else{
      this.ordersChart.data.datasets = this.ordersChart.data.datasets.filter(x => x.joint != id);
      this.stadistics.forEach(x =>{
        x.table = x.table.filter(y => y.joint != id);
      });
    }
    this.ordersChart.update();
  }

  getDataForChart(clasification: boolean, step: number):void{
    this.stepFunctionalMovementService.get(this.id, clasification, step)
    .pipe(first())
    .subscribe(
      data => {
        this.stepsDetail.name = data.name;
        this.stepsDetail.arraySteps = data.steps;
        this.stepSelect = step;
        this.chartForm = this.formBuilder.group({
          clasification: [`${clasification}`, Validators.required],
          step: [step, Validators.required]
        });
        this.anglesOfMovement = data.anglesOfMovement.map((x) =>{
          return {
            id: x,
            name: getJointName(x)
          };
        })
        if(data.hasData === true)
        {
          this.createChart(step, data.joints, data.headers);
        }
        this.loading2 = false;
      },
      error => {
        this.error2 = error;
        this.loading2 = false;
      });
  }
  createChart(step: number, joints: any[], headers: any[]):void{
      let datasets = [];
      let stadistics2:any[] = [];
      headers.forEach(function(header){
        stadistics2.push({nameTable:header,table:[]});
      });
      joints.forEach(function(joint) {
        let _name = getJointName(joint.joint);
        let _color = AppUtils.getColorName(joint.joint);
        joint.metadata.forEach(function(meta,i) {
          stadistics2[i].table.push({joint: joint.joint, name: _name, avg: meta.avg, max: meta.max, min: meta.min});
        });
        datasets.push({
          joint: joint.joint,
          label: _name,
          backgroundColor: _color,
          borderColor: _color,
          data: joint.points,
        });
      });
      this.datasets = Object.assign([], datasets);
      this.cloneStadistics = stadistics2.map(x=>{
        return Object.assign([], x.table);
      });
      this.stadistics = stadistics2; 
      var chartMf = document.getElementById('chart-mf');
      this.ordersChart = new Chart(chartMf, {
        type: 'scatter',
        options: {
          responsive: true,
          title: {
            display: true,
            text: `Trayectoria del paso: ${step+1}`
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              pointStyle: 'circle'
            }
          }
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Factor de movimiento'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Angulo'
            }
          }]
        },
        data: {
          datasets
        }
      });
    this.loading2 = false;
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const profile = event.target.files[0];
      this.fileForm.get("profile").setValue(profile);
    }
  }

  onSubmitChart() {
    this.loading2 = true;
    this.stadistics = [];
    this.cloneStadistics = [];
    this.datasets = [];
    if(this.ordersChart != null){
      this.ordersChart.destroy();
    }
    this.ordersChart = null;

    let _cla = this.chartForm.controls.clasification.value === "true";
    let _step = +this.chartForm.controls.step.value;
    this.getDataForChart(_cla, _step);
  }

  onSubmitFile() {
    this.error3 = '';
    this.messageFinalTrain = '';
    this.loading = true;
    let file = this.fileForm.get("profile").value;
    this.readFileService.readFile(file).subscribe(
      res => {
        let jsonArray = JSON.parse(res);
        let sfm:  StepFunctionalMovement []= [];
        try {
          jsonArray.forEach(function (json) {
            sfm.push(StepFunctionalMovement.decodeJson(json));
          });          
          this.stepsFunctionalMovement = sfm;
          if (this.stepsFunctionalMovement.length >1)
          {
            this.messageTrain = 'Siguiente dato de entrenamiento';
          }
          else
          {
            this.messageTrain = 'Guardar datos de entrenamiento a la base de datos';
          }
        } catch (error) {
          this.error = error.message;
        }
        this.loading = false;
        this.index = 0;
      },
      error => {
        this.error3 = error;
        this.loading = false;
      }
    );
  }

  onSubmitStep() {
    this.loading = true;
    this.error = '';
    if (this.stepForm.invalid) {
      return;
    }
    this.stepsFunctionalMovement[this.index].clasification = (this.stepForm.get("clasification").value=="true");
    this.index++;
    if (this.index === this.stepsFunctionalMovement.length) {
      this.index--;
      this.stepFunctionalMovementService.post(this.stepsFunctionalMovement,this.id)
        .pipe(first())
        .subscribe(
          data => {
            this.index= 0;
            this.stepsFunctionalMovement = [];
            this.messageFinalTrain = "Se ha guardado los datos de entrenamiento";
            this.loading = false;
            this.onSubmitChart();
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    } 
    else if (this.index === this.stepsFunctionalMovement.length-1){
      this.stepsFunctionalMovement[this.index-1].pathImage =""; 
      this.messageTrain = 'Guardar datos de entrenamiento a la base de datos';
    }
    else{
      this.stepsFunctionalMovement[this.index-1].pathImage =""; 
      this.loading = false;
    }
  }

  ngOnDestroy() { }

}
