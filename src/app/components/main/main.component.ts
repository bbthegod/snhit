import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../socket';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  socket: SocketService;
  private role: string;
  start: Boolean = false;
  token;
  name;
  studentId;
  session;
  md5;
  constructor(private auth: AuthService, private router: Router, private user: UserService) {}

  ngOnInit() {
    // this.socket = new SocketService();
    this.start = false;
    this.role = localStorage.getItem('role');
    this.token = localStorage.getItem('token');
    this.name = localStorage.getItem('name');
    if (this.token) {
      this.auth
        .checkLogin(this.token)
        .then((res) => {
          if (res.code == 1) {
            let role = localStorage.getItem('role');
            if (role === 'user') {
              this.router.navigate(['']);
            } else {
              localStorage.clear();
              this.router.navigate(['login']);
            }
          } else {
            localStorage.clear();
            this.router.navigate(['login']);
          }
        })
        .catch((err) => {
          localStorage.clear();
          this.router.navigate(['login']);
        });
    } else {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
  //Đăng xuất
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
  //Bắt đầu thi
  Start() {
    //do something
    this.start = !this.start;
    this.socket = new SocketService();
  }
  checkRole() {
    this.md5 = new Md5();
    this.studentId = localStorage.getItem('studentId');
    this.session = sessionStorage.getItem('session');
    let s = this.md5.appendStr(this.role + this.studentId).end();
    if (this.session == s) {
      return true;
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('studentId');
      localStorage.removeItem('name');
      return false;
    }
  }
}
