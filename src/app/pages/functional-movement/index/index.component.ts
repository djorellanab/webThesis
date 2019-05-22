import { Component, OnInit, OnDestroy, AfterViewInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionalMovement } from '../../../models/functional-movement';
import { FunctionalMovementService } from '../../../services/functional-movement.service';
import { AppConstants } from '../../../app.constants';
import { AppUtils } from '../../../app.utils';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-functional-movement-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FunctionalMovementIndexComponent implements OnInit, OnDestroy, AfterViewInit {
  loading = false;
  indexOfPages: number;
  page: number;
  maxPages: number = 1;
  records: number;
  error = '';
  functionalMovements = [];
  pagination = [];
  dataDelete = {id:"", name:""};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private functionalMovementService: FunctionalMovementService,
    private renderer: Renderer) { }

  ngOnInit() { 
    this.loading = true;
    this.page = this.route.snapshot.queryParams['page'] || 1;
    this.records = this.route.snapshot.queryParams['records'] || AppConstants.recordsByTable;
    this.indexOfPages = AppConstants.indexOfPage;
    let desde = AppUtils.getOffSet(this.records,this.page);
    this.functionalMovementService.get(desde, this.page)
    .pipe(first())
    .subscribe(
        data => {
          this.functionalMovements = data.functionalMovements;
          let pagin = [];
          let totalPage =this.page + this.maxPages;
          for(let i = this.page + 1; i < totalPage; i++){ pagin.push(i)};
          this.pagination = pagin;
          this.maxPages = AppUtils.getTotalPagesByTable(data.recordsFiltered, this.records);
          this.loading = false;
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }

  ngOnDestroy() { }
  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("data-action")) {
        let _action = event.target.getAttribute("data-action");
        if (_action === "see") {
          this.router.navigate(["/functionalmovement/" + event.target.getAttribute("data-id")]);
        }
        else if(_action === "train"){
          this.router.navigate(["/train/" + event.target.getAttribute("data-id")]);
        }
        else {
          this.dataDelete.id = event.target.getAttribute("data-id");
          this.dataDelete.name = event.target.getAttribute("data-delete-name");
        }
      }
    });
  }

  deleteRol(): void{
    this.loading = true;
    this.functionalMovementService.delete(this.dataDelete.id )
    .pipe(first())
    .subscribe(
        data => {
          this.functionalMovements = this.functionalMovements.filter(x => {return x._id != data._id});
          let pagin = [];
          let totalPage =this.page + this.maxPages;
          for(let i = this.page + 1; i < totalPage; i++){ pagin.push(i)};
          this.pagination = pagin;
          this.maxPages = AppUtils.getTotalPagesByTable(data.recordsFiltered, this.records);
          this.loading = false;
        },
        error => {
            this.error = error;
            this.loading = false;
        });
  }
}