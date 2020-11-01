import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    registrationFormData: any = {};
    isSignUpFailed = false;
    errorMessage = '';
    initialQuantity: number[];

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.router.navigate(['/home']);
        }
    }

    onSubmit() {
        this.authService.register(this.registrationFormData)
            .subscribe(
                data => {
                    if (data['errMsg']) {
                        this.isSignUpFailed = true;
                        this.errorMessage = data['errMsg'];
                    } else {
                        this.tokenStorage.saveToken(data.accessToken);
                        window.location.replace('/home');
                    };
                },
                err => {
                    console.log(err);
                    this.isSignUpFailed = true;
                });
    }
}
