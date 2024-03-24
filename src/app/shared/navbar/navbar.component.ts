import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  constructor(private AS:AuthService) {}

  user:any = null;
  ngOnInit(): void {
    this.AS.user.subscribe( (res:any) => { 
      if(res.role){
        this.user = res;
      }
    })
  }

  logOut(){
    const model = {};
    this.AS.login(model).subscribe( res => {
      this.user = null;
      this.AS.user.next(res);
    })
  }
}
