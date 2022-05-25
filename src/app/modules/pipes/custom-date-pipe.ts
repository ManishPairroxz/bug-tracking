import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name : 'customDatePipe'
})

export class CustomDatePipe implements PipeTransform {
    transform(value : any)  {
        console.log(value);

        console.log(value['year']);
        console.log(value['month']);
        console.log(value['day']);

        console.log();
        let date = moment(new Date(value['year'], value['month'] - 1, value['day'] - 1)).format('DD-MM-YYYY');
        console.log(moment(date).format('DD-MMM-YYYY'));

        return date;
    }
}