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
	closeResult:String;
	@ViewChild('content') private content;
	constructor(private modalService: NgbModal,public indexcomponenet: IndexComponent) { }
    ngOnInit() {
		setTimeout(() => {
			this.arrLength=this.indexcomponenet.createNewGrid.length;
			this.getGridCol(0,this.arrLength);
			this.open(this.content);
        });
    }
    ngAfterViewInit() {
		 setTimeout(() => {
			this.indexcomponenet.globalShowParticularElement(this.itemRenderId,this.arrayType);
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
	//show toogle element
	private toggleEmentStyle() {
		this.showElementDelete=false;
		this.showelEmentStyle=(!this.showelEmentStyle)?true:false;
		event.stopPropagation();
	}
	//show custom edit div
	private showCustomEditDiv(getRenderId,getArrayType){
		if(getRenderId!='' && getArrayType!='')
			this.indexcomponenet.globalshowCustomEditDiv(getRenderId,getArrayType);
	}
	private addItemToGrid(griditem,$gridArryLength,$gridindex) {
		if(this.indexcomponenet.itemsGridDropped[$gridArryLength][$gridindex].length==0){
			this.indexcomponenet.createNewGrid[$gridArryLength].forEach(function(item,$index) {
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
			griditem.itemRenderId=this.indexcomponenet.autoRenderGrid.length+1;
			
			this.indexcomponenet.autoRenderGrid.push(griditem.itemRenderId);
			this.indexcomponenet.itemsGridDropped[$gridArryLength][$gridindex].push(griditem);
		}
		this.indexcomponenet.isRenderEle=true;
    }
	private getGridCol(colEvent,arrGridLength) {
		this.arrLength=arrGridLength;
		this.indexcomponenet.createNewGrid[arrGridLength]=[];
		switch (colEvent) {
			case 1:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-6 text-left', 'demoTitle':'Heading (Grid 6)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':0},{'classname':'col-6 text-left', 'demoTitle':'Heading (Grid 6)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':1});
				break;
			case 2:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':0},{'classname':'col-8', 'demoTitle':'Heading (Grid 8)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':1});
				break;
			case 3:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-8', 'demoTitle':'Heading (Grid 8)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':0},{'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':1});
				break;
			case 4:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':0},{'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':1},{'classname':'col-4', 'demoTitle':'Heading (Grid 4)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':2});
				break;
			default:
				this.indexcomponenet.createNewGrid[arrGridLength].push({'classname':'col-12 text-left', 'demoTitle':'Heading (Grid 12)', 'demoPara': 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.','showDemoGridText':true,'arrGridLength':arrGridLength,'itemIndex':0});
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