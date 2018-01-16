import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';


declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

	dropItemType:any;
	private itemsToDrop:Array<Object> = [
		{
			name: 'Title',
			iconClass:'m-menu__link-icon flaticon-type',
			content: 'titlecontrol',
			itemclass: 'item-title'
		},
		{
			name: 'Label',
			iconClass:'m-menu__link-icon fa fa-tag',
			content: 'labelcontrol',
			itemclass: 'item-label'
		},
		{
			name: 'Input',
			iconClass:'m-menu__link-icon flaticon-login',
			content: 'inputcontrol',
			itemclass: 'item-input'
		},
		{
			name: 'Checkbox',
			iconClass:'m-menu__link-icon flaticon-check-box-with-check-sign',
			content: 'checkboxcontrol',
			itemclass: 'item-checkbox'
		},
		{
			name: 'Datetime Compare',
			iconClass:'m-menu__link-icon fa fa-compress',
			content: '<input type="text" class="form-control" placeholder="Click here to compare datetime" />',
			itemclass: 'item-datetimeCompare'
		},
		{
			name: 'Datetime Picker',
			iconClass:'m-menu__link-icon flaticon-calendar-with-a-clock-time-tools',
			content: '<input type="text" class="form-control" placeholder="Click here to Pick datetime" />',
			itemclass: 'item-datetimePicker'
		},
		{
			name: 'Button',
			iconClass:'m-menu__link-icon flaticon-round-toggle',
			content: '<button class="btn default-btn">Click here to edit button</button>',
			itemclass: 'item-button'
		},
		{
			name: 'Drop Down',
			iconClass:'m-menu__link-icon flaticon-drop',
			content: '<select><option></option></select>',
			itemclass: 'item-dropDown'
		},
		{
			name: 'Text Editor',
			iconClass:'m-menu__link-icon flaticon-signs',
			content: '<input type="text" class="form-control" placeholder="Click here to edit text" />',
			itemclass: 'item-textEditor'
		},
		{
			name: 'Modal Popup',
			iconClass:'m-menu__link-icon flaticon-form',
			content: '<div class="modal">Click here to edit Modal</div>',
			itemclass: 'item-modalPopup'
		},
		{
			name: 'Radio Button',
			iconClass:'m-menu__link-icon fa fa-dot-circle-o',
			content: '<input type="radio" class="form-control default-radio" />',
			itemclass: 'item-radioButton'
		},
		{
			name: 'Image Control',
			iconClass:'m-menu__link-icon fa fa-picture-o',
			content: 'imageuploader',
			itemclass: 'item-imageControl'
		},
		{
			name: 'Form',
			iconClass:'m-menu__link-icon fa fa-wpforms',
			content: '<form></form>',
			itemclass: 'item-form'
		},
		{
			name: 'Paragraph',
			iconClass:'m-menu__link-icon flaticon-paragraph',
			content: '<p>Click here to edit paragraph</p>',
			itemclass: 'item-paragraph'
		},
		{
			name: 'Anchor link',
			iconClass:'m-menu__link-icon flaticon-link',
			content: '<a href="javascript:">Click here to edit anchor link</a>',
			itemclass: 'item-anchorLink'
		},
		{
			name: 'Tabs',
			iconClass:'m-menu__link-icon flaticon-new-tab',
			content: '',
			itemclass: 'item-anchorLink'
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