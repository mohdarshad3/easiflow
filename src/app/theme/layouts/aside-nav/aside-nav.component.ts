import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';


declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

    dropItemType: any;
    private itemsToDrop: Array<Object> = [
        {
            name: 'Title',
            iconClass: 'm-menu__link-icon flaticon-type',
            content: 'titlecontrol',
            itemclass: 'item-title'
        },
        {
            name: 'Label',
            iconClass: 'm-menu__link-icon fa fa-tag',
            content: 'labelcontrol',
            itemclass: 'item-label'
        },
        {
            name: 'Input',
            iconClass: 'm-menu__link-icon flaticon-login',
            content: 'inputcontrol',
            itemclass: 'item-input'
        },
        {
            name: 'Checkbox',
            iconClass: 'm-menu__link-icon flaticon-check-box-with-check-sign',
            content: 'checkboxcontrol',
            itemclass: 'item-checkbox'
        },
        {
            name: 'Datetime Compare',
            iconClass: 'm-menu__link-icon fa fa-compress',
            content: 'dtccontrol',
            itemclass: 'item-datetimeCompare'
        },
        {
            name: 'Datetime Picker',
            iconClass: 'm-menu__link-icon flaticon-calendar-with-a-clock-time-tools',
            content: 'dtpcontrol',
            itemclass: 'item-datetimePicker'
        },
        {
            name: 'Button',
            iconClass: 'm-menu__link-icon flaticon-round-toggle',
            content: 'buttoncontrol',
            itemclass: 'item-button'
        },
        {
            name: 'Drop Down',
            iconClass: 'm-menu__link-icon flaticon-drop',
            content: 'dropdowncontrol',
            itemclass: 'item-dropDown'
        },
        {
            name: 'Text Editor',
            iconClass: 'm-menu__link-icon flaticon-signs',
            content: 'tditorcontrol',
            itemclass: 'item-textEditor'
        },
        {
            name: 'Modal Popup',
            iconClass: 'm-menu__link-icon flaticon-form',
            content: 'modalcontrol',
            itemclass: 'item-modalPopup'
        },
        {
            name: 'Radio Button',
            iconClass: 'm-menu__link-icon fa fa-dot-circle-o',
            content: 'radiocontrol',
            itemclass: 'item-radioButton'
        },
        {
            name: 'Image Control',
            iconClass: 'm-menu__link-icon fa fa-picture-o',
            content: 'imageuploader',
            itemclass: 'item-imageControl'
        },
        {
            name: 'Form',
            iconClass: 'm-menu__link-icon fa fa-wpforms',
            content: 'formcontrol',
            itemclass: 'item-form'
        },
        {
            name: 'Paragraph',
            iconClass: 'm-menu__link-icon flaticon-paragraph',
            content: 'paragraphcontrol',
            itemclass: 'item-paragraph'
        },
        {
            name: 'Anchor link',
            iconClass: 'm-menu__link-icon flaticon-link',
            content: 'anchorcontrol',
            itemclass: 'item-anchorLink'
        },
        {
            name: 'Tabs',
            iconClass: 'm-menu__link-icon flaticon-new-tab',
            content: 'tabscontrol',
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
    private startDrag(item) {
        console.log('Begining to drag item: ' + item);
    }
    private releaseDrop(event) {
        let index = this.itemsToDrop.indexOf(event);
  	/* if (index >= 0){
  		setTimeout(() => {(this.checkType(event,index),100)});
  	} */
    }
}