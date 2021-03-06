import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';
@Component({
    selector: 'modal-control',
    templateUrl: './modal-control.component.html',
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
export class ModalControlComponent {
    //initialize variable
    @Input() arrayType: String;
    @Input() itemRenderId: number;
    @Input() showElementDelete: boolean;
    @Input() showelEmentStyle: boolean;
    @Input() showCustomDiv: boolean;
    deleteArrayItem: Array<any> = [];
    closeResult: string;
    constructor(private modalService: NgbModal, public indexcomponent: IndexComponent) { }
    ngOnInit($event) {

    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.indexcomponent.globalShowParticularElement(this.itemRenderId, this.arrayType);
        });
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
    //show custom edit div
    public showCustomEditDiv(getRenderId, getArrayType, $event) {
        if (getRenderId != '' && getArrayType != '') {
            this.showElementDelete = false;
            this.indexcomponent.globalshowCustomEditDiv(getRenderId, getArrayType);
        }
    }
    //toggle function view property
    public toggleEmentStyle() {
        this.showElementDelete = false;
        event.stopPropagation();
    }
    public open(content, $event) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    public getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}