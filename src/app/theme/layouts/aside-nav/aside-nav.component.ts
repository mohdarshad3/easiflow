import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
	//template: `
   // navigation works!
   // <div *ngFor="let item of itemsToDrop" [dragDirective]='item' [dragHightlight]="'highlight'" (releaseDrop)="releaseDrop($event)" class="dragItem" [ngClass]="{'dragItem-round':item.type===0,'dragItem-square':item.type===1}" (startDrag)="startDrag(item)">
  //  </div>
  //`,
  styleUrls: ['./navigation-type-check.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
	dropItemType:any;
	private itemsToDrop:Array<Object> = [
		{
			name: 'Title',
			iconClass:'m-menu__link-icon flaticon-type',
			content: 'description 1',
			itemclass: 'item-title'
		},
		{
			name: 'Label',
			iconClass:'m-menu__link-icon fa fa-tag',
			content: 'description 2',
			itemclass: 'item-label'
		},
		{
			name: 'Input',
			iconClass:'m-menu__link-icon flaticon-login',
			content: 'description 2'
		},
		{
			name: 'Checkbox',
			iconClass:'m-menu__link-icon flaticon-check-box-with-check-sign',
			content: 'description 2'
		},
		{
			name: 'Datetime Compare',
			iconClass:'m-menu__link-icon fa fa-compress',
			content: 'description 2'
		},
		{
			name: 'Datetime Picker',
			iconClass:'m-menu__link-icon flaticon-calendar-with-a-clock-time-tools',
			content: 'description 2'
		},
		{
			name: 'Button',
			iconClass:'m-menu__link-icon flaticon-round-toggle',
			content: 'description 2'
		},
		{
			name: 'Drop Down',
			iconClass:'m-menu__link-icon flaticon-drop',
			content: 'description 2'
		},
		{
			name: 'Text Editor',
			iconClass:'m-menu__link-icon flaticon-signs',
			content: 'description 2'
		},
		{
			name: 'Modal Popup',
			iconClass:'m-menu__link-icon flaticon-form',
			content: 'description 2'
		},
		{
			name: 'Radio Button',
			iconClass:'m-menu__link-icon fa fa-dot-circle-o',
			content: 'description 2'
		},
		{
			name: 'Image Control',
			iconClass:'m-menu__link-icon fa fa-picture-o',
			content: 'description 2'
		},
		{
			name: 'Form',
			iconClass:'m-menu__link-icon fa fa-wpforms',
			content: 'description 2'
		},
		{
			name: 'Paragraph',
			iconClass:'m-menu__link-icon flaticon-paragraph',
			content: 'description 2'
		},
		{
			name: 'Anchor link',
			iconClass:'m-menu__link-icon flaticon-link',
			content: 'description 2'
		},
		{
			name: 'Tabs',
			iconClass:'m-menu__link-icon flaticon-new-tab',
			content: 'description 2'
		},
		
	]
    constructor() {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        mLayout.initAside();
    }
	private startDrag(item){
		console.log('Begining to drag item: '+item);
	}
	private releaseDrop(event){
  	let index = this.itemsToDrop.indexOf(event);
  	/* if (index >= 0){
  		setTimeout(() => {(this.checkType(event,index),100)});
  	} */
  }
}