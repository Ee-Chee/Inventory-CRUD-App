import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { Goods } from '../../interfaces/goods';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    quantity: number[] = [];
    tempQuantity: number[] = [];
    amount: number = 1; //define default value for input tag. ngModel(two way binding) shows the initial value on input tag. 
    //Attribute value is not used as it is not working with ngModel.

    dryGoods: Goods[] = [];
    frozenGoods: Goods[] = [];
    coolGoods: Goods[] = [];
    packingGoods: Goods[] = [];
    cleaningGoods: Goods[] = [];
    sideProducts: Goods[] = [];
    otherProducts: Goods[] = [];

    constructor( private inventoryService: InventoryService ) { }

    ngOnInit() {
        this.inventoryService.getQuantity()
            .subscribe(data => {
                this.quantity = data['quantity_array'];
                this.tempQuantity = [...this.quantity];
            });

        this.inventoryService.getGoods().pipe(map(arrayData => {
                // console.log("mapdata: ", arrayData);
                this.dryGoods = arrayData.filter(objectData => {
                    // console.log("filterdata: ", objectData);
                    return objectData['category'] === "Trockensortiment"; //dont forget return if more than one line
                });
                //Pure function, the array object data doest mutate after executing filters.
                this.frozenGoods = arrayData.filter(objectData => objectData['category'] === "Tiefkühlprodukte");

                this.coolGoods = arrayData.filter(objectData => objectData['category'] === "Kühl");

                this.packingGoods = arrayData.filter(objectData => objectData['category'] === "Verpackungen");

                this.cleaningGoods = arrayData.filter(objectData => objectData['category'] === "Reinigung");

                this.sideProducts = arrayData.filter(objectData => objectData['category'] === "Sideproducts");

                this.otherProducts = arrayData.filter(objectData => objectData['category'] === "Sonstiges");

            })).subscribe(); //subscribe is needed here to execute map and get the results
        //Important:
        //https://stackoverflow.com/questions/37991713/simple-filter-on-array-of-rxjs-observable
        //https://stackoverflow.com/questions/42704552/of-vs-from-operator
        //check this example of Observable<ArrayObj> that is using 'from': https://www.learnrxjs.io/learn-rxjs/operators/filtering/filter?q=from
        //If filter is used directly after pipe in my case, pipe(filter(data => ...)) will not work because it is wrapped with Observable<ArrayObject>. Each element/data is still an array object.  
        //Thus map operator is used first to 'remove' array and then 'access' the object content with filter(Note: it is Array prototype! not operator):
        //([obj1, obj2, obj3], [obj4, obj5], [obj6]...) // (data1, data2, data3)=> use map to loop through array and then use filter to loop through object contents.    
        //In my case, only one data array existing (data1) or ([obj1, obj2, ....])
        //It is different from example shown with method 'from'. 'from' prints already the elements one after another. Thats why map operator is not required.
    }

    subunitSubstraction(itemId) {
        let itemQuantity = this.quantity[itemId - 1];
        // console.log(itemQuantity);
        if(itemQuantity < 1){
            window.alert("keine Ware!");
        } else {
            this.tempQuantity[itemId - 1] = itemQuantity - 1;
            // console.log(this.quantity[itemId - 1]);
            // console.log(this.quantity);
            this.inventoryService.updateQuantity({quantityArray: this.tempQuantity}).subscribe(
                data => {
                    console.log(data['message']);
                    this.quantity = this.tempQuantity;
                }
            );
        }
    }

    // subunitSubstraction(itemId) {
    //     let itemQuantity = this.quantity[itemId - 1];
    //     if(itemQuantity < 1){
    //         window.alert("keine Ware!");
    //     } else {
    //         this.quantity[itemId - 1] = itemQuantity - 1; // <= this makes the UI updates without waiting
    //         this.inventoryService.updateQuantity({quantityArray: this.quantity}).subscribe();
    //     }
    // }

    //There are two methods to react on angular FE. One with tempQuantity and one without. Both works, but BE must response, so that subscription is working and data update process is completed faster.
    //The first method is used here because it makes sure the data is completely updated in SQL db first before Angular displays the data.
    //In this way, the user should know that he has to wait little bit (when he didnt see the amount is updated after clicking).
    //Uncomment the lines to see the difference.
    //Second method updates the UI immediately without waiting data is saved in SQL db.

    unitSubstraction(itemId, subunit_n) {
        let itemQuantity = this.quantity[itemId - 1];

        if(itemQuantity < subunit_n){
            window.alert("Mangelware!");
        } else {
            this.tempQuantity[itemId - 1] = itemQuantity - subunit_n;
            this.inventoryService.updateQuantity({quantityArray: this.tempQuantity}).subscribe(
                data => {
                    console.log(data['message']);
                    this.quantity = this.tempQuantity;
                }
            );
        }
    }

    substraction(itemId){
        let itemQuantity = this.quantity[itemId - 1];
        // console.log(itemQuantity, this.amount);
        if(itemQuantity < this.amount){
            window.alert("Mangelware!");
        } else {
            this.tempQuantity[itemId - 1] = itemQuantity - this.amount;
            this.inventoryService.updateQuantity({quantityArray: this.tempQuantity}).subscribe(
                data => {
                    console.log(data['message']);
                    this.quantity = this.tempQuantity;
                }
            );
        }
    }

    changeAmount($event) { 
        //event is used here instead of two way binding because it updates also the other rows amount as a number is entered.
        //[(ngModel)]="amount" 
        //keyup event for handling key-in number
        //change event for handling arrow change
        // console.log($event.target.value);
        this.amount = parseInt($event.target.value); //parse the returned string into number! 
        //also used to handle float numbers, returning them to int. console.log(parseInt"1.77"); => 1
    }
}
