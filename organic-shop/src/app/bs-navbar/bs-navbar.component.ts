import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bs-navbar',
	templateUrl: './bs-navbar.component.html',
	styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
	appUser: AppUser;
	shoppingCartItemCount: number;
	
	constructor(
		private auth: AuthService,
		private shoppingCartService: ShoppingCartService) { }

	async ngOnInit() {
		this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
		let ref = await this.shoppingCartService.getCartNew();
		ref.on("value", cart => {
			if(!cart.child('/items/').exists()) {this.shoppingCartItemCount = 0; return;}
			let getQuantity = cart.child('/items').val();
			let keys = Object.keys(getQuantity);
			this.shoppingCartItemCount = 0;
			for (let i=0; i<keys.length; i++) {
				let k = keys[i];
				this.shoppingCartItemCount += getQuantity[k].quantity;
			}
		});
		
		
		// let cart$ = await this.shoppingCartService.getCart();
		// cart$.subscribe(cart => {
		// 	console.log(typeof(cart));
		// 	console.log(cart);
		// });
		
	}

	logout() {
		this.auth.logout();
	}
}