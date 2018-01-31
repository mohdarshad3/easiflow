import { Component, OnInit, ViewEncapsulation,Input,Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';
@Component({
    selector: 'input-control',
    templateUrl: './input-control.component.html',
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
export class InputControlComponent {
	//initialize variable
	@Input() arrayType:String;
	@Input() itemRenderId: number;
	@Input() showElementDelete:boolean;
	@Input() showelEmentStyle:boolean;
	@Input() showCustomDiv:boolean;
	inputValue:String = '';
	constructor (public indexcomponent: IndexComponent) {
	}
    ngOnInit($event) {
		this.inputValue = '';
    }
    ngAfterViewInit() {
		setTimeout(() => {
			this.indexcomponent.globalShowParticularElement(this.itemRenderId,this.arrayType);
			this.showelEmentStyle=true;
		});
    }
	//remove item from array
	private removeItem(myitemRenderId,myArrayType){
		if(myitemRenderId!='' && myArrayType!='')
			this.indexcomponent.globalRemoveItem(myitemRenderId,myArrayType);
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
	//show toogle element
	private toggleEmentStyle() {
		this.showElementDelete=false;
		this.showelEmentStyle=(!this.showelEmentStyle)?true:false;
		event.stopPropagation();
	}
	//show custom edit div
	private showCustomEditDiv(getRenderId,getArrayType){
		if(getRenderId!='' && getArrayType!=''){
			this.indexcomponent.globalshowCustomEditDiv(getRenderId,getArrayType);
			this.showelEmentStyle=true;
		}
	}
	private onKey(event) {
		this.inputValue = event.target.value;
		event.stopPropagation();
	}
	private stillPop() {
		this.showelEmentStyle = true;
		event.stopPropagation();
	} 

}