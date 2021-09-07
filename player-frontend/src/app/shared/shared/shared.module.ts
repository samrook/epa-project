import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackListComponent } from '../../components/track-list/track-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PlaylistPage } from 'src/app/forms/playlist/playlist.page';
import { AddSongToPlaylistPage } from '../../forms/add-song-to-playlist/add-song-to-playlist.page';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    TrackListComponent,
    PlaylistPage,
    AddSongToPlaylistPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  exports: [
    TrackListComponent,
    PlaylistPage,
    AddSongToPlaylistPage,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ClickOutsideModule,
  ]
})
export class SharedModule { }
