import { Pipe, PipeTransform } from '@angular/core';

//dont use function expression on angular template:
//https://medium.com/showpad-engineering/why-you-should-never-use-function-calls-in-angular-template-expressions-e1a50f9c0496
//use pipe to transform the input data to your desired output

@Pipe({name: 'transformUnit'})

export class TransformUnitPipe implements PipeTransform {
    transform(value: number, unit: string, subunit?: string, subunit_n?: number): string {
        if(subunit){
            let quotient = Math.floor(value/subunit_n);
            let remainder = value % subunit_n;
            return `${quotient} ${unit} + ${remainder} ${subunit}`;
        } else {
            return `${value} ${unit}`;
        }
    }
}