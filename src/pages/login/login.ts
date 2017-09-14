import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, Events } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  message: any;

  constructor(public navCtrl: NavController, public userData: UserData, public events: Events) {
    this.message = '';
    this.events.subscribe('user:login_login.ts', (data: any) => {
      this.message = data;
    });
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username, this.login.password);
      //this.navCtrl.push(TabsPage);
    }
  }

}
