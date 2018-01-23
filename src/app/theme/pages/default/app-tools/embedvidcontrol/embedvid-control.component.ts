import { Component, OnInit, ViewEncapsulation,Input,Output} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';
@Component({
    selector: 'embedvid-control',
    templateUrl: './embedvid-control.component.html',
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
export class EmbedVidControlComponent {
	//initialize variable
	@Input() itemRenderId: number;
	@Input() showElementDelete:boolean;
	@Input() showelEmentStyle:boolean;
	@Input() showCustomDiv:boolean;
	constructor (public indexcomponenet: IndexComponent) {
	}
    ngOnInit($event) {
		
    }
    ngAfterViewInit() {
		this.indexcomponenet.itemsDropped.forEach(function(item) {
			item.divClass="";
			item.showCustomDiv=false;
		});
		let len=this.indexcomponenet.itemsDropped.length-1;
		this.indexcomponenet.itemsDropped[len].divClass="element-box-contents";
		this.indexcomponenet.itemsDropped[len].showCustomDiv=true;
    }
	//remove item from array
	private removeItem(myitemRenderId){
		this.showElementDelete=(!this.showElementDelete)?true:false;
		let getRenderId=myitemRenderId;
		let a = this.indexcomponenet.itemsDropped.find(item => item.itemRenderId === getRenderId);
		if(a.itemRenderId==getRenderId){
			this.indexcomponenet.itemsDropped.splice(this.indexcomponenet.itemsDropped.indexOf(a), 1);
			//this.showSelected=(this.indexcomponenet.itemsDropped.length)>0?false:true;
		}
		event.stopPropagation();
	}
	//hide remove dialog item
	private removeDailog(){
		this.showelEmentStyle=false;
		this.showElementDelete=(!this.showElementDelete)?true:false;
		event.stopPropagation();
	}
	//hide remove item
	private hideRemoveItem(){
		this.showElementDelete=false;
		event.stopPropagation();
	}
	//show custom edit div
	private showCustomEditDiv(getRenderId){
		this.indexcomponenet.itemsDropped.forEach(function(item) {
			item.divClass="";
			item.showCustomDiv=false;
		});
		let a = this.indexcomponenet.itemsDropped.find(item => item.itemRenderId === getRenderId);
		a.divClass="element-box-contents";
		a.showCustomDiv=true;
		event.stopPropagation();
	}
	//toggle function view property
	private toggleEmentStyle(){
		event.stopPropagation();
	}

}