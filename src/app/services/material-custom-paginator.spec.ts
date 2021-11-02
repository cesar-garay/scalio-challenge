import { TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TRANSLATIONS } from 'src/test-const';
import { CustomPaginatorIntl } from './material-custom-paginator';

describe('CustomPaginatorIntl', () => {
    let service: CustomPaginatorIntl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateTestingModule.withTranslations(TRANSLATIONS),
            ],
            providers: [CustomPaginatorIntl]
        });
        service = TestBed.inject(CustomPaginatorIntl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('when language change', () => {
        beforeEach(() => {
            service.translateService.use('es');
        });

        it('should generate translations', () => {
            expect(service.firstPageLabel).toBe('primera pagina');
        })
    });

    describe('when generate range labels', () => {
        beforeEach(() => {
            service.getRangeLabel(0,10,20);
        });

        it('should generate translations', () => {
            expect(service.previousPageLabel).toBe('Page 1 of 2');
        })
    });

    describe('when generate range labels for only one page', () => {
        beforeEach(() => {
            service.getRangeLabel(0,10,0);
        });

        it('should generate translations', () => {
            expect(service.previousPageLabel).toBe('Page 1 of 1');
        })
    });

});
