import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';
import { PlayerState } from './interfaces/player-state';
import { NavigationService } from './services/navigation.service';
import { NavigationState } from './interfaces/navigation-state';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  playlist = [
    {
      id: 1,
      title: ''
    }
  ];

  pageTitle = 'Rebmem Music Player';

  playerShown: boolean;
  showFullscreenSection: boolean;
  trackPlaying: boolean;

  sideMenuShown: boolean;
  attachOutsideOnClick: boolean;

  constructor(
    private player: PlayerService,
    private navigation: NavigationService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.player.state$.subscribe((state: PlayerState) => {
        this.playerShown = state.playerShown;
        this.showFullscreenSection = state.showFullscreenSection;
        this.trackPlaying = state.trackPlaying;
      });

      this.navigation.state$.subscribe((state: NavigationState) => {
        this.sideMenuShown = state.sideMenuShown;
        this.attachOutsideOnClick = state.attachOutsideOnClick;
        this.pageTitle = state.pageTitle || this.pageTitle;
      });
    });
  }
}
