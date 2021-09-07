import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../interfaces/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  message: string;
  imagePath: string;
  imageUrl: string | ArrayBuffer = '../../../assets/images/default_album_cover.png';

  form: FormGroup;

  playlist: Playlist;

  get playlistName() {
    return this.form.get('name');
  }

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [
        '',
        Validators.required,
      ]
    });
  }

  close() {
    this.modalController.dismiss();
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }

  async createPlaylist() {
    if (this.form.valid) {
      const playlist = await this.playlistService.createPlaylist(this.playlistName.value);

      this.modalController.dismiss({
        playlist
      });
    }
  }
}
