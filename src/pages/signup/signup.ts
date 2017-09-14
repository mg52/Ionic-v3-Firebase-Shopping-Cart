import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, Events } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = false;
  message: any;

  constructor(public navCtrl: NavController, public userData: UserData, public events: Events) {
    this.message = '';
    this.events.subscribe('user:signup_signup.ts', (data: any) => {
      this.message = data;
    });
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username, this.signup.password);
    }
  }
}
