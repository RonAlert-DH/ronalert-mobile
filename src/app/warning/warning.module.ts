import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WarningPage } from './warning.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WarningPageRoutingModule } from './warning-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WarningPageRoutingModule
  ],
  declarations: [WarningPage]
})
export class WarningPageModule {}
