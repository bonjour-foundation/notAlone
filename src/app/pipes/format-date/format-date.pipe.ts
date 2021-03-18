import {Pipe, PipeTransform} from '@angular/core';

import {FormatDateService} from '../../services/format-date/format-date.service';

@Pipe({name: 'formatDate'})
export class FormatDatePipe implements PipeTransform {

    constructor(private formatDateService: FormatDateService) {

    }

    transform(input: any): any {
        return this.formatDateService.transform(input);
    }
}
