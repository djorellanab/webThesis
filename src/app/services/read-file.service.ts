import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../app.constants';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReadFileService {

    constructor(private http: HttpClient) { }

    readFile = (blob: Blob) => Observable.create(obs => {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () =>{
            if (!reader.result) {
                obs.error(new Error('No se ha leido el texto'));
                return;
            }
            obs.next(reader.result);
        }
        reader.onloadend = () => obs.complete();
      
      return reader.readAsText(blob);
    });
}