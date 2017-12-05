import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CollectionComponent } from './Components/collection/collection.component';
import { CollectionDetailsComponent } from './Components/collection-details/collection-details.component';
import { CreateCollectionComponent } from './Components/create-collection/create-collection.component';
import { EditCollectionComponent } from './Components/edit-collection/edit-collection.component';
import { DeleteCollectionComponent } from './Components/delete-collection/delete-collection.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';

//Forms
import { FormsModule } from "@angular/forms";

//Material design modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatButtonModule,
  MatCheckboxModule,
  MatCardModule, 
  MatGridListModule, 
  MatInputModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatToolbarModule, 
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,
  DateAdapter,
  MAT_DATE_FORMATS } from '@angular/material'

//Routes
import {RouterModule, Routes} from '@angular/router';

//Firebase configuration
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//service
import { FirebaseService } from "./services/firebase.service";

//auth 0
import {AuthService} from  "./services/auth.service";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'collection', component: CollectionComponent, pathMatch: 'full' },
  {path: 'collection-details/:id', component: CollectionDetailsComponent, pathMatch: 'full' },
  {path: 'create-collection', component: CreateCollectionComponent, pathMatch: 'full' },
  {path: 'edit-collection/:id', component: EditCollectionComponent, pathMatch: 'full' },
  {path: 'delete-collection/:id', component: DeleteCollectionComponent, pathMatch: 'full' }

  ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CollectionComponent,
    CollectionDetailsComponent,
    CreateCollectionComponent,
    EditCollectionComponent,
    DeleteCollectionComponent,
    NavbarComponent,
    FooterComponent
  ],
  
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatCardModule,MatGridListModule,MatInputModule,MatDatepickerModule,
    MatNativeDateModule,MatToolbarModule,MatListModule,MatIconModule,MatTabsModule, MatProgressSpinnerModule, 
    AngularFireModule.initializeApp(environment.firebase, 'nasa-collection-app'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [FirebaseService, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
