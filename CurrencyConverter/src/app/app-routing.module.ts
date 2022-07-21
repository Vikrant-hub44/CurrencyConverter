import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './converter/currency-converter.component';

const routes: Routes = [
  { path: "converter", component: CurrencyConverterComponent },
  { path: "", redirectTo: "/converter", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
