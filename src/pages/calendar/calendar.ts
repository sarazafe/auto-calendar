import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Moment} from "moment";

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  calendar: string[][];
  selectedMonth: Moment;
  weekDays: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.calendar = this.navParams.get('calendar');
    this.selectedMonth = this.navParams.get('selectedMonth');
    this.weekDays = this.navParams.get('weekDays');
  }


  /**
   * It gets the string value month of selected month
   * @returns {string}
   */
  getMonth(): string{
    return this.selectedMonth.locale('es').format('MMMM').toUpperCase();
  }

  ionViewDidLoad() {
  }

}
