import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Song } from '../../interfaces/song';
import { NavigationService } from '../../services/navigation.service';
import { LoadingController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit, ViewWillEnter {

  songList: Song[] = [];

  constructor(
    private api: ApiService,
    private navigation: NavigationService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    //
  }

  ionViewWillEnter() {
    this.navigation.setTitle('Songs');
    this.loadSongs();
  }

  async loadSongs() {
    const loading = await this.loadingController.create({
      message: 'Loading your files.',
      duration: 0
    });
    await loading.present();

    const response: any = await this.api.get('/song').toPromise();

    this.songList = response.data;

    loading.dismiss();
  }
}
