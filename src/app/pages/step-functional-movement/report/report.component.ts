import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ReadFileService } from '../../../services/read-file.service';
import { modelIAService } from '../../../services/model-ia.service';

import { Chart } from 'chart.js';
import { AppUtils} from '../../../app.utils';
import { ReportAnalyzer } from 'src/app/models/report-analyzer';
import { ReportIA } from 'src/app/models/report-ia';
import { FunctionalMovementService } from 'src/app/services/functional-movement.service';
import { FunctionalMovement } from 'src/app/models/functional-movement';

@Component({
  selector: 'app-step-functional-movement-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class FunctionalMovementReportComponent implements OnInit, OnDestroy {
  loading = false;
  error = '';
  id:string ='';
  fileForm: FormGroup;
  reportAnalyzer: ReportAnalyzer;
  reportIa: ReportIA;
  repetitionsChart: Chart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private readFileService: ReadFileService,
    private modelIAService: modelIAService,
    private functionalMovementService: FunctionalMovementService,) { }

  ngOnInit() { 
    this.id = this.route.snapshot.params['id'];
    this.fileForm = this.formBuilder.group({
      profile: ['']
    });
    this.reportIa = ReportIA.dummy();
    this.reportAnalyzer = ReportAnalyzer.dummy();
    this.repetitionsChart = null;
    this.loading = true;
    this.functionalMovementService.getById(this.id)
    .pipe(first())
    .subscribe(
      data => {
        //data.functionalMovements[0]
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

  ngOnDestroy() { }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const profile = event.target.files[0];
      this.fileForm.get("profile").setValue(profile);
    }
  }

  onSubmitFile() {
    this.error = '';
    this.loading = true;
    if(this.repetitionsChart != null){
      this.repetitionsChart.destroy();
    }
    let file = this.fileForm.get("profile").value;
    this.readFileService.readFile(file).subscribe(
      res => {
        let jsonReport = JSON.parse(res);
        let report:ReportAnalyzer = ReportAnalyzer.dummy();
        try {
          report = ReportAnalyzer.decodeJson(jsonReport);
          report.updateShow(true);
          this.modelIAService.predict(this.id, report.datasIa)
          .pipe(first())
          .subscribe(data=>{
            this.reportIa = ReportIA.decodeJson(data.data);
            this.reportIa.updateShow(true);
            this.reportAnalyzer = report;
            this.createChart(report.endurance);
          },
            error =>{
              this.error = error.message;
            });
        } catch (error) {
          this.error = error.message;
        }
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  createChart(datasets:any){
    var chartMf = document.getElementById('chart-mf');
    this.repetitionsChart = new Chart(chartMf, {
      type: 'scatter',
      options: {
        responsive: true,
        title: {
          display: true,
          text: `Trayectoria de rutina`
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
  }
}