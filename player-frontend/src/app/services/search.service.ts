import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  stateSubject: BehaviorSubject<any>;
  state$: Observable<any>;

  private state = {
    searchShown: false,
    searchQuery: null,
    searchResults: []
  };

  constructor(private api: ApiService) {
    this.stateSubject = new BehaviorSubject<any>(this.state);
    this.state$ = this.stateSubject.asObservable();
  }

  setSearchQuery(query: string) {
    this.state.searchQuery = query;

    this.stateSubject.next(this.state);
  }

  showSearchBar() {
    this.state.searchShown = true;

    this.stateSubject.next(this.state);
  }

  hideSearchBar() {
    this.state.searchShown = true;

    this.stateSubject.next(this.state);
  }

  isSearchBarShown() {
    return this.state.searchShown;
  }

  async getSearchResults(query: string = null) {
    if (query !== null) {
      this.setSearchQuery(query);
    }

    const response: any = await this.api.get('/search/' + this.state.searchQuery).toPromise();

    this.state.searchResults = response.data;

    this.stateSubject.next(this.state);

    return this.state.searchResults;
  }
}
