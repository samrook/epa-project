<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class SongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'album' => AlbumResource::make($this->whenLoaded('album')),
            'artist' => ArtistResource::make($this->whenLoaded('artist')),
            'track_no' => $this->track_no,
            'runtime' => $this->runtime,
            'release_date' => $this->release_date,
            'song_path' => Storage::disk('public')->url($this->song_path),
        ];
    }
}
