import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit() {
    this.inventoryService.verifyUser()
      .subscribe(
        data => {
          // console.log("testf1", data['userId']); //data.userId prompts typescript compiler error
          if (data['userId']) {
            //this.inventoryService.userId = data['userId']; //passing data to service and from service to home component 
            //alternative way: https://stackoverflow.com/questions/36835123/how-do-i-pass-data-to-angular-routed-components
            //line 22 is no longer needed since id can be obtained from req.session.userId on backend server.
            this.isLoggedIn = true;
          }
        }
    )
  }
  
  logout() {
    this.inventoryService.logoutUser()
      .subscribe(
        data => {
          window.location.reload();
        }
    )
  }

}

//reloading everytime url route changed by user. In other word, app component reloaded every time user changes the route url and hence, Oninit function triggered.