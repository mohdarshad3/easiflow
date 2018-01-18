import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { trigger, style, animate, transition } from '@angular/animations';
//import {FileUploaderComponent} from '../app-tools/file-uploader/file-uploader.component';


@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    //directives: [FileUploaderComponent],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('250ms', style({ opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('250ms', style({ opacity: 0 }))
                ])
            ]
        )
    ],
})
export class IndexComponent implements OnInit, AfterViewInit {
    showSelected: boolean;
    showdataproperty: boolean;
    removeItemClass: boolean;
    event: MouseEvent;
    clientX = 0;
    clientY = 0;
    private itemsDropped: Array<any> = [];
    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {
        this.showSelected = (this.itemsDropped.length) > 0 ? false : true;
        this.removeItemClass = true;
        this.showdataproperty = false;
    }
    ngAfterViewInit() {
        this._script.loadScripts('app-index',
            ['assets/app/js/dashboard.js']);
    }
    private addDropItem(event, obj) {
        //debugger;
        if (event.renderid == undefined) {
            event.showCustomDiv = true;
            event.renderid = (this.itemsDropped.length + 1);
            this.itemsDropped.push(event);
            if (this.itemsDropped.length > 0)
                this.showSelected = false;
        }
        else {
            event.showCustomDiv = true;
            let style = '';
            let getrenid = event.renderid;
            let a = this.itemsDropped.find(event => event.renderid === getrenid);
            if (a.renderid == getrenid) {
                //let findrenderid=(getrenid-1);
                //style='top:'+ obj.clientY+'px;left:'+obj.clientX+'px;position:fixed';
                //$('div.dragged-item:eq('+findrenderid+')').attr('style',style);
            }
        }
    }
    private removeDailog(item) {

        item.showelEmentDelete = (!item.showelEmentDelete) ? true : false;

    }
    private removeItem(item) {

        item.showelEmentDelete = (!item.showelEmentDelete) ? true : false;

        let getrenid = item.renderid;
        let a = this.itemsDropped.find(item => item.renderid === getrenid);
        if (a.renderid == getrenid) {
            this.itemsDropped.splice(this.itemsDropped.indexOf(a), 1);
            this.showSelected = (this.itemsDropped.length) > 0 ? false : true;
        }
    }

    private hideCustomEditDiv(item) {
        this.itemsDropped.forEach(function(item) {
            item.showCustomDiv = false;
        });
        event.stopPropagation();
    }
    private showCustomEditDiv(item, event) {
        this.itemsDropped.forEach(function(item) {
            item.showCustomDiv = false;
        });
        item.showCustomDiv = true;
        event.stopPropagation();
    }

    private toggleEmentStyle(item) {
        // show btn with id btnId in DOM
        //debugger;
        item.showelEmentStyle = (!item.showelEmentStyle) ? true : false;

    }

    private startDrag(item) {
        console.log('Begining to drag item: ' + item);
    }
    private releaseDrop(event: MouseEvent) {
        //debugger;
        //this.clientX = event.clientX;
        // this.clientY = event.clientY;
        //console.log('x='+this.clientX+'y='+this.clientY);
    }
    onEvent(event: MouseEvent): void {
        this.event = event;
    }
    coordinates(event: MouseEvent): void {
        this.clientX = event.clientX;
        this.clientY = event.clientY;
        //console.log('x='+this.clientX+'y='+this.clientY);
    }
}