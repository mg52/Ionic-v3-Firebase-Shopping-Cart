import { Injectable } from '@angular/core';

import { Events, NavController } from 'ionic-angular';
//import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  public fireAuth: any;
  inputValue: any;
  theItems: FirebaseListObservable<any[]>;;
  uid: any;
  count: any;

  constructor(
    public events: Events,
    public storage: Storage,
    public af: AngularFire,
  ) {
    this.fireAuth = firebase.auth();
  }

  login(username: string, password: string): void {
      this.af.auth.login({ email: username, password: password })
      .then((auth) => {
        console.log('Log In Successful, UID: ' + auth.uid + ', ' + 'Email: ' + username);
        this.storage.set('UID', auth.uid);
        this.storage.set('EMAIL', username);
        this.storage.set('PASSWORD', password);
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:login');
        //this.navCtrl.push(TabsPage);
      }).catch((err) => {console.log(err.message); this.events.publish('user:login_login.ts', err.message);});
  };

  signup(username: string, password: string): void {
    this.af.auth.createUser({ email: username, password: password })
      .then((auth) => {
          this.storage.set('UID', auth.uid);
          this.storage.set('EMAIL', username);
          this.storage.set('PASSWORD', password);
          this.storage.set(this.HAS_LOGGED_IN, true);
          this.setUsername(username);
          this.events.publish('user:signup');
      })
      .catch((err) => {console.log(err.message); this.events.publish('user:signup_signup.ts', err.message);});
  };

  logout(): void {
    this.af.auth.logout()
    .then(() => {
      this.storage.set('UID', '');
      this.storage.set('EMAIL', '');
      this.storage.set('PASSWORD', '');
      console.log('Log Out Successful');
      this.storage.remove(this.HAS_LOGGED_IN);
      this.storage.remove('username');
      this.storage.remove('cart');
      this.events.publish('user:logout');
      //this.navCtrl.setRoot(LoginPage);
    })
    .catch((err) => console.log(err));
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  addItemToCart(name: string, cost: string, url: string): void {
    this.getUid().then((uid) => {
      this.count = 1;
      this.uid = uid;
      this.theItems = this.af.database.list('/carts' + '/' + this.uid);
      this.theItems.push({ name: name, cost: cost, url: url, count: this.count }).then(() => {
        console.log('Item added to cart');
      })
      .catch(() => {
        console.log('error');
      });
    });
  };

  getItemsFromCart(): any {
    this.getUid().then((uid) => {
      return this.af.database.list('/carts' + '/' + uid);
    });
  };

  /*//SHOPPING CART SYSTEM USING STORAGE
  addItemToCart(name: string, cost: string): void {
    this.inputValue = [{name: name,cost: cost}];
    this.storage.get('cart').then((value) => {
      if(value != null){
        let theVal = value;
        theVal.push(this.inputValue[0]);
        this.storage.set('cart', theVal);
      }
      else{
        let newVal = this.inputValue;
        this.storage.set('cart', newVal);
      }
    });
  };

  getItemsFromCart(): Promise<string> {
    return this.storage.get('cart').then((value) => {
      return value;
    });
  };*/

  getUid(): Promise<string> {
    return this.storage.get('UID').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email)
    .then(() => {
      //console.log('Reset Password Email Sent.');
      this.events.publish('resetPassword', 'Reset Password Email has been sent Successfully.');
    })
    .catch(() => {
      //console.log('Reset Password Email CANNOT Sent.');
      this.events.publish('resetPassword', 'Cannot send Reset Password Email for now.');
    });
  }

}
