import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/compat/storage'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getStorage, provideStorage} from '@angular/fire/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { IndicatorsModule } from './shared/indicators/spinner';
import { PopupsModule } from './shared/popups';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NotificationModule } from './Services';

import {MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { MenuListComponent } from './Components/menu-list/menu-list.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//import {reducers, effects } from './store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
//import { AuthInterceptor } from './auth-interceptor';

const StoreDevtools = !environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuListComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase.Config)),
    provideFirestore( () => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),

    AngularFireModule.initializeApp(environment.firebase.Config),
    AngularFireStorageModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    IndicatorsModule,
    BrowserAnimationsModule,
    PopupsModule,
    NotificationModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    StoreDevtools,
    // StoreModule.forRoot(reducers, {
    //   runtimeChecks: {
    //     strictActionImmutability: true,
    //     strictStateImmutability: true
    //   }
    // }),
    // EffectsModule.forRoot(effects),
    // HttpClientModule,
  ],
  // providers: [
  //   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
