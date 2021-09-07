import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerState } from '../interfaces/player-state';
import { Song } from '../interfaces/song';
import { Album } from '../interfaces/album';
import { Playlist } from '../interfaces/playlist';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public state$: Observable<PlayerState>;

  private state: PlayerState = {
    playerShown: false,
    showFullscreenSection: false,
    trackPlaying: false,
    nowPlaying: null,
    queue: [],
    nowPlayingDuration: 0,
    nowPlayingPosition: 0,
    nowPlayingIndex: null,
    howlerQueue: [],
    loop: true,
    shuffle: false,
    shufflePlayed: [],
    shuffleIndex: 0,
  };

  private stateSubject: BehaviorSubject<PlayerState> = new BehaviorSubject<PlayerState>(this.state);

  private seekbarUpdateInterval;

  constructor() {
    this.stateSubject = new BehaviorSubject<PlayerState>(this.state);
    this.state$ = this.stateSubject.asObservable();
  }

  getState() {
    return this.state;
  }

  playAlbum(album: Album) {
    if (this.state.trackPlaying === true) {
      this.state.howlerQueue[this.state.nowPlayingIndex].stop();
      this.state.howlerQueue = [];
      this.state.nowPlayingIndex = 0;
    }

    const tracks = album.tracks.map(track => {
      track.album = album;
      track.artist = album.artist;

      return track;
    }).sort((a, b) => a.track_no - b.track_no);

    this.state.nowPlaying = tracks[0];

    this.playTracks(tracks);

    this.updateState();
  }

  playPlaylist(playlist: Playlist = null) {
    if (this.state.trackPlaying === true) {
      this.state.howlerQueue[this.state.nowPlayingIndex].stop();
      this.state.howlerQueue = [];
      this.state.nowPlayingIndex = 0;
    }

    if (playlist !== null) {
      const track = playlist.tracks[0];
      this.state.nowPlaying = track;
      // load file
      // set position 0?
    }

    this.playTracks(playlist.tracks);

    this.updateState();
  }

  playTrack(track: Song, trackList: Song[] = null, index: number = null) {
    if (this.state.howlerQueue[this.state.nowPlayingIndex]) {
      this.state.howlerQueue[this.state.nowPlayingIndex].stop();
    }

    if (trackList !== null) {
      this.state.queue = trackList;
    }

    this.state.nowPlayingIndex = index;
    this.state.nowPlaying = track;

    // load file
    // set position 0?
    this.playTracks(trackList);

    this.updateState();
  }

  pauseTrack() {
    if (this.state.howlerQueue[this.state.nowPlayingIndex]) {
      this.state.howlerQueue[this.state.nowPlayingIndex].pause();
      this.state.trackPlaying = false;

      this.updateState();
    }
  }

  resumeTrack() {
    if (this.state.howlerQueue[this.state.nowPlayingIndex]) {
      this.state.howlerQueue[this.state.nowPlayingIndex].play();
      this.state.trackPlaying = true;

      this.updateState();
    }
  }

  showFullscreenPlayer() {
    // do stuff

    this.state.showFullscreenSection = true;

    this.updateState();
  }

  hideFullscreenPlayer() {
    // do stuff

    this.state.showFullscreenSection = false;

    this.updateState();
  }

  hidePlayer() {
    this.state.playerShown = false;

    this.updateState();
  }

  showPlayer() {
    this.state.playerShown = true;

    this.updateState();
  }

  togglePlayer() {
    this.state.playerShown = ! this.state.playerShown;

    this.updateState();
  }

  enableShuffle() {
    this.state.shuffle = true;

    this.updateState();
  }

  disableShuffle() {
    this.state.shuffle = false;
    this.state.shufflePlayed = [];
    this.state.shuffleIndex = 0;

    this.updateState();
  }

  nextTrack() {
    this.state.howlerQueue[this.state.nowPlayingIndex].stop();

    if (this.state.shuffle === false) {
      if (this.state.loop === true) {
        // if loop mode is enabled we want to reset the index pointer to the last index if we are currently on the last item in the queue
        this.state.nowPlayingIndex = (this.state.nowPlayingIndex + 1 !== this.state.howlerQueue.length)
          ? this.state.nowPlayingIndex + 1
          : 0;
      } else {
        this.state.nowPlayingIndex = this.state.nowPlayingIndex - 1;
      }
    } else {
      console.log('shuffle enabled')
      const currentNowPlayinIndex = this.state.nowPlayingIndex;

      if (this.state.howlerQueue.length > 1) {
        while (currentNowPlayinIndex === this.state.nowPlayingIndex) {
          this.state.nowPlayingIndex = Math.floor(Math.random() * this.state.howlerQueue.length);
        }
      }
    }

    this.playTrackFromQueue(this.state.nowPlayingIndex);
  }

  previousTrack() {
    if (this.state.nowPlayingPosition >= 3) {
      this.state.howlerQueue[this.state.nowPlayingIndex].seek(0);
    } else {
      if (this.state.shuffle === false) {
        this.state.howlerQueue[this.state.nowPlayingIndex].stop();
        if (this.state.loop === true) {
          // if loop mode is enabled we want to reset the index pointer to the last index if we are currently on the last item in the queue
          this.state.nowPlayingIndex = (this.state.nowPlayingIndex - 1 === -1)
            ? this.state.howlerQueue.length - 1
            : this.state.nowPlayingIndex - 1;
        } else {
          this.state.nowPlayingIndex = this.state.nowPlayingIndex - 1;
        }
      } else {
        console.log('shuffle enabled')
        const currentNowPlayinIndex = this.state.nowPlayingIndex;

        if (this.state.howlerQueue.length > 1) {
          while (currentNowPlayinIndex === this.state.nowPlayingIndex) {
            this.state.nowPlayingIndex = Math.floor(Math.random() * this.state.howlerQueue.length);
          }
        }
      }

      this.playTrackFromQueue(this.state.nowPlayingIndex);
    }
  }

  setPosition(position: number) {
    this.state.howlerQueue[this.state.nowPlayingIndex].seek(position);
    this.state.nowPlayingPosition = position;

    this.updateState();
  }

  toggleShuffleMode() {
    this.state.shuffle = ! this.state.shuffle;

    this.updateState();
  }

  toggleLoopMode() {
    this.state.loop = ! this.state.loop;

    this.updateState();
  }

  private playTracks(tracks: Song[] = null) {
    if (tracks === null) {
      tracks = [this.state.nowPlaying];
    }

    this.state.queue = tracks;

    if (this.state.nowPlayingIndex === null && this.state.nowPlaying !== null) {
      this.state.nowPlayingIndex = tracks.findIndex(track => track.id === this.state.nowPlaying.id);
    }

    if (this.state.nowPlayingIndex === null) {
      this.state.nowPlayingIndex = 0;
    }

    const xhrOptions = {
      headers: {
        Accept: 'audio/*',
        'Content-Type': 'application/octet-stream'
      }
    };

    const onEnd = (e) => {
      if (this.state.shuffle === false) {
        if (this.state.loop === true) {
          // if loop mode is enabled we want to reset the index pointer to 0 (start) if we are currently on the last item in the queue
          this.state.nowPlayingIndex = (this.state.nowPlayingIndex + 1 !== this.state.howlerQueue.length)
            ? this.state.nowPlayingIndex + 1
            : 0;
        } else {
          if (this.state.nowPlayingIndex + 1 === this.state.howlerQueue.length) {
            this.state.nowPlayingIndex = 0;
            this.state.playerShown = false;

            this.updateState();
            return;
          } else {
            this.state.nowPlayingIndex = this.state.nowPlayingIndex + 1;
          }
        }
      } else {
        const currentNowPlayinIndex = this.state.nowPlayingIndex;

        if (this.state.howlerQueue.length > 1) {
          while (currentNowPlayinIndex === this.state.nowPlayingIndex) {
            this.state.nowPlayingIndex = Math.floor(Math.random() * this.state.howlerQueue.length);
          }
        }
      }

      this.playTrackFromQueue(this.state.nowPlayingIndex);
    };

    const onPlay = (e) => {
      this.state.nowPlayingDuration = this.state.howlerQueue[this.state.nowPlayingIndex].duration();

      this.updateState();

      this.seekbarUpdateInterval = setInterval(() => {
        const sound = this.state.howlerQueue[this.state.nowPlayingIndex];

        if (sound.playing()) {
          this.state.nowPlayingPosition = sound.seek();
          this.updateState();
        }
      }, 500);
    };

    const onPause = (e) => {
      clearInterval(this.seekbarUpdateInterval);
    };

    this.state.howlerQueue = this.state.queue.map(track => new Howl({
      src: [track.song_path],
      xhr: xhrOptions,
      html5: true,
      buffer: true,
      onend: onEnd,
      onpause: onPause,
      onplay: onPlay,
    }));

    this.playTrackFromQueue(this.state.nowPlayingIndex);

    this.showPlayer();
  }

  private playTrackFromQueue(index: number) {
    this.state.howlerQueue[index].play();
    this.state.nowPlaying = this.state.queue[index];
    this.state.nowPlayingIndex = index;
    this.state.trackPlaying = true;

    this.updateState();
  }

  private updateState() {
    this.stateSubject.next(this.state);
  }
}
