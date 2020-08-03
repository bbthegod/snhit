import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css'],
})
export class ActiveComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private user: UserService, private fb: FormBuilder) {}
  hash;
  changeEmail = false;
  formChangEmail: FormGroup;
  formActive: FormGroup;
  ngOnInit() {
    if (!localStorage.getItem('registerHash')) {
      this.router.navigate(['']);
    } else {
      this.hash = JSON.parse(atob(localStorage.getItem('registerHash')));
      //Khởi tạo FormBuilder
      this.formActive = this.fb.group({
        code: ['', Validators.required],
      });

      this.formChangEmail = this.fb.group({
        email: ['', Validators.required],
      });
    }
  }
  Toggle() {
    this.changeEmail = true;
  }
  ChangEmail() {
    let body = this.formChangEmail.value;
    this.auth
      .changeEmail(this.hash.studentId, body.email)
      .then((result) => {
        if (result.code == 1) {
          alert('Thay đổi email thành công');
          var a = {
            email: body.email,
            studentId: this.hash.studentId,
          };
          localStorage.setItem('registerHash', btoa(JSON.stringify(a)));
          this.hash = a;
          this.changeEmail = false;
        } else if (result.code == 2 && result.message == 'Account is actived') {
          alert('Tài khoản đã được xác nhận');
        } else {
          alert('Thay đổi email thất bại!');
        }
      })
      .catch((err) => {
        alert('Thay đổi email thất bại!');
      });
  }
  Active() {
    let body = this.formActive.value;
    this.auth
      .active(this.hash.studentId, body.code)
      .then((result) => {
        console.log(result);
        if (result.code == 1) {
          alert('Xác nhận thành công');
          this.router.navigate(['']);
        } else if (result.code == 2 && result.message == 'Account is actived') {
          alert('Tài khoản đã được xác nhận');
        } else {
          alert('Xác nhận thất bại !');
        }
      })
      .catch((err) => {
        alert('Xác nhận thất bại !');
      });
  }
  Resend() {
    this.auth
      .resend(this.hash.studentId)
      .then((result) => {
        if (result.code == 1) {
          alert('Mã xác nhận đã được gửi đến địa chỉ ' + this.hash.email);
        } else if (result.code == 2 && result.message == 'Account is actived') {
          alert('Tài khoản đã được xác nhận');
        } else {
          alert('Gửi mã xác nhận thất bại!');
        }
      })
      .catch((err) => {
        alert('Gửi mã xác nhận thất bại!');
      });
  }
}
