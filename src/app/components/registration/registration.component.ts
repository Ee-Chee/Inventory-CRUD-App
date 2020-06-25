import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
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

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit() {
    this.inventoryService.verifyUser()
      .subscribe(
        data => {
          if (data['userId']) {
            //To prevent user from surfing back /registration when they already got logged-in (cookies saved).
            //reloading page is not required. isLoggedIn is already verified by appcomponent.
            this.router.navigate(['/home']); 
          }
        }
    )
  }

  onSubmit() {
    this.inventoryService.createUser(this.registrationFormData)
      .subscribe(
        data => {
          // console.log("testf2", data);
          if(data['errMsg']) {
            this.isSignUpFailed = true;
            this.errorMessage = data['errMsg'];
          } else {
            window.location.replace('/home');
            //reloading page is required to trigger isLoggedIn boolean. 
            //However, do not use navigate /home and reload page here. It doesnt work because of async navigation and reloading happens on only /registration.
            //During reloading, appcomponent is executed first before '/home' is activated. That means it is still on '/registration' page.
          } //else is required. Otherwise it navigates to home eventhough sign-up failed.

        },
        err => {
          console.log(err);
          this.isSignUpFailed = true;
        });
  }
}
