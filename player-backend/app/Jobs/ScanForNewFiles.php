<?php

namespace App\Jobs;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use wapmorgan\Mp3Info\Mp3Info;

class ScanForNewFiles
{
    use Dispatchable;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // get a list of current songs in the database
        $current_songs = Song::all()->pluck('song_path');

        // get the storage driver once
        $storage = Storage::disk('public');

        // get a list of all files in the storage location
        $files = $storage->allFiles();

        // keep track of loaded models to speed things up
        $artists = [];
        $albums = [];
        $songs = [];

        foreach ($files as $file) {
            if (in_array($file, $current_songs->toArray())) {
                // file already in the database
                continue;
            }

            $filename_parts = explode('.', $file);

            if ($filename_parts[0] === '') {
                // file is a hidden file
                continue;
            }

            // get the absolute path to the file
            $public_path = $storage->path($file);

            // get basic information about the file
            $info = pathinfo($public_path);

            // we are only interested in MP3 files for the purposes of the demo,
            // more audio formats can be supported though
            if ($info['extension'] === 'mp3') {
                // get the mp3 meta data from the file as well as the idv2/3 tags
                // idv2/3 tags store information about a track, such as title or album
                $audio = new Mp3Info($public_path, true);

                $artist = $audio->tags['artist'];
                $album = $audio->tags['album'];
                $title = $audio->tags['song'];
                $track = $audio->tags['track'];

                // featured artists will be joined with the main artist with a '/' (e.g. artist 1/artist2)
                // seperate them out to save each artist individually which will make queries easier
                if (count($artist_parts = explode('/', $artist)) > 1) {
                    foreach ($artist_parts as $artist) {
                        // check to see if the artist model has been loaded during this request
                        if (isset($artists[$artist]) === false) {
                            // firstOrCreate will attempt to fetch a record from the db matching the parameters
                            // given. If none are found then one will be create and persisted in the db.
                            $artists[$artist] = Artist::firstOrCreate([
                                'name' => $artist
                            ]);
                        }
                    }

                    // set the first artist in array as the artist of the track
                    $artist = $artist_parts[0];
                }

                // check to see if the artist model has been loaded during this request
                if (isset($artists[$artist]) === false) {
                    // firstOrCreate will attempt to fetch a record from the db matching the parameters
                    // given. If none are found then one will be create and persisted in the db.
                    $artists[$artist] = Artist::firstOrCreate([
                        'name' => $artist
                    ]);
                }

                // check to see if the album model has been loaded during this request
                if (isset($albums[$album]) === false) {
                    // firstOrCreate will attempt to fetch a record from the db matching the parameters
                    // given. If none are found then one will be create and persisted in the db.
                    $albums[$album] = $artists[$artist]->albums()->firstOrCreate([
                        'name' => $album
                    ]);
                }

                $songs[$file] = $albums[$album]->songs()->create([
                    'title' => $title,
                    'track_no' => $track,
                    'artist_id' => $artists[$artist]->id,
                    'song_path' => $file
                ]);
            }
        }

        return $songs;
    }
}
