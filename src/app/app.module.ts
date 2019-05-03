import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { HouseComponent } from './house/house.component';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { PersonComponent } from './person/person.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireStorageModule } from 'angularfire2/storage';
import { PopulationGraphComponent } from './population-graph/population-graph.component';
import { ChartsModule } from 'ng2-charts';
import { AuthGuard } from './guards/auth.guard';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { ApproverAuthGuard } from './guards/approver-auth.guard';
import { VolunteerAuthGuard } from './guards/volunteer-auth.guard';
import { PersonAuthGuard } from './guards/person-auth.guard';
import { DataService } from './services/data.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: '',
        component: PopulationGraphComponent,
      },
      {
        path: 'volunteers',
        component: VolunteerComponent,
        canActivate:[ApproverAuthGuard]
      },
      {
        path: 'house',
        component: HouseComponent,
        canActivate:[VolunteerAuthGuard]
      },
      {
        path: 'person',
        component: PersonComponent,
        canActivate:[VolunteerAuthGuard,PersonAuthGuard]
      }
    ]
  } 
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    DashboardComponent,
    VolunteerListComponent,
    HouseComponent,
    MustMatchDirective,
    PersonComponent,
    PopulationGraphComponent,
    VolunteerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
