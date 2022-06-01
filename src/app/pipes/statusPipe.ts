import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'statusPipe',
    pure: true
})

export class StatusPipeTransform implements PipeTransform {
    transform(value: any) {

        // If value contains hyphen then remove then hyphen & convert to titlecase
        if (value.includes('-')) {
            let replacedValue = value.replace('-', ' ');
            var splitStr = replacedValue.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }

            return splitStr.join(' ');
        }
        // else convert to tilecase & return the value
        else {
            let returnedValue = '';
            return value.charAt(0).toUpperCase() + value.substring(1);
        }
        // return value;
    }
}