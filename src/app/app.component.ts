import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Operation } from './Operation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public actualDate:any //Update the date and the time every second

  public transaction:any; //List whole transactions.json file
  public detransaction:any; //List only one transaction in more details section

  public constructor(private http:HttpClient){}

  ngOnInit(): void {

    const url:string = '../assets/data/transactions.json';

    this.http.get(url).subscribe((response) => {this.transaction = response}) //Obtaining the transactions.json information

    setInterval(() => { //Update the date and the time every second
      this.actualDate = new Date().toLocaleString();
    }, 1000);

  }

  //----------------------------- Exercise 1 ---------------------------------

  public username:string = ""
  public font:string = ""
  public style:string = ""
  public alignment:string = ""

  //----------------------------- Exercise 2 ---------------------------------

  public operation:string = ""
  public num1:number = 0
  public num2:number = 0
  public result:number = 0

  public date:Date = new Date()

  public operations:Operation[] = new Array()

  operate(){

    if(this.operation == "sum"){

      this.result = this.num1 + this.num2      

    }else if(this.operation == "subtraction"){

      this.result = this.num1 - this.num2      

    }else if(this.operation == "multiplication"){

      this.result = this.num1 * this.num2   
  
    }else if(this.operation == "division"){

      this.result = this.num1 / this.num2   
  
    }

    this.operations.push(new Operation(this.date.toLocaleString(), this.num1 + " " + this.operation + " " + this.num2, this.result)) // Pushing into the array an Operation 

  }

  delete(i:number){

    this.operations.splice(i, 1)

  }

  //----------------------------- Exercise 3 ---------------------------------

  getSortOrder(prop: string | number) { // function created to sort the elements of the table
    return function(a: { [x: string]: number; }, b: { [x: string]: number; }) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
  } 

  sortId(){

    this.transaction = this.transaction.sort(this.getSortOrder("id"));

  }

  sortAmount(){

    this.transaction = this.transaction.sort(this.getSortOrder("amount"));

  }

  sortBalance(){

    this.transaction = this.transaction.sort(this.getSortOrder("balance"));

  }

  sortLabel(){

    this.transaction = this.transaction.sort(this.getSortOrder("label")); //Here is order in reverse alphabetically, if you want to use normal alphabetically order, only have to change the function signs

  }

  sortDate(){

    this.transaction = this.transaction.sort(this.getSortOrder("date"));

  }

  details(j:number){ //More details function. For some reason you have to press twice the button to show the more details

    const elemid:any = document.getElementById("elemid")
    const elemamount:any = document.getElementById("elemamount")
    const elembalance:any = document.getElementById("elembalance")
    const elemlabel:any = document.getElementById("elemlabel")
    const elemdate:any = document.getElementById("elemdate")

    console.log(j)

    const url2:string = '../assets/data/'+ j +'.json'; // Obtaining the specific information for the specific json file requiered by the user.

    this.http.get(url2).subscribe((response) => {this.detransaction = response})

    elemid.innerHTML = "Id: " + this.detransaction.id
    elemamount.nnerHTML = "Amount: " + this.detransaction.amount
    elembalance.innerHTML = "Balance: " + this.detransaction.balance
    elemlabel.innerHTML = "Label: " + this.detransaction.label
    elemdate.innerHTML = "Date: " + this.detransaction.date
      
  }

}

