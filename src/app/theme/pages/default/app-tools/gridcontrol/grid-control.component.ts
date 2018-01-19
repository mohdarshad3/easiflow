import { Component, OnInit, ViewEncapsulation,Input, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
    selector: 'grid-control',
    templateUrl: './grid-control.component.html',
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
export class GridControlComponent {
	@Input() 
	detectdrag=0;
	itemsGridDropped: Array<any> = [];
	autoRenderGrid: Array<any> = [];
	constructor() {
    }
    ngOnInit() {
		
    }
    ngAfterViewInit() {
		this.itemsGridDropped.push({
			renderid:(this.itemsGridDropped.length+1),
			name: 'Title',
			iconClass: 'm-menu__link-icon flaticon-type',
			content: 'titlecontrol',
			itemclass: 'item-title',
			showBasicControl:true,
			showCustomDiv:true
		});
		this.itemsGridDropped.push({
			renderid:(this.itemsGridDropped.length+1),
			name: 'Text Editor',
			iconClass: 'm-menu__link-icon flaticon-signs',
			content: 'tditorcontrol',
			itemclass: 'item-textEditor',
			showBasicControl:true,
			showCustomDiv:true
		});
    }
	private addItemToGrid(event) {
		event.showelEmentStyle=(event.content=='inputcontrol')?true:false;
		if(event.renderid==undefined){
			this.itemsGridDropped.forEach(function(item) {
				item.showCustomDiv=false;
			});
			event.showBasicControl=(event.content!='dividercontrol' && event.content!='gridcontrol')?true:false;
			event.showCustomDiv=true;
			event.renderid=(this.itemsGridDropped.length+1);
			this.itemsGridDropped.push(event);
		}
		this.detectdrag=1;
    }
	private removeDailog(item){
		item.showelEmentStyle=false;
		item.showelEmentDelete=(!item.showelEmentDelete)?true:false;
	}
	private removeItem(item){
		item.showelEmentDelete=(!item.showelEmentDelete)?true:false;
		let getrenid=item.renderid;
		let a = this.itemsGridDropped.find(item => item.renderid === getrenid);
		if(a.renderid==getrenid){
			this.itemsGridDropped.splice(this.itemsGridDropped.indexOf(a), 1);
			//this.showSelected=(this.itemsGridDropped.length)>0?false:true;
		}
	}
	private hideRemoveItem(item){
		item.showelEmentDelete=false;
	}
	private hideCustomEditDiv(item) {
		this.itemsGridDropped.forEach(function(item) {
			item.showCustomDiv=false;
		});
		event.stopPropagation();
	}
	 private showCustomEditDiv(item,event){
		this.itemsGridDropped.forEach(function(item) {
			item.showCustomDiv=false;
		});
		item.showCustomDiv=true;
		event.stopPropagation();
	}
	
	private toggleEmentStyle(item) {
		item.showelEmentDelete=false;
		if(item.content=='inputcontrol')
			item.showelEmentStyle=(!item.showelEmentStyle)?true:false;
		else
			item.showelEmentStyle=false;
	}

}