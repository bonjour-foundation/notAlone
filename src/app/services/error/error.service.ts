import {Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    private errorSubject: Subject<string> = new Subject();

    watchError(): Observable<string> {
        return this.errorSubject.asObservable();
    }

    error(key: string) {
        this.errorSubject.next(key);
    }

}
