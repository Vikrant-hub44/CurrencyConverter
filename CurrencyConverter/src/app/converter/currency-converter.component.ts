import { Component, OnInit } from '@angular/core';
import { IDropDownList } from '../models/idrop-down-list';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { CurrencyConverterService } from '../services/currency-converter.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})

/**
 * Currency converter component
 */
export class CurrencyConverterComponent implements OnInit {
  /**
   * Properties
   */
  form: FormGroup;
  viceVersa: boolean = false;
  convertedAmount: number = 0;
  exchngeRate: number = 0;
  currentDate=new Date();

  frmCurncList: IDropDownList[] = [];
  toCurncList: IDropDownList[] = [];

  /**
   * Initialize currency dropdowns
   */
  availcurrencyList: IDropDownList[] = [
    { code: "USD", value: "USD - US Dollar" },
    { code: "EUR", value: "EUR - Euro" },
    { code: "JPY", value: "JPY - Japanese Yen" },
    { code: "GBP", value: "GBP - British Pound" },
    { code: "AUD", value: "AUD - Australian Dollar" },
    { code: "CHF", value: "CHF - Swiss franc" },
    { code: "CNY", value: "CNY - Chinese yuan renminbi" },
    { code: "HKD", value: "HKD - Hong Kong Dollar" },
    { code: "MXN", value: "MXN - Mexican " },
    { code: "INR", value: "INR - Indian Rupee" },
  ]
  cadCurrency: IDropDownList[] = [
    { code: "CAD", value: "CAD - Canadian Dollar" }
  ]

  constructor(private formBuilder: FormBuilder, private currencyService: CurrencyConverterService) {
    /**
     * build form
     */
    this.form = this.formBuilder.group({
      frmCurrency: ["USD"],
      toCurrency: ["CAD"],
      date: [this.currentDate],
      amount: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    /**
     * initialize currency from and to dropdowns
     */
    this.frmCurncList = this.availcurrencyList;
    this.toCurncList = this.cadCurrency;
  }

  /**
   * Created by: Vikrant Verma
   * Created on: 2022-07-20
   * Purpose: If From drop down has other countries currency then canada change it to CAD
   * vice-versa
   */
  reverseCurrencyList() {
    this.viceVersa = this.viceVersa ? false : true;
    if (this.viceVersa) {
      this.frmCurncList = this.cadCurrency;
      this.toCurncList = this.availcurrencyList;
      this.form.patchValue({
        frmCurrency: ["CAD"],
        toCurrency: ["USD"],
      });
    }
    else {
      this.frmCurncList = this.availcurrencyList;
      this.toCurncList = this.cadCurrency;
      this.form.patchValue({
        frmCurrency: ["USD"],
        toCurrency: ["CAD"],
      });
    }

    if(this.form.valid){
      this.convertCurrency();
    }
  }

  /**
   * Created by: Vikrant Verma
   * Created on: 2022-07-20
   * Purpose: calls on click of Convert button, convert currency as per selection
   */
  convert() {
    if (this.form.valid) {
      this.convertCurrency();
    }
  }

  /**
   * Created by: Vikrant Verma
   * Created on: 2022-07-20
   * Purpose: Convert currency as per selection
   */
  convertCurrency(){
    let frmcurrncy = this.f['frmCurrency'].value;
      let tocrrncy = this.f['toCurrency'].value;
      let date = this.f['date'].value;
      let amnt = this.f["amount"].value;
      this.currencyService.getExchangeRate(frmcurrncy
        , tocrrncy
        , date).subscribe(
          (res: any) => {
            let rate = res.observations[0][`FX${frmcurrncy}${tocrrncy}`]["v"];
            this.convertedAmount = this.currencyService.convertCurrency(amnt, rate);
            this.exchngeRate = rate;
          }
        )
  }

  /**
   * Bind all properties of form to get easy access
   */
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
