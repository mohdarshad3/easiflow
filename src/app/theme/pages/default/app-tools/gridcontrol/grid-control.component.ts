import { Component, OnInit, ViewEncapsulation,Input, Output,ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { trigger, style, animate, transition } from '@angular/animations';
import {IndexComponent} from '../../index/index.component';
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
	//initialize variable
	@Input() arrayType:String;
	@Input() itemRenderId: number;
	@Input() showElementDelete:boolean;
	@Input() showelEmentStyle:boolean;
	@Input() showCustomDiv:boolean;
	arrLength:number=0;
	closeResult:String;
	autoRenderGrid: Array<any> = [];
	@ViewChild('content') private content;
	constructor(private modalService: NgbModal,public indexcomponenet: IndexComponent) { }
    ngOnInit() {
    }
    ngAfterViewInit() {
		this.arrLength=this.indexcomponenet.createNewGrid.length;
		this.indexcomponenet.createNewGrid[this.arrLength]=[];
		//this.getGridCol(0,this.arrLength);
		if(this.arrayType=="Grid"){
			let initRenderId=this.itemRenderId;
			this.indexcomponenet.itemsGridDropped.forEach(function(item,$index) {
				item.forEach(function(item,$index) {
					item.forEach(function(item,$index) {
						item.divClass="";
						item.showCustomDiv=false;
						if(item.itemRenderId=initRenderId){
							item.divClass="element-box-contents";
							item.showCustomDiv=true;
						}
							
					});
				});
			});
		}
    }
	ngOnChanges(changes: any) {
		debugger;
		if(this.arrayType=="Main Grid")
			this.open(this.content);
	}
	open(content) {
	  this.modalService.open(content).result.then((result) => {
		this.closeResult = `Closed with: ${result}`;
	  }, (reason) => {
		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	  });
	  event.stopPropagation();
	}
	private getDismissReason(reason: any): string {
		return (reason === ModalDismissReasons.ESC)? 'by pressing ESC' : (reason === ModalDismissReasons.BACKDROP_CLICK) ? 'by clicking on a backdrop':`with: ${reason}`;
	}
	//remove item from array
	private removeItem(myitemRenderId,myArrayType){
		if(myArrayType=="Grid"){
			this.showElementDelete=(!this.showElementDelete)?true:false;
			let getRenderId=myitemRenderId;
			let deleteArrayItem:Array<any> = [];
			this.indexcomponenet.itemsGridDropped.forEach(function(item,$index) {
				item.forEach(function(item,$index) {
					item.forEach(function(item,$i) {
						if(item.itemRenderId=getRenderId)
							deleteArrayItem=item;	
					});
				});
			});
			if(deleteArrayItem.length>0){
				this.indexcomponenet.itemsGridDropped[deleteArrayItem.gridArryLength][deleteArrayItem.gridindex].splice(this.indexcomponenet.itemsGridDropped[deleteArrayItem.gridArryLength][deleteArrayItem.gridindex].indexOf(deleteArrayItem), 1)
				deleteArrayItem='';

			}
		}
		else{
			this.showElementDelete=(!this.showElementDelete)?true:false;
			let getRenderId=myitemRenderId;
			let a = this.indexcomponenet.itemsDropped.find(item => item.itemRenderId === getRenderId);
			if(a.itemRenderId==getRenderId){
				this.indexcomponenet.itemsDropped.splice(this.indexcomponenet.itemsDropped.indexOf(a), 1);
			}
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
	//show toogle element
	private toggleEmentStyle() {
		this.showElementDelete=false;
		this.showelEmentStyle=(!this.showelEmentStyle)?true:false;
		event.stopPropagation();
	}
	//show custom edit div
	private showCustomEditDiv(getRenderId,getArrayType){
		if(getArrayType=="Grid"){
			for(let i=0;i<this.indexcomponenet.itemsGridDropped.length;i++){
				this.indexcomponenet.itemsGridDropped[i].forEach(function(item) {
					item.divClass="";
					item.showCustomDiv=false;
				});
				let a = this.indexcomponenet.itemsGridDropped[0].find(item => item.itemRenderId === getRenderId);
				if(a!=undefined){
					a.divClass="element-box-contents";
					a.showCustomDiv=true;
				}
			}
		}
		else{
			this.indexcomponenet.itemsDropped.forEach(function(item) {
				item.divClass="";
				item.showCustomDiv=false;
			});
			let a = this.indexcomponenet.itemsDropped.find(item => item.itemRenderId === getRenderId);
			a.divClass="element-box-contents";
			a.showCustomDiv=true;
		}
		event.stopPropagation();
	}
	private addItemToGrid(griditem,$gridArryLength,$gridindex) {
		this.indexcomponenet.createNewGrid[$gridArryLength].forEach(function(item) {
			item.showDemoGridText=false;
		});
		if(griditem.renderid==undefined){
			this.indexcomponenet.itemsGridDropped.forEach(function(item) {
				item.showCustomDiv=false;
			});
			griditem.showBasicControl=(griditem.content != 'dividercontrol' && griditem.content != 'gridcontrol' && griditem.content != 'sectioncontrol' && griditem.content != 'spacercontrol' && griditem.content != 'fileattachmentcontrol'  && griditem.content != 'embedvidcontrol')?true:false;
			griditem.arrayType="Grid";
			griditem.showCustomDiv=true;
			griditem.divClass="element-box-contents";
			griditem.showElementDelete=griditem.showelEmentStyle=false;
			griditem.showCustomDiv=true;
			griditem.gridArryLength=$gridArryLength;
			griditem.gridindex=$gridindex;
			griditem.itemRenderId=this.autoRenderGrid.length+1;
			
			this.autoRenderGrid.push(griditem.itemRenderId);
			this.indexcomponenet.itemsGridDropped[$gridArryLength][$gridindex].push(griditem);
		}
		$("div.highlight").removeClass();
		event.stopPropagation(); 
    }
	private getGridCol(colEvent,arrGridLength) {
		this.arrLength=arrGridLength;
		this.indexcomponenet.createNewGrid[arrGridLength]=[];
		switch (colEvent) {
			case 1:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-6', 'demoTitle':'Heading (Grid 6)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-6', 'demoTitle':'Heading (Grid 6)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength});
				break;
			case 2:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-8', 'demoTitle':'Heading (Grid 8)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength});
				break;
			case 3:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength});
				break;
			default:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-12', 'demoTitle':'Heading (Grid 12)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength});
		}
		this.createDynamicArray(colEvent,arrGridLength);
	}
	public createDynamicArray(count,arrGridLength){
		this.indexcomponenet.itemsGridDropped[arrGridLength]=[];
		for(let i=0;i<=count;i++){
			let createGridIndexArray=i;
			this.indexcomponenet.itemsGridDropped[arrGridLength][createGridIndexArray]=[];
		}
	}

}