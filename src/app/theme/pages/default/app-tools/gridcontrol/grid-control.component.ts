import { Component, OnInit, ViewEncapsulation,Input, Output,ViewChild ,ChangeDetectorRef} from '@angular/core';
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
	selected :any;
	closeResult:String;
	@ViewChild('content') private content;
	private createGridProperty: Array<Object> = [
		{
			imageName: 'grid12.png',
			Content: '1 Column (12:0)',
		},
		{
			imageName: 'grid66.png',
			Content: '2 Column (6:6)',
		},
		{
			imageName: 'grid48.png',
			Content: '2 Column (4:8)',
		},
		{
			imageName: 'grid84.png',
			Content: '2 Column (8:4)',
		},
		{
			imageName: 'grid444.png',
			Content: '3 Column (4:4:4)',
		}
	];
	constructor(private modalService: NgbModal,public indexcomponent: IndexComponent) { }
    ngOnInit() {
		setTimeout(() => {
			this.arrLength=this.indexcomponent.createNewGrid.length;
			this.getGridCol(0,this.arrLength,'');
			this.open(this.content);
        });
    }
    ngAfterViewInit() {
		 setTimeout(() => {
			this.indexcomponent.globalShowParticularElement(this.itemRenderId,this.arrayType);
		 });
    }
	open(content) {
	  this.modalService.open(content).result.then((result) => {
		this.closeResult = `Closed with: ${result}`;
	  }, (reason) => {
		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	  });
	}
	private getDismissReason(reason: any): string {
		return (reason === ModalDismissReasons.ESC)? 'by pressing ESC' : (reason === ModalDismissReasons.BACKDROP_CLICK) ? 'by clicking on a backdrop':`with: ${reason}`;
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
		if(getRenderId!='' && getArrayType!='')
			this.indexcomponent.globalshowCustomEditDiv(getRenderId,getArrayType);
	}
	private addItemToGrid(griditem,$gridArryLength,$gridindex) {
		if(this.indexcomponent.itemsGridDropped[$gridArryLength][$gridindex].length==0){
			this.indexcomponent.createNewGrid[$gridArryLength].forEach(function(item,$index) {
				if($index==$gridindex)
					item.showDemoGridText=false;
			}); 
		} 
		if(griditem.renderid==undefined){
			griditem.showBasicControl=(griditem.content != 'dividercontrol' && griditem.content != 'gridcontrol' && griditem.content != 'sectioncontrol' && griditem.content != 'spacercontrol' && griditem.content != 'fileattachmentcontrol'  && griditem.content != 'embedvidcontrol')?true:false;
			griditem.arrayType="Grid";
			griditem.divClass=(griditem.content=='sectioncontrol' || griditem.content=='gridcontrol')? "element-box-contents-for-stracture" :(griditem.content=='dividercontrol')?"element-box-contents-for-divider":(griditem.content=='spacercontrol')?"element-box-contents-for-spacer":"element-box-contents";
			griditem.showElementDelete=griditem.showelEmentStyle=false;
			griditem.showCustomDiv=true;
			griditem.gridArryLength=$gridArryLength;
			griditem.gridindex=$gridindex;
			griditem.itemRenderId=this.indexcomponent.autoRenderGrid.length+1;
			
			this.indexcomponent.autoRenderGrid.push(griditem.itemRenderId);
			this.indexcomponent.itemsGridDropped[$gridArryLength][$gridindex].push(griditem);
		}
		this.indexcomponent.isRenderEle=true;
    }
	private getGridCol(colEvent,arrGridLength,gridValue) {
		this.arrLength=arrGridLength;
		this.indexcomponent.createNewGrid[arrGridLength]=[];
		switch (colEvent) {
			case 1:
				this.indexcomponent.createNewGrid[arrGridLength].push({'classname':'col-6','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-6','showDemoGridText':true,'arrGridLength':arrGridLength});
				break;
			case 2:
				this.indexcomponent.createNewGrid[arrGridLength].push({'classname':'col-4','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-8','showDemoGridText':true,'arrGridLength':arrGridLength});
				break;
			case 3:
				this.indexcomponent.createNewGrid[arrGridLength].push({'classname':'col-8','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-4','showDemoGridText':true,'arrGridLength':arrGridLength});
				break;
			case 4:
				this.indexcomponent.createNewGrid[arrGridLength].push({'classname':'col-4','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-4','showDemoGridText':true,'arrGridLength':arrGridLength},{'classname':'col-4','showDemoGridText':true,'arrGridLength':arrGridLength});
				break;
			default:
				this.indexcomponent.createNewGrid[arrGridLength].push({'classname':'col-12','showDemoGridText':true,'arrGridLength':arrGridLength});
		}
		this.selected = gridValue; 
		this.createDynamicArray(colEvent,arrGridLength);
	}
	private isSelectedGridProperty(item){
		return this.selected === item;
	}
	public createDynamicArray(count,arrGridLength){
		this.indexcomponent.itemsGridDropped[arrGridLength]=[];
		for(let i=0;i<=count;i++){
			let createGridIndexArray=i;
			this.indexcomponent.itemsGridDropped[arrGridLength][createGridIndexArray]=[];
		}
	}

}