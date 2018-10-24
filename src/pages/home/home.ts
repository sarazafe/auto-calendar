import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as moment from "moment";
import {Moment} from "moment";
import {CalendarPage} from "../calendar/calendar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  static readonly NUMBER_OF_MONTHS: number = 14;
  // Initial date is 1st of november
  static readonly INITIAL_DATE: number = 20181101;

  static readonly DAYS_OF_WEEK: string[] = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];

  months: Moment[] = [];

  selectedMonth: Moment;

  selectOptions;

  calendar: string[][] = [];

  constructor(public navCtrl: NavController) {
    this.fillMonths();
    this.selectOptions = {
      title: 'Months',
      subTitle: 'Select the month to generate the calendar',
    };
  }

  getWeekDays(): string[] {
    return HomePage.DAYS_OF_WEEK;
  }

  /**
   * It generates the calendar with selected month
   */
  generateCalendar(): void {
    // Clean the previous calendar
    this.calendar = [];

    // Get the day of the week of first day of selected month
    let day: number = this.selectedMonth.isoWeekday();

    // Get the number of days in month
    let numberOfDays: number = this.selectedMonth.daysInMonth();
    console.log("First day", day);

    // Fill first week
    let days: string[] = [];
    for (let i = 0; i < day - 1; i++) {
      days.push('');
    }

    // Fill the calendar with days of months
    for (let i = 1; i <= numberOfDays; i++) {
      days.push(`${i}`);
    }

    // Fill until 31 days the empty spaces
    for (let i = numberOfDays; i <= 31; i++) {
      days.push('');
    }

    // Fill calendar per weeks
    while (days.length > 0) {
      let week: string[] = days.splice(0, 7);
      this.calendar.push(week);
    }
    console.log("Calendar", this.calendar);

    // Navigate to calendar page
    this.navCtrl.push(CalendarPage, {
      calendar: this.calendar,
      selectedMonth: this.selectedMonth.locale('es').format('MMMM'),
      weekDays: HomePage.DAYS_OF_WEEK
    });
  }

  /**
   * It fills the array of dates from 1 of november of 2018 to 1 december of 2019
   */
  private fillMonths(): void {
    let index: number = HomePage.NUMBER_OF_MONTHS;

    for (let i = 0; i < index; i++) {
      this.months.push(moment(HomePage.INITIAL_DATE, "YYYYMMDD").add(i, 'months'));
    }
  }

}
