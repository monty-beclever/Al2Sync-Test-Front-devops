import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { CoopsComponent } from './pages/coops/coops.component';
import { NewCoopsComponent } from './pages/new-coops/new-coops.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { FilterComponent } from './components/filter/filter.component';
import { FileImportComponent } from './components/file-import/file-import.component';
import { FileComponent } from './components/file/file.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { NewPartnersComponent } from './pages/new-partners/new-partners.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TableActionModalComponent } from './components/table-action-modal/table-action-modal.component';
import { SvgComponent } from './components/svg/svg.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SelectPickerComponent } from './components/select-picker/select-picker.component';
import { NewUsersComponent } from './pages/new-users/new-users.component';
import { TableContentMessageComponent } from './components/table-content-message/table-content-message.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UsersComponent } from './pages/users/users.component';
import { SearchDropdownComponent } from './components/search-dropdown/search-dropdown.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { TyCComponent } from './components/tyc/tyc.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    CoopsComponent,
    NewCoopsComponent,
    SortingComponent,
    FilterComponent,
    FileImportComponent,
    FileComponent,
    PartnersComponent,
    NewPartnersComponent,
    TransactionsComponent,
    TableActionModalComponent,
    SvgComponent,
    SearchDropdownComponent,
    ErrorMessageComponent,
    SelectPickerComponent,
    NewUsersComponent,
    TableContentMessageComponent,
    NotificationComponent,
    UsersComponent,
    PasswordChangeComponent,
    TyCComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
