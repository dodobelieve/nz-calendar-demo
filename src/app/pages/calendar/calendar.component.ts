import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  /**
   * 日期价格表
   */
  priceMap: { [key: string]: any } = {};
  /**
   * 展示月份
   */
  monthList: Array<Date> = [];
  /**
   * 是否展示详情弹窗
   */
  isShowDetail: boolean = false;

  /**
   * 选中查看的详情日期价格
   */
  detailPrice: any;


  constructor(private datePipe: DatePipe,
    private priceService: PriceService) { }

  ngOnInit() {
    this.getPriceList();
  }

  /**
   * 调用API获取房价数据
   */
  getPriceList() {
    this.priceService.getCalendarPrice().subscribe(d => {
      this.monthList = d.monthList;
      d.prices.forEach(d => {
        this.priceMap[d.date] = d;
      });

      //手动修改部分模拟数据 修改节假日房价数据和自定义房价数据
      this.priceMap["2019-01-01"] = {
        date: "2019-01-01",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-02-04"] = {
        date: "2019-02-04",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-02-05"] = {
        date: "2019-02-05",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-02-06"] = {
        date: "2019-02-06",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-02-07"] = {
        date: "2019-02-07",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-02-08"] = {
        date: "2019-02-08",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-02-09"] = {
        date: "2019-02-09",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-02-10"] = {
        date: "2019-02-10",
        price: 180,
        type: 'holiday'
      };
      this.priceMap["2019-03-12"] = {
        date: "2019-03-12",
        price: 180,
        type: 'user'
      };
    });
  }


  /**
   * 根据日期获取价格类型
   * @param date 日期
   */
  getPriceClass(date: Date) {
    let dateStr = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.priceMap[dateStr] ? this.priceMap[dateStr].type : '';
  }

  /**
   * 根据日期获取价格
   * @param date 日期
   */
  getPrice(date: Date) {
    let dateStr = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.priceMap[dateStr] ? this.priceMap[dateStr].price : '';
  }

  /**
   * 房价点击事件
   */
  priceClick(date: Date) {
    let dateStr = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.detailPrice = this.priceMap[dateStr] ? this.priceMap[dateStr] : null;
    this.isShowDetail = true;
  }

}
