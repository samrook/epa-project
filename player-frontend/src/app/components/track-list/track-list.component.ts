import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../interfaces/song';
import { PlayerService } from '../../services/player.service';
import { NavigationService } from '../../services/navigation.service';
import { NavigationState } from '../../interfaces/navigation-state';
import { ModalController, AlertController } from '@ionic/angular';
import { AddSongToPlaylistPage } from '../../forms/add-song-to-playlist/add-song-to-playlist.page';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../interfaces/playlist';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit {

  @Input() songList: Song[] = [];
  @Input() isSongList = false;
  @Input() isPlayList = false;
  @Input() playlist: Playlist | number = null;

  @Output() trackRemovedFromPlaylist = new EventEmitter<number>(null);

  sideMenuShown = false;
  activeSongDropdownId: number = null;

  constructor(
    private player: PlayerService,
    private navigation: NavigationService,
    private modalController: ModalController,
    private playlistService: PlaylistService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    // subscribe to navigation state changes - this callback will be ran
    // everytime the state is changed elsewhere in the application
    this.navigation.state$.subscribe((state: NavigationState) => {
      this.sideMenuShown = state.sideMenuShown;
    });
  }

  openMoreOptions(song: Song) {
    if (typeof song !== 'undefined' && (song.dropdownShown === undefined || song.dropdownShown === false)) {
      song.dropdownShown = true;

      if (song.id !== this.activeSongDropdownId) {
        const oldSongDropdown = this.songList.find(oldSong => oldSong.id === this.activeSongDropdownId);
        this.closeMoreOptions(oldSongDropdown);
      }

      this.activeSongDropdownId = song.id;
    }
  }

  closeMoreOptions(song: Song) {
    if (typeof song !== 'undefined' && song.dropdownShown === true) {
      song.dropdownShown = false;
    }
  }

  toggleMoreOptions(song: Song) {
    if (song.dropdownShown === undefined || song.dropdownShown === false) {
      this.openMoreOptions(song);
    } else {
      this.closeMoreOptions(song);
    }
  }

  playSong(song: Song) {
    // only play song if the side menu is hidden
    if (this.sideMenuShown === false) {
      const index = this.songList.findIndex(track => track.id === song.id);

      // call playTrack() method of the player service class
      // this handles updating the player's state throughout the application
      this.player.playTrack(song, this.songList, index);
    }
  }

  getSubtitleLink(song: Song) {
    // return the link to the album if the album exists
    return song.album ? ('/albums/' + song.album.id) : '#';
  }

  async addTrackToPlaylist(song: Song) {
    const modal = await this.modalController.create({
      component: AddSongToPlaylistPage,
      componentProps: {
        song
      }
    });

    this.closeMoreOptions(song);

    await modal.present();
  }

  async removeTrackFromPlaylist(song: Song) {
    const confirm = await this.alertController.create({
      message: 'Are you sure you want to remove this track?',
      buttons: [
        'Cancel',
        {
          text: 'Remove',
          handler: () => this.playlistService.removeTrackFromPlaylist(song, this.playlist),
          role: 'submit'
        }
      ]
    });

    this.closeMoreOptions(song);

    await confirm.present();


    const response = await confirm.onWillDismiss();

    if (response.role === 'submit') {
      const alert = await this.alertController.create({
        message: 'The track has been removed from this playlist.',
        buttons: ['Ok']
      });

      alert.present();
      this.trackRemovedFromPlaylist.emit(song.id);
    }

    console.log({response});
  }
}
