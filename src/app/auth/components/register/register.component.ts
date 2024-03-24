import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  students: any[] = [];

  constructor(
    private fb: FormBuilder,
    private AS: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getStudents();
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  submit() {
    const model = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };

    let index = this.students.findIndex(
      (item) => item.email == this.userForm.value.email
    );

    if (index !== -1) {
      this.toaster.error('this email exist!', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    } else {
      this.AS.createUser(model).subscribe((res: any) => {
        this.toaster.success('success', '', {
          disableTimeOut: false,
          titleClass: 'toastr_title',
          messageClass: 'toastr_message',
          timeOut: 5000,
          closeButton: true,
        });

        const model = {
          username: res.username,
          role: 'students',
          userId: res.id,
        };

        this.AS.login(model).subscribe((res) => {
          this.AS.user.next(res);
        });

        this.router.navigate(['/subjects']);
      });
    }
  }

  getStudents() {
    this.AS.getUsers('students').subscribe((res: any) => {
      this.students = res;
    });
  }

}
