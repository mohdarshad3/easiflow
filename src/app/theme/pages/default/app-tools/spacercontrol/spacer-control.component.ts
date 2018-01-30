import { Component, OnInit, ViewEncapsulation,Input,Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';

@Component({
    selector: 'spacer-control',
    templateUrl: './spacer-control.component.html',
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
export class SpacerControlComponent {
   //initialize variable
   	@Input() arrayType:String;
	@Input() itemRenderId: number;
	@Input() showElementDelete:boolean;
	@Input() showelEmentStyle:boolean;
	@Input() showCustomDiv:boolean;
	constructor (public indexcomponenet: IndexComponent) {
	}
    ngOnInit($event) {
		
    }
    ngAfterViewInit() {
		setTimeout(() => {
			this.indexcomponenet.globalShowParticularElement(this.itemRenderId,this.arrayType);
		});
    }
	//remove item from array
	private removeItem(myitemRenderId,myArrayType){
		if(myitemRenderId!='' && myArrayType!='')
			this.indexcomponenet.globalRemoveItem(myitemRenderId,myArrayType);
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
	private showCustomEditDiv(getRenderId,getArrayType){
		if(getRenderId!='' && getArrayType!='')
			this.indexcomponenet.globalshowCustomEditDiv(getRenderId,getArrayType);
	}
	//toggle function view property
	private toggleEmentStyle(){
		event.stopPropagation();
	}
}