import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Song } from '../../interfaces/song';
import { Playlist } from '../../interfaces/playlist';
import { PlaylistService } from '../../services/playlist.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PlaylistPage } from '../playlist/playlist.page';

@Component({
  selector: 'app-add-song-to-playlist',
  templateUrl: './add-song-to-playlist.page.html',
  styleUrls: ['./add-song-to-playlist.page.scss'],
})
export class AddSongToPlaylistPage implements OnInit {

  @Input() song: Song;

  form: FormGroup;

  playlists: Playlist[];

  get playlistId() {
    return this.form.get('playlistId');
  }

  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      playlistId: [
        '',
        Validators.required,
      ],
      songs: this.formBuilder.array(
        [this.song.id],
        Validators.required
      )
    });

    this.fetchPlaylists();
  }

  close() {
    this.modalController.dismiss();
  }

  async save() {
    console.log({form: this.form.value, playlistId: this.playlistId.value});
    const result = await this.playlistService.addTrackToPlaylist(this.song, parseInt(this.playlistId.value, 10));
    // this.api.post('/playlist/' + this.playlist_id.value + '/add').toPromise();
    if (result === true) {
      const alert = await this.alertController.create({
        message: 'Track was added successfully.',
        buttons: ['Ok']
      });

      await alert.present();

      this.modalController.dismiss();
    }
  }

  async checkOption(select: HTMLSelectElement) {
    if (select.value === 'new') {
      const modal = await this.modalController.create({
        component: PlaylistPage,
        backdropDismiss: false,
      });

      await modal.present();
      const response = await modal.onWillDismiss();
      await this.fetchPlaylists();
      this.playlistId.setValue(response.data.playlist.id);
    }
  }

  private async fetchPlaylists() {
    this.playlists = await this.playlistService.getPlaylists();
  }
}
