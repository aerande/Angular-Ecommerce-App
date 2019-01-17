import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
//import { DataTableModule } from 'angular-4-data-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdmProductsComponent } from './admin/adm-products/adm-products.component';
import { AdmOrdersComponent } from './admin/adm-orders/adm-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductViewComponent } from './admin/product-view/product-view.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdmProductsComponent,
    AdmOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductViewComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CheckoutSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    //DataTableModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'product/:id', component: ProductViewComponent },

      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      
      { path: 'admin/products', component: AdmProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/view/:id', component: ProductViewComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdmOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
