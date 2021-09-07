import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongsPageRoutingModule } from './songs-routing.module';

import { SongsPage } from './songs.page';
import { TrackListComponent } from '../../components/track-list/track-list.component';
import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SongsPageRoutingModule,
  ],
  declarations: [SongsPage],
  exports: []
})
export class SongsPageModule {}
