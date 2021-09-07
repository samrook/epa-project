import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: any;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    const headers = {
      /* eslint-disable @typescript-eslint/naming-convention */
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest'
    };
    this.headers = new HttpHeaders(headers);
    this.baseUrl = environment.apiUrl;
  }

  get(endpoint, params = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint;
    }

    const fullUrl = this.baseUrl + endpoint;

    return this.http.get(fullUrl, {
      headers: this.headers,
      params
    });
  }

  post(endpoint, params = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint;
    }

    const fullUrl = this.baseUrl + endpoint;

    return this.http.post(fullUrl, params, {
      headers: this.headers
    });
  }

  put(endpoint, params = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint;
    }

    const fullUrl = this.baseUrl + endpoint;

    return this.http.put(fullUrl, params, {
      headers: this.headers,
    });
  }

  delete(endpoint, params = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint;
    }

    const fullUrl = this.baseUrl + endpoint;

    return this.http.delete(fullUrl, {
      headers: this.headers,
      params
    });
  }
}
