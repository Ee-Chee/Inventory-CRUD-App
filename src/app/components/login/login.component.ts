import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
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

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit() {
    this.inventoryService.verifyUser()
      .subscribe(
        data => {
          if (data['userId']) {
            //To prevent user from surfing back /login when they already got logged-in (cookies saved).
            //reloading page is not required. isLoggedIn is already verified by appcomponent
            this.router.navigate(['/home']); 
          }
        }
    )
  }

  onSubmit() {
    this.inventoryService.authenticateUser(this.loginFormData)
      .subscribe(
        data => {
          // console.log("testf3", data['errMsg']);
          if(data['errMsg']) {
            this.isLoginFailed = true;
            this.errorMessage = data['errMsg'];
          } else {
            window.location.replace('/home'); 
            // reloading page is required to trigger isLoggedIn boolean. 
            // However, do not use navigate /home and reload page here. It doesnt work because of async navigation and reloading happens on only /login.
            // During reloading, appcomponent is executed first before '/home' is activated. That means it is still on '/login' page.
          } //else is required. Otherwise it navigates to home eventhough login failed. 
          
        },
        err => {
          console.log(err);
          this.isLoginFailed = true;
        });
  }

}
