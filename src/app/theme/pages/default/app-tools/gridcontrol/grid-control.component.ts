import { Component, OnInit, ViewEncapsulation,Input, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
    selector: 'grid-control',
    templateUrl: './grid-control.component.html'
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
		/* this.itemsGridDropped.push({
			name: 'Title',
			iconClass: 'm-menu__link-icon flaticon-type',
			content: 'titlecontrol',
			itemclass: 'item-title'
		});
		this.itemsGridDropped.push({
			name: 'Text Editor',
			iconClass: 'm-menu__link-icon flaticon-signs',
			content: 'tditorcontrol',
			itemclass: 'item-textEditor'
		});
		event.showelEmentStyle=(event.content=='inputcontrol')?true:false;
		if(event.renderid==undefined){
			
			event.showBasicControl=true;
		}
		this.detectdrag=1; */
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