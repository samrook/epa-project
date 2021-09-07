import { NgModule } from '@angular/core';
import { AlbumPageRoutingModule } from './album-routing.module';

import { AlbumPage } from './album.page';
import { TrackListComponent } from '../../components/track-list/track-list.component';
import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AlbumPageRoutingModule
  ],
  declarations: [AlbumPage]
})
export class AlbumPageModule {}
