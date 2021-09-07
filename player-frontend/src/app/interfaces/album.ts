/* eslint-disable @typescript-eslint/naming-convention */
import { Song } from './song';
import { Artist } from './artist';

export interface Album {
  id: number;
  name: string;
  image_path?: string;
  release_date?: string;
  artist?: Artist;
  tracks?: Song[];
}
