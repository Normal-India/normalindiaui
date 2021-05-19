import { environment } from './../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { LayoutComponent } from './block/layout/layout/layout.component';
import { FeatureModule } from './feature/feature.module'
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { LegalComponent } from './block/legal/legal.component';
import { SupporterComponent } from './block/supporter/supporter.component';
import { VolunterComponent } from './block/volunter/volunter.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LegalComponent,
    SupporterComponent,
    VolunterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FeatureModule,
    RouterModule,
    SharedModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
