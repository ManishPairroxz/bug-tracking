import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name : 'customDatePipe'
})

export class CustomDatePipe implements PipeTransform {
    transform(value : any)  {
         

         
         
         

         
        let date = moment(new Date(value['year'], value['month'] - 1, value['day'] - 1)).format('DD-MM-YYYY');
         

        return date;
    }
}