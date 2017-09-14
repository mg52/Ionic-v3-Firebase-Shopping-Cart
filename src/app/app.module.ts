import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { Ionic_3_Firebase_Shopping_Cart } from './app.component';

import { ShowDataPage } from '../pages/show-data/show-data';
import { EnterDataPage } from '../pages/enter-data/enter-data';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';

import { UserData } from '../providers/user-data';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const myFirebaseConfig = {
	apiKey: "AIzaSyBYos5OMqRJiGIqIRAEgPubcGA4wW3vvWU",
    authDomain: "dummy1-39927.firebaseapp.com",
    databaseURL: "https://dummy1-39927.firebaseio.com",
    projectId: "dummy1-39927",
    storageBucket: "dummy1-39927.appspot.com",
    messagingSenderId: "568651487554"
};


export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    Ionic_3_Firebase_Shopping_Cart,
    EnterDataPage,
    ShowDataPage,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(Ionic_3_Firebase_Shopping_Cart),
		IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ionic_3_Firebase_Shopping_Cart,
    EnterDataPage,
    ShowDataPage,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage
  ],
  providers: [UserData]
})
export class AppModule { }
