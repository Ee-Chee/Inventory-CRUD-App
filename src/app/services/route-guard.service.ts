import { Injectable } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { CanActivate, Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RouteGuardService implements CanActivate {

    constructor(private inventoryService: InventoryService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.inventoryService.verifyUser().pipe(map(
            data => {
                // console.log(data);
                if (data['userId']) {
                    return true;
                }

                this.router.navigate(['login']);
                return false;
            }

        ));
    }
    //canActivate is used here to prevent user from surfing some protected routes without cookies. In this case, it is home route.
    //httpclient is an async Observable.
    //canActivate must return a boolean. True => route activated, otherwise, blocked 
    //Thats why Observable<boolean> and follows by 'return' are necessary.

    //pipe takes multiple operators (map and so on) and chaining the data emitted/pushed (next(data) //next page of magazine) by httpClient Observable to its consumer/subscriber. 
    //Pipeable operator like map in this case takes Observable as input and returns ANOTHER OBSERVABLE (PURE operation).
    //Subscribing is possible after map operation of an Observable.
    //https://rxjs.dev/guide/operators
    //https://stackoverflow.com/questions/48668701/what-is-pipe-for-in-rxjs#:~:text=The%20pipe%20method&text=the%20pipable%20operator%20is%20that,previous%20observable%20stays%20unmodified.&text=What%20pipe%20mean%3F,pure%20functions%20under%20rxjs%2Foperators%20.

    // alternative like following is not workable, to force Observable returns something => use pipe and map:
    // .subscribe(data=>{
    //   if (data['userId']) {

    //     return true;
    //   }
    //   this.router.navigate(['login']);
    //   return false;
    // })
}
