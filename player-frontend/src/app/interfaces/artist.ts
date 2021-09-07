/* eslint-disable @typescript-eslint/naming-convention */

import { Album } from './album';
import { Song } from './song';

export interface Artist {
  id: number;
  name: string;
  image_path?: string;
  release_date?: string;
  albums?: Album[];
  tracks?: Song[];
}
