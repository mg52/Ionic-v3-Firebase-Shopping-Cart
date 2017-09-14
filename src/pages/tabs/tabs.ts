import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { EnterDataPage } from '../enter-data/enter-data';
import { ShowDataPage } from '../show-data/show-data';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = EnterDataPage;
  tab2Root: any = ShowDataPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
