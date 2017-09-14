import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, MenuController, ItemSliding } from 'ionic-angular';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import * as firebase from 'firebase';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-enter-data',
  templateUrl: 'enter-data.html'
})
export class EnterDataPage {
  selectedItem: any;
  data: {name?: string, text?: string} = {};
  items: FirebaseListObservable<any[]>;
  uid: string;
  submitted = false;

  constructor(public storage: Storage, public navCtrl: NavController,
    public navParams: NavParams, public af: AngularFire, menuCtrl: MenuController,
    public userData: UserData) {
      console.log('EnterDataPage');
      this.storage.get('EMAIL').then((value) => {
      });
      this.storage.get('PASSWORD').then((value) => {
      });
      this.selectedItem = navParams.get('item');
  }

  ngAfterViewInit() {
    this.getUid();
  }

  getUid() {
    this.userData.getUid().then((uid) => {
      this.uid = uid;
      this.items = this.af.database.list('/items');
    });
  }

  addToCart(item: any){
    this.userData.addToCart(this.uid, item);
  }

  addCustomKey(key:any, value:any) {
      const users = this.af.database.object('/carts' + '/' + this.uid);
      users.update({ [key]: value });
  }

}
