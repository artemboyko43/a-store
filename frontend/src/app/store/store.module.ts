import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { StoreComponent } from "./store.components";
import { CounterDirective } from "./counter.directive";
import { CartSummaryComponent } from "./cartSummary/cartSummary.component";
import { CartDetailComponent } from "./cartDetail/cartDetail.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
    declarations: [StoreComponent, CounterDirective, CartSummaryComponent, CartDetailComponent, CheckoutComponent], 
    exports: [StoreComponent, CartDetailComponent, CheckoutComponent]
})
export class StoreModule { }