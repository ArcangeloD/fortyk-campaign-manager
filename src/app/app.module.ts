import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { NavComponent } from './nav/nav.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { IsLoggedGuard } from './is-logged.guard'
import { IsNotLoggedGuard } from './is-not-logged.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component'

//bootsrap modules


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    NavComponent,
    LoginRegisterComponent,
    NotFoundComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgbModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'news', component: NewsComponent},
      {path: 'login-register', component: LoginRegisterComponent,canActivate: [IsNotLoggedGuard]},
      {path: 'not-authorized', component: NotAuthorizedComponent},
      {path: '',   redirectTo: 'home', pathMatch: 'full'},
      {path: '**', component: NotFoundComponent}
    ])
  ],
  providers: [IsLoggedGuard, IsNotLoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
