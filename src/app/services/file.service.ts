import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import{ AppConstants} from '../app.constants';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

    constructor(private http: HttpClient) {}

    post(formData:FormData){
        return this.http.post<any>(`${AppConstants.apiFileURL}/api/v1/upload`, formData);
        /* this.http.post<any>(`${AppConstants.apiFileURL}/api/v1/upload`, formData,{
            reportProgress: true,
            observe: "events"
        }).pipe(
            map(event => this.getEventMessage(event, formData)),
            catchError(this.handleError)
        );*/
    }

    getById(id: string): Observable<HttpResponse<Blob>>{
        return this.http.get<Blob>(`${AppConstants.apiFileURL}/api/v1/upload/${id}`,
         { observe: 'response',
            responseType: 'blob' as 'json'});
    }

    private getEventMessage(event: HttpEvent<any>, formData){
        switch(event.type){
            case HttpEventType.UploadProgress:
                return this.fileUploadProgress(event);

            case  HttpEventType.Response:
                return this.apiResponse(event);
            
            default:
                return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
        }
    }

    private fileUploadProgress(event) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        return { status: 'progress', message: percentDone };
    }

    private apiResponse(event) {
        return event.body;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
      }
}