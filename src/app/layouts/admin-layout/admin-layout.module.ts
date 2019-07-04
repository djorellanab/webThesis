import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { FunctionalMovementCreateComponent } from '../../pages/functional-movement/create/create.component';
import { FunctionalMovementIndexComponent } from '../../pages/functional-movement/index/index.component';
import { FunctionalMovementUpdateComponent } from '../../pages/functional-movement/update/update.component';
import { ModalComponent } from '../../components/modal/modal.component'
import { TrainComponent } from '../../pages/step-functional-movement/train/train.component';

import { FunctionalMovementReportComponent } from 'src/app/pages/step-functional-movement/report/report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    FunctionalMovementCreateComponent,
    FunctionalMovementIndexComponent,
    FunctionalMovementUpdateComponent,
    TrainComponent,
    ModalComponent,
    FunctionalMovementReportComponent
  ]
})

export class AdminLayoutModule {}
