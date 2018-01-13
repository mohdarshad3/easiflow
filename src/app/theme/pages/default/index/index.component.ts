import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';


@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {
	
	private itemsDropped:Array<any> = [];
    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {
		//debugger;
    }
    ngAfterViewInit() {
        this._script.loadScripts('app-index',
            ['assets/app/js/dashboard.js']);

    }
	private addDropItem(event){
		debugger;
		//classname=event.itemclass;
		this.itemsDropped.push(event);
		//debugger;
		//angular.element('.dragged-item')
		//var draggedItem = angular.element( document.querySelector( '.dragged-item' ) );
		//myEl.addClass('alpha');
  }
}