import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { IndexComponent } from '../../index/index.component';
@Component({
    selector: 'label-control',
    templateUrl: './label-control.component.html',
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
export class LabelControlComponent {
    //initialize variable
    @Input() arrayType: String;
    @Input() itemRenderId: number;
    @Input() showElementDelete: boolean;
    @Input() showelEmentStyle: boolean;
    @Input() showCustomDiv: boolean;
    constructor(public indexcomponent: IndexComponent) {
    }
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
    public showCustomEditDiv(getRenderId, getArrayType) {
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

}