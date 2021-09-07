import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../interfaces/playlist';
import { ApiService } from '../../services/api.service';
import { NavigationService } from '../../services/navigation.service';
import { LoadingController } from '@ionic/angular';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlist: Playlist = null;

  constructor(
    private api: ApiService,
    private navigation: NavigationService,
    private loadingController: LoadingController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //
  }

  ionViewWillEnter() {
    this.navigation.setTitle('Playlists');
    this.loadPlaylist();
  }

  async loadPlaylist() {
    const loading = await this.loadingController.create({
      message: 'Loading your playlist.',
      duration: 0
    });
    await loading.present();

    const playlistId = this.route.snapshot.paramMap.get('id');

    const response: any = await this.api.get('/playlist/' + playlistId).toPromise();

    this.playlist = response.data;

    this.navigation.setTitle(this.playlist.name);

    loading.dismiss();
  }
}
