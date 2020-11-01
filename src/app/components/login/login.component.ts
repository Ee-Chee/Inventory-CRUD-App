import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginFormData: any = {};
    isLoginFailed = false;
    errorMessage = '';

    constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.router.navigate(['/home']);
        }
    }

    onSubmit() {
        this.authService.login(this.loginFormData)
            .subscribe(
                data => {
                    if (data['errMsg']) {
                        this.isLoginFailed = true;
                        this.errorMessage = data['errMsg'];
                    } else {
                        this.tokenStorage.saveToken(data.accessToken);
                        window.location.replace('/home');
                    }
                },
                err => {
                    console.log(err);
                    this.isLoginFailed = true;
                });
    }

}
