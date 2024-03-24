import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users: any[] = [];
  type: string = 'students';

  constructor(
    private fb: FormBuilder,
    private AS: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.login();
    this.getUsers();
  }

  login() {
    this.loginForm = this.fb.group({
      type: [this.type],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    let index = this.users.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );
    if (index == -1) {
      this.toaster.error('email or password incorrect', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 6000,
        closeButton: true,
      });
    } else {
      const model = {
        username: this.users[index].username,
        role: this.type,
      };

      this.AS.login(model).subscribe((res) => {
        this.AS.user.next(res),
          this.toaster.success('you are login', '', {
            disableTimeOut: false, 
            titleClass: 'toastr_title',
            messageClass: 'toastr_message',
            timeOut: 6000,
            closeButton: true,
          });
          this.router.navigate(['/subjects']);
      });
    }
  }

  getRole(event:any){
    this.type = event.value;
    this.getUsers();
  }

  getUsers(){
    this.AS.getUsers(this.type).subscribe((res:any) =>{
      this.users = res;
    })
  }
}
