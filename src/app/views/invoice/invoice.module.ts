import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ': cat',
    component: InvoiceComponent,
    data: {
      title: 'Invoice'
    }
  }
];

@NgModule({
  imports: [
    // CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [InvoiceComponent]
})
export class InvoiceModule { }
