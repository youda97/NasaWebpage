import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { NasaApiService } from './nasa-api.service';
import { CollectionService } from './collection.service';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ValidateService } from './validate.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin.service';

const appRoutes: Routes = [
  { path: '', component: NotLoggedInComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile', component: ProfileComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'policies', component: AdminLoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotLoggedInComponent,
    NavbarComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    AdminLoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule,
    HttpModule
  ],
  providers: [AuthService, ValidateService, AdminService, CollectionService, NasaApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
