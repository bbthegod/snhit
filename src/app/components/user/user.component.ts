import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../socket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  socket: SocketService;
  name = localStorage.getItem('name');
  //Form Sign Up
  form: FormGroup;
  constructor(private auth: AuthService, private router: Router, private user: UserService, private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
    });
    this.user.GetMe().then((res) => {
      if (res) {
        this.form = this.fb.group({
          studentId: [res.studentId, Validators.required],
          name: [res.name, Validators.required],
          phone: [res.phone, Validators.required],
          email: [res.email, Validators.email],
        });
      }
    });
  }
  LogOut() {
    let token = localStorage.getItem('token');
    if (token) {
      if (this.socket) {
        this.socket.disconnect();
        this.socket.onDisconnect().subscribe((result) => {});
      }
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
  Infomation() {
    this.router.navigate(['user']);
  }
  Play() {
    this.router.navigate(['']);
  }
  Update() {
    let body = this.form.value;
    this.user
      .update(body.studentId, body.name, body.phone, body.email)
      .then((result) => {
        if (result) {
          alert('Cập nhật thành công');
        } else {
          alert('Cập nhật thất bại!');
        }
      })
      .catch((err) => {
        alert('Cập nhật thất bại!');
      });
  }
}
