import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, LatestMovies, MovieResult, Result } from './movie.interface';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  latestMovies: LatestMovies[] = [];

  constructor() {}

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http
      .get<ApiResult>(
        `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
      )
  }

  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
  }

  getLatestMovies(): Observable<LatestMovies[]> {
    return this.http
      .get<LatestMovies[]>(
        `${BASE_URL}/movie/popular?page=1&api_key=${API_KEY}&limit=5`
      )
      .pipe(
        map((response: LatestMovies[]) => {
          this.latestMovies = response;
          return response;
        })
      );
  }
}
