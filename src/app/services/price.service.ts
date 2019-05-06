import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private datePipe: DatePipe) { }
  prices = new Subject<any>();

  /**
   * 获取日历房价
   */
  getCalendarPrice() {
    let priceChanged: Observable<any> = this.prices.asObservable();
    setTimeout(() => { this.generateData(); }, 10);
    return priceChanged;
  }


  /**
   * 生成模拟数据
   */
  generateData() {
    let arrPrice = [];
    let startDay = new Date("2019-01-01");
    for (let i = 0; i < 90; i++) {
      let priceDate = new Date(startDay.setDate(startDay.getDate() + 1));
      let type = (priceDate.getDay() == 5 || priceDate.getDay() == 6) ? "weekend" : "normal";
      let price = (priceDate.getDay() == 5 || priceDate.getDay() == 6) ? 160 : 120;
      arrPrice.push({
        date: this.datePipe.transform(priceDate, 'yyyy-MM-dd'),
        price: price,
        type: type
      });
    }
    this.prices.next({ prices: arrPrice, monthList: [new Date('2019-01-01'), new Date('2019-02-01'), new Date('2019-03-01')] });
  }

}
