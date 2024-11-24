import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(private http: HttpClient) { }
  baseURL = environment.API_URL;

  request(
    requestType: string,
    requestURL: string,
    requestBody: any,
    respoType:any
  ): any {

    // for get request..
    if (requestType === 'get') {
      return this.http.get(this.baseURL + requestURL, {  responseType: respoType });
    }

    // for post request(adding)..
    if (requestType === 'post') {
      return this.http.post(this.baseURL + requestURL, requestBody, {  responseType: respoType });
    }

    // for put request(updating with all required values)..
    if (requestType === 'put') {
      return this.http.put(this.baseURL + requestURL, requestBody, {  responseType: respoType });
    }

    // for patch request(updating with specific values)..
    if (requestType === 'patch') {
      return this.http.patch(this.baseURL + requestURL, requestBody, {  responseType: respoType });
    }

    // for delete request..
    if (requestType === 'delete') {
      return this.http.delete(this.baseURL + requestURL, {  responseType: respoType });
    }
  }
}
