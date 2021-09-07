import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationState } from '../interfaces/navigation-state';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  state$: Observable<NavigationState>;

  private state = {
    sideMenuShown: false,
    attachOutsideOnClick: true,
    pageTitle: null,
  };

  private stateSubject: BehaviorSubject<NavigationState>;

  constructor(private player: PlayerService) {
    this.stateSubject = new BehaviorSubject<NavigationState>(this.state);
    this.state$ = this.stateSubject.asObservable();
  }

  openSideMenu() {
    console.log('openSideMenu()', {state: this.state, playerState: this.player.getState()});
    this.state.sideMenuShown = true;
    this.state.attachOutsideOnClick = false;

    this.updateState();
  }

  closeSideMenu() {
    this.state.sideMenuShown = false;
    this.state.attachOutsideOnClick = true;

    this.updateState();
  }

  setTitle(title: string = null) {
    if (title) {
      this.state.pageTitle = title;
      this.updateState();
    }
  }

  private updateState() {
    this.stateSubject.next(this.state);
  }
}
