import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //Login
  hide = true;
  isLogin = true;
  //Form Sign Up
  formSignUp: FormGroup;
  //Form Logini
  formLogin: FormGroup;
  md5;
  constructor(private auth: AuthService, private router: Router, private user: UserService, private fb: FormBuilder) {}
  ngOnInit() {
    this.md5 = new Md5();
    //Khởi tạo FormBuilder
    this.formSignUp = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      rePassword: ['', Validators.minLength(6)],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
    });

    this.formLogin = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.minLength(6)],
    });
    //Kiểm tra đăng nhập
    let token = localStorage.getItem('token');
    if (token) {
      this.auth
        .checkLogin(token)
        .then((res) => {
          if (res.code == 1) {
            let role = localStorage.getItem('role');
            if (role === 'user') {
              this.router.navigate(['']);
            } else {
              localStorage.clear();
            }
          } else {
            localStorage.clear();
          }
        })
        .catch((err) => {
          localStorage.clear();
        });
    } else {
      localStorage.clear();
    }
  }
  Login() {
    let body = this.formLogin.value;
    this.auth
      .logIn(body.studentId, body.password)
      .then((result) => {
        if (result.code == 1) {
          if (result.user.role === 'user') {
            localStorage.setItem('token', result.token);
            localStorage.setItem('name', result.user.name);
            localStorage.setItem('studentId', result.user.studentId);
            localStorage.setItem('role', result.user.role);
            sessionStorage.setItem('session', this.md5.appendStr(result.user.role + result.user.studentId).end());
            return this.router.navigate(['']);
          } else {
            localStorage.clear();
            alert('Không phải tài khoản người dùng !');
            this.router.navigate(['login']);
          }
        } else {
          localStorage.clear();
          alert('Đăng nhập thất bại!');
        }
      })
      .catch((err) => {
        localStorage.clear();
        alert('Đăng nhập thất bại!');
      });
  }
  SignUp() {
    let body = this.formSignUp.value;
    if (body.password == body.rePassword) {
      this.user
        .SignUp(body.studentId, body.password, body.name, body.phone, body.email)
        .then((result) => {
          console.log(result);
          if (result.code == 1) {
            var a = {
              email: body.email,
              studentId: body.studentId,
            };
            localStorage.setItem('registerHash', btoa(JSON.stringify(a)));
            return this.router.navigate(['active']);
          } else {
            localStorage.clear();
            alert('Đăng kí thất bại!');
          }
        })
        .catch((err) => {
          localStorage.clear();
          alert('Đăng kí thất bại!' + err);
        });
    } else {
      localStorage.clear();
      alert('Mật khẩu không trùng.');
    }
  }
}
