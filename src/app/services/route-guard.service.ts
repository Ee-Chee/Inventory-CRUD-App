import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root'
})

export class RouteGuardService implements CanActivate {

    constructor(private router: Router, private tokenStorage: TokenStorageService) { }

    canActivate() {
        if (this.tokenStorage.getToken()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
