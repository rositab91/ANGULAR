import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movies } from '../models/movies.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  recuperaMovie() {
    return this.http.get<Movies[]>(`${this.baseUrl}movies-popular`);
  }
  }
