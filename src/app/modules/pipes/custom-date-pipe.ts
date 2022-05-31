import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name : 'customDatePipe'
})

export class CustomDatePipe implements PipeTransform {
    transform(value : any)  {
        console.log(value);
        let date = moment(new Date(value['year'], value['month'] - 1, value['day'])).format('DD-MM-YYYY');
        console.log(date);
        return date;
    }
}