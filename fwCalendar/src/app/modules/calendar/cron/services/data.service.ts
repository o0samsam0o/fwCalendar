import { Injectable } from '@angular/core';
import { CronJobsConfig, CronJobsSelectOption, CronJobsValidationConfig, OptionType } from '../contracts';

@Injectable()
export class DataService {

  private defaultConfig: CronJobsConfig = {
    multiple: false
  };

  private defaultValidateConfig: CronJobsValidationConfig = {
    validate: false,
  };

  private daysOfWeekPosix: Array<CronJobsSelectOption> = [
    {value: 1, label: 'MONDAY'},
    {value: 2, label: 'TUESDAY'},
    {value: 3, label: 'WEDNESDAY'},
    {value: 4, label: 'THURSDAY'},
    {value: 5, label: 'FRIDAY'},
    {value: 6, label: 'SATURDAY'},
    {value: 0, label: 'SUNDAY'}
  ];

  private numeral: Array<CronJobsSelectOption> = [
    {value: 1, label: '1.'},
    {value: 2, label: '2.'},
    {value: 3, label: '3.'},
    {value: 4, label: '4.'},
    {value: 5, label: '5.'},
    {value: 6, label: '6.'},
    {value: 7, label: '7.'},
    {value: 8, label: '8.'},
    {value: 9, label: '9.'},
    {value: 10, label: '10.'},
    {value: 11, label: '11.'},
    {value: 12, label: '12.'},
    {value: 13, label: '13.'},
    {value: 14, label: '14.'},
    {value: 15, label: '15.'},
    {value: 16, label: '16.'},
    {value: 17, label: '17.'},
    {value: 18, label: '18.'},
    {value: 19, label: '19.'},
    {value: 20, label: '20.'},
    {value: 21, label: '21.'},
    {value: 22, label: '22.'},
    {value: 23, label: '23.'},
    {value: 24, label: '24.'},
    {value: 25, label: '25.'},
    {value: 26, label: '26.'},
    {value: 27, label: '27.'},
    {value: 28, label: '28.'},
    {value: 29, label: '29.'},
    {value: 30, label: '30.'},
    {value: 31, label: '31.'}
  ];

  private _months: Array<CronJobsSelectOption> = [
    {value: 1, label: 'JANUARY'},
    {value: 2, label: 'FEBRUARY'},
    {value: 3, label: 'MARCH'},
    {value: 4, label: 'APRIL'},
    {value: 5, label: 'MAY'},
    {value: 6, label: 'JUNE'},
    {value: 7, label: 'JULY'},
    {value: 8, label: 'AUGUST'},
    {value: 9, label: 'SEPTEMBER'},
    {value: 10, label: 'OCTOBER'},
    {value: 11, label: 'NOVEMBER'},
    {value: 12, label: 'DECEMBER'}
  ];

  private _baseFrequency: Array<CronJobsSelectOption> = [
    { value: 0, label: 'PLEASE_SELECT' },
    { value: 1, type: OptionType.minute, label: 'MINUTE' },
    { value: 2, type: OptionType.hour, label: 'HOUR' },
    { value: 3, type: OptionType.day, label: 'DAY' },
    { value: 4, type: OptionType.week, label: 'WEEK' },
    { value: 5, type: OptionType.month, label: 'MONTH' },
    { value: 6, type: OptionType.year, label: 'YEAR' }
  ];

  private _hours: Array<CronJobsSelectOption>;
  private _minutes: Array<CronJobsSelectOption>;


  public get baseFrequency(): Array<CronJobsSelectOption> {
    return [
      ...this._baseFrequency
    ];
  }

  public get daysOfMonth(): Array<CronJobsSelectOption> {
    return [
      ...this.numeral
    ];
  }

  public get months(): Array<CronJobsSelectOption> {
    return [
      ...this._months
    ];
  }

  public get hours(): Array<CronJobsSelectOption> {
    return [
      ...this._hours
    ];
  }

  public get minutes(): Array<CronJobsSelectOption> {
    return [
      ...this._minutes
    ];
  }

  constructor() {
    this._hours = [];
    for (let x = 0; x < 24; x++) {
      this._hours.push(<CronJobsSelectOption>{value: x, label: `${x}`});
    }

    this._minutes = [];
    for (let x = 0; x < 60; x = x + 5) {
      this._minutes.push(<CronJobsSelectOption>{value: x, label: `${x}`});
    }

  }


  getConfig(config: CronJobsConfig = {}): CronJobsConfig {
    return {
      ...this.defaultConfig,
      ...config
    };
  }

  getValidate(validateConfig: CronJobsValidationConfig = {}): CronJobsValidationConfig {
    return {
      ...this.defaultValidateConfig,
      ...validateConfig
    };
  }

  getDaysOfWeek(): Array<CronJobsSelectOption> {
    return [
      ...this.daysOfWeekPosix
    ];
  }

}
