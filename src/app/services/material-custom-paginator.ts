import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
    changes = new Subject<void>();

    // For internationalization, the `$localize` function from
    // the `@angular/localize` package can be used.
    firstPageLabel = `First page`;
    itemsPerPageLabel = `Items per page:`;
    lastPageLabel = `Last page`;

    // You can set labels to an arbitrary string too, or dynamically compute
    // it through other third-party internationalization libraries.
    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';
    constructor(public translateService: TranslateService) {
        this.generateTranslations();
        translateService.onLangChange.subscribe(() => {
            this.generateTranslations();
            this.changes.next();
        })

    }

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return this.previousPageLabel = this.translateService.instant('PAGINATOR.RANGE', { first: 1, last: 1 });
        }
        const amountPages = Math.ceil(length / pageSize);
        return this.previousPageLabel = this.translateService.instant('PAGINATOR.RANGE', { first: page + 1, last: amountPages });
    }

    private generateTranslations() {
        this.firstPageLabel = this.translateService.instant('PAGINATOR.FIRST_PAGE');
        this.itemsPerPageLabel = this.translateService.instant('PAGINATOR.ITEMS_PER_PAGE');
        this.lastPageLabel = this.translateService.instant('PAGINATOR.LAST_PAGE');
        this.nextPageLabel = this.translateService.instant('PAGINATOR.NEXT_PAGE');
        this.previousPageLabel = this.translateService.instant('PAGINATOR.PREV_PAGE');
    }
}