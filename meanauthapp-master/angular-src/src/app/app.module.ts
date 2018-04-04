import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { StoreComponent } from './components/store/store.component';

import { ResourceService } from './services/resource.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import {CheckoutService} from './services/checkout.service';
import {RequestService} from './services/request.service';
import {DashboardService} from './services/dashboard.service';


import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ElementsComponent } from './components/elements/elements.component';
import { CartComponent } from './components/cart/cart.component';
import { AddResourceComponent } from './components/add-resource/add-resource.component';
import { RequestResourceComponent } from './components/request-resource/request-resource.component';
import { ResourceComponent } from './components/resource/resource.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { OrderfailureComponent } from './components/orderfailure/orderfailure.component';
import { RequestdoneComponent } from './components/requestdone/requestdone.component';
import { RequestfailureComponent } from './components/requestfailure/requestfailure.component';
import { AddedsuccessComponent } from './components/addedsuccess/addedsuccess.component';
import { AddedfailureComponent } from './components/addedfailure/addedfailure.component';
import { OrderviewComponent } from './components/orderview/orderview.component';
import { RequestResourceviewComponent } from './components/request-resourceview/request-resourceview.component';

import { FileSelectDirective } from 'ng2-file-upload';



const appRoutes: Routes = [{
  path: '',
  component: NavbarComponent,
  children: [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'store', component: StoreComponent },
    { path: 'elements', component: ElementsComponent },
    { path: 'contactus', component: ContactusComponent },
   
    { path: 'cart', component: CartComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
    { path: 'add-resource', component: AddResourceComponent,canActivate: [AuthGuard] },
    { path: 'request-resource', component: RequestResourceComponent,canActivate: [AuthGuard] },
    { path: 'resource/:id', component: ResourceComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'orderplaced', component: OrderplacedComponent },
    { path: 'orderfailure', component: OrderfailureComponent },
    { path: 'requestdone', component: RequestdoneComponent },
    { path: 'requestfailure', component: RequestfailureComponent },
    { path: 'addedsuccess', component: AddedsuccessComponent },
    { path: 'addedfailure', component: AddedfailureComponent },
    { path: 'orderview', component: OrderviewComponent },
    { path: 'request-resourceview', component: RequestResourceviewComponent }
  ]

}]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    StoreComponent,
    AboutusComponent,

    ContactusComponent,
    ElementsComponent,
    CartComponent,
    AddResourceComponent,
    RequestResourceComponent,
    ResourceComponent,
    CheckoutComponent,
    OrderplacedComponent,
    OrderfailureComponent,
    RequestdoneComponent,
    RequestfailureComponent,
    AddedsuccessComponent,
    AddedfailureComponent,
    OrderviewComponent,
    RequestResourceviewComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, ResourceService, ShoppingCartService,CheckoutService,RequestService,DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
