import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputControlComponent } from '../app-tools/inputcontrol/input-control.component';
import { TitleControlComponent } from '../app-tools/titlecontrol/title-control.component';
import { CheckboxControlComponent } from '../app-tools/checkboxcontrol/checkbox-control.component';
import { LabelControlComponent } from '../app-tools/labelcontrol/label-control.component';
import { DTCControlComponent } from '../app-tools/dtccontrol/dtc-control.component';
import { DTPControlComponent } from '../app-tools/dtpcontrol/dtp-control.component';
import { ButtonControlComponent } from '../app-tools/buttoncontrol/button-control.component';
import { DropdownControlComponent } from '../app-tools/dropdowncontrol/dropdown-control.component';
import { TditorControlComponent } from '../app-tools/tditorcontrol/tditor-control.component';
import { ModalControlComponent } from '../app-tools/modalcontrol/modal-control.component';
import { RadioControlComponent } from '../app-tools/radiocontrol/radio-control.component';
import { ImageUploaderComponent } from '../app-tools/imageuploader/image-uploader.component';
import { FormControlComponent } from '../app-tools/formcontrol/form-control.component';
import { ParagraphControlComponent } from '../app-tools/paragraphcontrol/paragraph-control.component';
import { AnchorControlComponent } from '../app-tools/anchorcontrol/anchor-control.component';
import { TabsControlComponent } from '../app-tools/tabscontrol/tabs-control.component';
import { GridControlComponent } from '../app-tools/gridcontrol/grid-control.component';
import { DividerControlComponent } from '../app-tools/dividercontrol/divider-control.component';


const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": IndexComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,DragDropDirectiveModule, NgbModule.forRoot()
    ], exports: [
        RouterModule
    ], declarations: [
        IndexComponent,
		InputControlComponent,
		TitleControlComponent,
		CheckboxControlComponent,
		LabelControlComponent,
		DTCControlComponent,
		DTPControlComponent,
		ButtonControlComponent,
		DropdownControlComponent,
		TditorControlComponent,
		ModalControlComponent,
		RadioControlComponent,
		ImageUploaderComponent,
		FormControlComponent,
		ParagraphControlComponent,
		AnchorControlComponent,
		TabsControlComponent,
		GridControlComponent,
		DividerControlComponent,
    ]
})
export class IndexModule {
	
}