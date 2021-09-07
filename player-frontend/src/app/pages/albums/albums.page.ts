import { Component, OnInit } from '@angular/core';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NavigationService } from '../../services/navigation.service';
import { Album } from '../../interfaces/album';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit, ViewWillEnter {

  albumList: Album[] = [];

  constructor(
    private api: ApiService,
    private navigation: NavigationService,
    private loadingController: LoadingController,
    private player: PlayerService,
  ) { }

  ngOnInit() {
    //
  }

  ionViewWillEnter() {
    this.navigation.setTitle('Albums');
    this.loadAlbums();
  }

  async loadAlbums() {
    const loading = await this.loadingController.create({
      message: 'Loading your albums.',
      duration: 0
    });
    await loading.present();

    const response: any = await this.api.get('/album').toPromise();

    this.albumList = response.data;

    loading.dismiss();
  }

  loadAlbumToQueue(album: Album) {
    // console.log({album});
    this.player.playAlbum(album);
    //TODO
  }
}
