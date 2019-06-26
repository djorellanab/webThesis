import { Component, OnInit, OnDestroy, AfterViewInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionalMovement } from '../../../models/functional-movement';
import { FunctionalMovementService } from '../../../services/functional-movement.service';
import { AppConstants } from '../../../app.constants';
import { AppUtils } from '../../../app.utils';
import { first, last } from 'rxjs/operators';
import { FileService} from '../../../services/file.service';
import { StepFunctionalMovementService} from '../../../services/step-functional-movement.service';

@Component({
  selector: 'app-functional-movement-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FunctionalMovementIndexComponent implements OnInit, OnDestroy, AfterViewInit {
  loading = false;
  indexOfPages: number;
  page: number;
  maxPages: number = 5;
  records: number;
  error = '';
  functionalMovements = [];
  pagination = [];
  dataDelete = {id:"", name:""};
  warningMessage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private functionalMovementService: FunctionalMovementService,
    private renderer: Renderer,
    private fileService: FileService,
    private stepFunctionalMovementService:StepFunctionalMovementService) { }

  ngOnInit() { 
    this.warningMessage = false;
    this.loadPage(1);
  }


  ngOnDestroy() { }
  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("data-action")) {
        let _action = event.target.getAttribute("data-action");
        if (_action === "see") {
          this.router.navigate(["/functionalmovement/" + event.target.getAttribute("name")]);
        }
        else if (_action === "gbd") {
          this.fileService.getById(event.target.getAttribute("name"))
          .pipe(first())
          .subscribe(
              res => {
                const fileName = AppUtils.getFileNameFromResponseContentDisposition(res.headers);
                AppUtils.saveFile(res.body, fileName);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
        }
        else if (_action === "metadata") {
          this.functionalMovementService.getMetadata(event.target.getAttribute("name"))
          .pipe(first())
          .subscribe(
              res => {
                const fileName = AppUtils.getFileNameFromResponseContentDisposition(res.headers);
                AppUtils.saveFile(res.body, fileName);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
        }
        else if(_action === "train"){
          this.router.navigate(["/functionalmovement/train/" + event.target.getAttribute("name")]);
        }
        else if(_action === "table"){
          this.loadPage(+event.target.getAttribute("name"));
        }
        else if(_action === "csv"){
          this.stepFunctionalMovementService.getCSV(event.target.getAttribute("name"))
          .pipe(first())
          .subscribe(
              res => {
                const fileName = AppUtils.getFileNameFromResponseContentDisposition(res.headers);
                AppUtils.saveFile(res.body, fileName);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
        }
        else if(_action === "delete"){
          this.dataDelete.id = event.target.getAttribute("name");
          this.dataDelete.name = event.target.getAttribute("data-delete-name");
          this.warningMessage = true;
        }
      }
    });
  }

  loadPage(_page:number): void{
    this.loading = true;
    this.page =  _page;
    this.records = AppConstants.recordsByTable;
    this.indexOfPages = AppConstants.indexOfPage;
    let desde = AppUtils.getOffSet(this.records,this.page);
    if (desde < 0){
      desde = 0;
    }
    this.functionalMovementService.get(desde, this.records)
    .pipe(first())
    .subscribe(
        data => {
          this.functionalMovements = data.functionalMovements;
          let pagin = [];
          this.maxPages = AppUtils.getTotalPagesByTable(data.recordsFiltered, this.records);
          let totalPage =this.page + this.indexOfPages;
          if(totalPage > this.maxPages) {totalPage =this.maxPages}; 
          for(let i = this.page + 1; i <= totalPage; i++){ pagin.push(i)};
          
          this.pagination = pagin;
          this.loading = false;
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }

  onClickNoDelete(): void {
    this.warningMessage = false;
  }
  deleteRol(): void{
    this.loading = true;
    this.functionalMovementService.delete(this.dataDelete.id )
    .pipe(first())
    .subscribe(
        data => {
          this.functionalMovements = this.functionalMovements.filter(x => {return x._id !== this.dataDelete.id});
          this.warningMessage = false;
          if(this.functionalMovements.length === 0){
            this.page = this.page-1;
          }
          this.loadPage(this.page);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }

  insertMF(): void{
    this.router.navigate(["/functionalmovement/create"]);
  }
}