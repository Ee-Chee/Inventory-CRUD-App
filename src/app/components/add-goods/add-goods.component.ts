import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { Goods } from '../../interfaces/goods';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-goods',
  templateUrl: './add-goods.component.html',
  styleUrls: ['./add-goods.component.css']
})
export class AddGoodsComponent implements OnInit {
    quantity: number[] = [];
    tempQuantity: number[] = [];
    amount: number = 1; 

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
                if(data['quantity_array'].length == 0){
                    this.quantity = new Array(146).fill(0);
                    this.tempQuantity = [...this.quantity];
                } else {
                    this.quantity = data['quantity_array'];
                    this.tempQuantity = [...this.quantity];
                };
            });

        this.inventoryService.getGoods().pipe(map(arrayData => {
                this.dryGoods = arrayData.filter(objectData => objectData['category'] === "Trockensortiment");

                this.frozenGoods = arrayData.filter(objectData => objectData['category'] === "Tiefkühlprodukte");

                this.coolGoods = arrayData.filter(objectData => objectData['category'] === "Kühl");

                this.packingGoods = arrayData.filter(objectData => objectData['category'] === "Verpackungen");

                this.cleaningGoods = arrayData.filter(objectData => objectData['category'] === "Reinigung");

                this.sideProducts = arrayData.filter(objectData => objectData['category'] === "Sideproducts");

                this.otherProducts = arrayData.filter(objectData => objectData['category'] === "Sonstiges");
            })).subscribe(); 
    }

    subunitAddition(itemId) {
        this.tempQuantity[itemId - 1] = this.quantity[itemId - 1] + 1;

        this.inventoryService.updateQuantity({quantityArray: this.tempQuantity}).subscribe(
            data => {
                console.log(data['message']);
                this.quantity = this.tempQuantity;
            }
        );
    }

    unitAddition(itemId, subunit_n) {
        this.tempQuantity[itemId - 1] = this.quantity[itemId - 1] + subunit_n;

        this.inventoryService.updateQuantity({quantityArray: this.tempQuantity}).subscribe(
            data => {
                console.log(data['message']);
                this.quantity = this.tempQuantity;
            }
        );
    }

    addition(itemId){
        this.tempQuantity[itemId - 1] = this.quantity[itemId - 1] + this.amount;

        this.inventoryService.updateQuantity({quantityArray: this.tempQuantity}).subscribe(
            data => {
                console.log(data['message']);
                this.quantity = this.tempQuantity;
                this.amount = 1;
            }
        );
    }
}
