<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class AlbumResource extends JsonResource
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
            'name' => $this->name,
            'artist' => ArtistResource::make($this->whenLoaded('artist')),
            'release_date' => $this->release_date,
            'image_path' => $this->image_path ? Storage::disk('public')->url($this->image_path) : '',
            'tracks' => SongResource::collection($this->whenLoaded('songs')),
        ];
    }
}
