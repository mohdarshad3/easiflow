import { Component, OnInit, ViewEncapsulation, AfterViewInit,ViewChild } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { trigger, style, animate, transition } from '@angular/animations';
//import { GridControlComponent } from '../app-tools/gridcontrol/grid-control.component';

@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
	animations: [
		trigger(
		  'enterAnimation', [
			transition(':enter', [
			  style({opacity: 0}),
			  animate('250ms', style({opacity: 1}))
			]),
			transition(':leave', [
			  style({opacity: 1}),
			  animate('250ms', style({opacity: 0}))
			])
		  ]
		)
	 ],
})
export class IndexComponent implements OnInit, AfterViewInit {
	//initialize variable
	//@ViewChild(GridControlComponent) child;
	showSelected : boolean;
	showdataproperty:boolean;
	removeItemClass : boolean;
	showelEmentStyle:false;
	itemsGridDropped:Array<any> = [];
	createNewGrid:Array<any> = [];
	itemsDropped: Array<any> = [];
    constructor(private _script: ScriptLoaderService) {
		
    }
    ngOnInit() {
		this.showSelected=(this.itemsDropped.length)>0?false:true;
		this.removeItemClass=true;
		this.showdataproperty = false;
    }
    ngAfterViewInit() {
        this._script.loadScripts('app-index',
            ['assets/app/js/dashboard.js']);
    }
	//push drag element in to array
    private addDropItem(event) {
		if(event.itemRenderId==undefined){
			event.showBasicControl=(event.content != 'dividercontrol' && event.content != 'gridcontrol' && event.content != 'sectioncontrol' && event.content != 'spacercontrol' && event.content != 'fileattachmentcontrol'  && event.content != 'embedvidcontrol')?true:false;
			event.arrayType="Main Grid";
			event.itemRenderId=(this.itemsDropped.length+1);
			event.divClass="element-box-contents";
			event.Array
			event.showElementDelete=event.showelEmentStyle=false;
			event.showCustomDiv=true;
			this.itemsDropped.push(event);
			if(this.itemsDropped.length>0)
				this.showSelected=false;
		}
		else{
			event.showCustomDiv=true;
			let style='';
			let getrenid=event.itemRenderId;
			let a = this.itemsDropped.find(event => event.itemRenderId === getrenid);
			if(a.itemRenderId==getrenid){
			}
		}	
    }
	//hide custome edit div
	private hideCustomEditDiv(item) {
		this.itemsDropped.forEach(function(item) {
			item.divClass="";
			item.showCustomDiv=false;
		});
		if(this.itemsGridDropped.length>0)
		{
			this.indexcomponenet.itemsGridDropped.forEach(function(item,$index) {
				item.forEach(function(item,$index) {
					item.forEach(function(item,$index) {
						item.divClass="";
						item.showCustomDiv=false;
					});
				});
			});
		}
	}
	//start drag element
	private startDrag(item) {
        console.log('Begining to drag item: ' + item);
    }
	//release drop position
    private releaseDrop(event: MouseEvent) {
		console.log('Release to drag item:');
    }
}