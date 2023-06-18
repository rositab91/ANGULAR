import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../models/movies.interface';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {

    baseURL = environment.baseURL;

    constructor(private http: HttpClient) { }

    recupera() {
       return this.http.get<Movies[]>(`${this.baseURL}movies-popular`);
  }
}

