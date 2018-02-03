import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
@Component({
    selector: 'grid-control',
    templateUrl: './grid-control.component.html',
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
export class GridControlComponent {
    //initialize variable
    @Input() arrayType: String;
    @Input() itemRenderId: number;
    @Input() showElementDelete: boolean;
    @Input() showelEmentStyle: boolean;
    @Input() showCustomDiv: boolean;
    arrLength: number = 0;
    selected: any;
    closeResult: String;
    dropOverActive = false
    @ViewChild('content') private content;
    public createGridProperty: Array<Object> = [
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
    constructor(private modalService: NgbModal, public indexcomponent: IndexComponent, private dragula: DragulaService) {
    }
    ngOnInit() {
        debugger;
        setTimeout(() => {
            this.arrLength = this.indexcomponent.createNewGrid.length;
            this.getGridCol(0, this.arrLength, '');
            this.open(this.content);
            let findCreateArray: Array<any> = this.indexcomponent.itemsGridDropped;
            this.dragula.dropModel.subscribe((value) => {
                let checkAarryVal = false;
                this.indexcomponent.createNewGrid.forEach(function(rowItem, $mindex) {
                    rowItem.forEach(function(chritem, $chindex) {
                        checkAarryVal = false
                        findCreateArray[$mindex][$chindex].forEach(function(chitem, $gindex) {
                            if (!checkAarryVal) {
                                if (findCreateArray[$mindex][$chindex].length == 1) {
                                    if (!checkAarryVal) {
                                        chritem.showDemoGridText = true;
                                        checkAarryVal = true;
                                    }
                                }
                                else if (findCreateArray[$mindex][$chindex].length > 1) {
                                    if (!checkAarryVal) {
                                        chritem.showDemoGridText = false;
                                        checkAarryVal = true;
                                    }
                                }
                            }
                        });
                    });
                });
                checkAarryVal = false;
            });
        });
    }
    ngAfterViewInit() {
        setTimeout(() => {
            debugger;
            this.indexcomponent.globalShowParticularElement(this.itemRenderId, this.arrayType);
        });
    }
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    public getDismissReason(reason: any): string {
        return (reason === ModalDismissReasons.ESC) ? 'by pressing ESC' : (reason === ModalDismissReasons.BACKDROP_CLICK) ? 'by clicking on a backdrop' : `with: ${reason}`;
    }
    //remove item from array
    public removeItem(myitemRenderId, myArrayType) {
        if (myitemRenderId != '' && myArrayType != '')
            this.indexcomponent.globalRemoveItem(myitemRenderId, myArrayType);
    }
    //hide remove dialog item
    public removeDailog() {
        this.showelEmentStyle = false;
        this.showElementDelete = (!this.showElementDelete) ? true : false;
        event.stopPropagation();
    }
    //hide remove item
    public hideRemoveItem() {
        this.showElementDelete = false;
        event.stopPropagation();
    }
    //show toogle element
    public toggleEmentStyle() {
        this.showElementDelete = false;
        this.showelEmentStyle = (!this.showelEmentStyle) ? true : false;
        event.stopPropagation();
    }
    //show custom edit div
    public showCustomEditDiv(getRenderId, getArrayType) {
        if (getRenderId != '' && getArrayType != '') {
            this.showElementDelete = false;
            this.indexcomponent.globalshowCustomEditDiv(getRenderId, getArrayType);
        }
    }
    public addItemToGrid(griditem, $gridArryLength, $gridindex, getRenderId, getArrayType) {
        debugger;
        if (this.indexcomponent.isRenderEleId > 0) {
            let res = this.indexcomponent.deleteMainItem(this.indexcomponent.isRenderEleId);
            if (res)
                this.indexcomponent.isRenderEleId = 0;
        }
        if (this.indexcomponent.itemsGridDropped[$gridArryLength][$gridindex].length == 1) {
            this.indexcomponent.createNewGrid[$gridArryLength].forEach(function(item, $index) {
                if ($index == $gridindex)
                    item.showDemoGridText = false;
            });
        }
        if (griditem != undefined) {
            griditem = this.indexcomponent.getMyRenderValue(griditem);
            if (griditem != undefined && griditem != "") {
                griditem.showBasicControl = (griditem.content != 'dividercontrol' && griditem.content != 'gridcontrol' && griditem.content != 'sectioncontrol' && griditem.content != 'spacercontrol' && griditem.content != 'fileattachmentcontrol' && griditem.content != 'embedvidcontrol') ? true : false;
                griditem.arrayType = "Grid";
                griditem.divClass = (griditem.content == 'sectioncontrol' || griditem.content == 'gridcontrol') ? "element-box-contents-for-stracture" : (griditem.content == 'dividercontrol') ? "element-box-contents-for-divider" : (griditem.content == 'spacercontrol') ? "element-box-contents-for-spacer" : "element-box-contents";
                griditem.showElementDelete = griditem.showelEmentStyle = false;
                griditem.showCustomDiv = true;
                griditem.gridArryLength = $gridArryLength;
                griditem.gridindex = $gridindex;
                griditem.itemRenderId = this.indexcomponent.autoRenderGrid.length + 1;
                this.indexcomponent.autoRenderGrid.push(griditem.itemRenderId);
                this.indexcomponent.itemsGridDropped[$gridArryLength][$gridindex].push(griditem);
                this.dropOverActive = false
                //this.indexcomponent.isRenderEle
            }
        }
        //this.indexcomponent.isRenderEle = true;

    }
    public getGridCol(colEvent, arrGridLength, gridValue) {
        this.arrLength = arrGridLength;
        this.indexcomponent.createNewGrid[arrGridLength] = [];
        switch (colEvent) {
            case 1:
                this.indexcomponent.createNewGrid[arrGridLength].push({ 'classname': 'col-6', 'showDemoGridText': true, 'arrGridLength': arrGridLength }, { 'classname': 'col-6', 'showDemoGridText': true, 'arrGridLength': arrGridLength });
                break;
            case 2:
                this.indexcomponent.createNewGrid[arrGridLength].push({ 'classname': 'col-4', 'showDemoGridText': true, 'arrGridLength': arrGridLength }, { 'classname': 'col-8', 'showDemoGridText': true, 'arrGridLength': arrGridLength });
                break;
            case 3:
                this.indexcomponent.createNewGrid[arrGridLength].push({ 'classname': 'col-8', 'showDemoGridText': true, 'arrGridLength': arrGridLength }, { 'classname': 'col-4', 'showDemoGridText': true, 'arrGridLength': arrGridLength });
                break;
            case 4:
                this.indexcomponent.createNewGrid[arrGridLength].push({ 'classname': 'col-4', 'showDemoGridText': true, 'arrGridLength': arrGridLength }, { 'classname': 'col-4', 'showDemoGridText': true, 'arrGridLength': arrGridLength }, { 'classname': 'col-4', 'showDemoGridText': true, 'arrGridLength': arrGridLength });
                break;
            default:
                this.indexcomponent.createNewGrid[arrGridLength].push({ 'classname': 'col-12', 'showDemoGridText': true, 'arrGridLength': arrGridLength });
        }
        this.selected = gridValue;
        this.createDynamicArray(colEvent, arrGridLength);
    }
    public isSelectedGridProperty(item) {
        return this.selected === item;
    }
    public createDynamicArray(count, arrGridLength) {
        this.indexcomponent.itemsGridDropped[arrGridLength] = [];
        for (let i = 0; i <= count; i++) {
            let createGridIndexArray = i;
            this.indexcomponent.itemsGridDropped[arrGridLength][createGridIndexArray] = [];
            this.indexcomponent.itemsGridDropped[arrGridLength][createGridIndexArray].push({
                initEmptyArry: ''
            });
        }
    }
    //release drop position
    public releaseDrop(event: MouseEvent) {
        console.log('Release to drag item:');
    }

}