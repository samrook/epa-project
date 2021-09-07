import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Album } from '../../interfaces/album';
import { NavigationService } from '../../services/navigation.service';
import { LoadingController } from '@ionic/angular';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  album: Album = null;

  constructor(
    private api: ApiService,
    private navigation: NavigationService,
    private loadingController: LoadingController,
    private player: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //
  }

  ionViewWillEnter() {
    this.navigation.setTitle('Albums');
    this.loadAlbum();
  }

  async loadAlbum() {
    const loading = await this.loadingController.create({
      message: 'Loading your albums.',
      duration: 0
    });
    await loading.present();

    const albumId = this.route.snapshot.paramMap.get('id');

    const response: any = await this.api.get('/album/' + albumId).toPromise();

    this.album = response.data;

    this.navigation.setTitle(this.album.name);

    this.album.tracks.forEach(track => {
      track.album = this.album;
      track.artist = this.album.artist;
    });

    loading.dismiss();
  }

  loadAlbumToQueue(album: Album) {
    // console.log({album});
    this.player.playAlbum(album);
    //TODO
  }

}
