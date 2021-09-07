/* eslint-disable @typescript-eslint/naming-convention */

import { Album } from './album';
import { Artist } from './artist';

export interface Song {
  id?: number;
  title: string;
  album?: Album;
  artist?: Artist;
  track_no?: number;
  runtime?: number;
  release_date?: string;
  song_path: string;
  dropdownShown?: boolean;
}
