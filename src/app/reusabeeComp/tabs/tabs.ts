import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs {

  @Input() tabList: string[] = [];

  @Output() onTabChange = new EventEmitter<string>();

  @Input() selectedTabName: string = '';

  onSelectTab(tabName: string) {
    debugger;
    this.selectedTabName = tabName;
    this.onTabChange.emit(this.selectedTabName);
  }
}
