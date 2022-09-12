import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public shared:ApiService) { }
  menuVarriable:boolean= false;
  menu_icon_varriable:boolean=false;
  data:string="Login signup";
  

  // var msg
  // this.shared.setMessage(msg);


  ngOnInit(): void {
    this.data= this.shared.getInOut()
  }

}
