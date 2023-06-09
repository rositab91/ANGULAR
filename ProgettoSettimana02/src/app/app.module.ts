import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Error404Component } from './components/error404/error404.component';
import { DetailsComponent } from './components/details/details.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
  path: 'home',
  component: HomeComponent,
  children: [
      {
          path: 'login',
          component: LoginComponent
      }
  ]
},
{
  path: 'profile',
  component: ProfileComponent,

  children: [
    {
      path: 'details',
      component: DetailsComponent
    },
    {
      path: 'favourites',
      component: FavouritesComponent
    }
  ]
},
{
  path: 'movies',
  component: MoviesComponent,
  canActivate: [AuthGuard]

},
{
  path: 'users',
  component: UsersComponent,
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: '**',
  component: Error404Component
}

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    Error404Component,
    DetailsComponent,
    FavouritesComponent,
    UsersComponent,
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
