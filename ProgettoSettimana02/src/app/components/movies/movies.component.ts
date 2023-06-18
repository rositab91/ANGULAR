import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/models/movies.interface';
import { MoviesService } from 'src/app/service/movies.service';
//import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
    sub!: Subscription;
    movies: Movies[] | undefined;

    //imageURL = environment.imageUrl;

    constructor(private moviesSrv: MoviesService) { }

    /*setTimeout(() => {
      this.moviesSrv.recuperaMovie().subscribe((movie: Movies[]) => {
        this.movies = movie;
      });
    }, 1500);
   }*/

    ngOnInit(): void {
        this.movies = this.recuperaMovies();
    }

    recuperaMovies(): any {
        this.sub = this.moviesSrv.recupera().subscribe((movies: Movies[]) => {
            this.movies = movies;
        });
    }
}
