import { NgModule } from '@angular/core';

import { PlaylistsPageRoutingModule } from './playlists-routing.module';

import { PlaylistsPage } from './playlists.page';
import { SharedModule } from '../../shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PlaylistsPageRoutingModule
  ],
  declarations: [PlaylistsPage]
})
export class PlaylistsPageModule {}
