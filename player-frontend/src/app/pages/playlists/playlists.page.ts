import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../interfaces/playlist';
import { ApiService } from '../../services/api.service';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { NavigationService } from '../../services/navigation.service';
import { PlayerService } from '../../services/player.service';
import { PlaylistPage } from '../../forms/playlist/playlist.page';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
})
export class PlaylistsPage implements OnInit {

  playlistList: Playlist[] = [];

  constructor(
    private api: ApiService,
    private loadingController: LoadingController,
    private navigation: NavigationService,
    private player: PlayerService,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    //
  }

  ionViewWillEnter() {
    this.navigation.setTitle('Playlists');
    this.init();
  }

  loadPlaylistToQueue(playlist: Playlist) {
    this.player.playPlaylist(playlist);
  }

  async createPlaylist() {
    const modal = await this.modalController.create({
      component: PlaylistPage,
      backdropDismiss: false
    });
    await modal.present();
    await modal.onWillDismiss();
    const alert = await this.alertController.create({
      message: 'Your playlist has been created.',
      buttons: ['Ok']
    });
    alert.present();
    this.loadPlaylists();
  }

  async loadPlaylists() {
    const response: any = await this.api.get('/playlist').toPromise();

    this.playlistList = response.data;
  }

  private async init() {
    const loading = await this.loadingController.create({
      message: 'Loading your playlists.',
      duration: 0
    });
    await loading.present();

    await this.loadPlaylists();

    loading.dismiss();
  }
}
