import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Song } from '../interfaces/song';
import { Playlist } from '../interfaces/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(
    private api: ApiService,
  ) { }

  async addTrackToPlaylist(track: Song, playlist: Playlist | number): Promise<boolean> {
    try {
      const endpoint = '/playlist/' + (typeof playlist === 'number' ? playlist : playlist.id) + '/add';
      const response = await this.api.put(endpoint, {songs: [track.id]}).toPromise();

      return true;
    }
    catch(error) {
      console.log('There was an error adding this track to the selected playlist');
    }
  }

  async removeTrackFromPlaylist(track: Song, playlist: Playlist | number): Promise<boolean> {
    try {
      const endpoint = '/playlist/' + (typeof playlist === 'number' ? playlist : playlist.id) + '/remove';
      const response = await this.api.put(endpoint, {songs: [track.id]}).toPromise();

      return true;
    }
    catch(error) {
      console.log('There was an error adding this track to the selected playlist');
    }
  }

  async getPlaylists(): Promise<Playlist[]> {
    try {
      const response: any = await this.api.get('/playlist').toPromise();

      return response.data;
    }
    catch (error) {
      console.log('There was an error fetching the playlists.', {error});
    }
  }

  async createPlaylist(name: string): Promise<Playlist> {
    try {
      const response: any = await this.api.post('/playlist', {name}).toPromise();

      return response.data;
    } catch (error) {
      console.log('There was an error saving the playlist.', {error});
    }
  }
}
