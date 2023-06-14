import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies.interface';
import { MoviesService } from 'src/app/service/movies.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
movies!: Movies[];
imageURL = environment.imageUrl;

  constructor(private moviesSrv: MoviesService) {
    setTimeout(() => {
      this.moviesSrv.recuperaMovie().subscribe((movie: Movies[]) => {
        this.movies = movie;
      });
    }, 1500);
   }

  ngOnInit(): void {
  }
}
