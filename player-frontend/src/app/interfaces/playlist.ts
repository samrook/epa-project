/* eslint-disable @typescript-eslint/naming-convention */

import { Song } from './song';

export interface Playlist {
  id: number;
  name: string;
  tracks?: Song[];
  image_path?: string;
}
