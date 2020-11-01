import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isLoggedIn: boolean = false;

    constructor(private router: Router, private tokenStorage: TokenStorageService) { }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
        }
    }

    logout() {
        this.tokenStorage.signOut();
        window.location.reload();
    }

}
