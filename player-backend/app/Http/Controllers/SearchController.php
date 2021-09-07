<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongCollection;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request, string $query)
    {
        $tracks = Song::where('title', 'like', "%{$query}%")->get();
        $albums = Album::query()
            ->select('albums.*')
            ->join('artists', 'artists.id', 'albums.artist_id')
            ->where('albums.name', 'like', "%{$query}%")
            ->orWhere('artists.name', 'like', "%{$query}%")
            ->with('songs')
            ->get();

        $tracks = $tracks->merge(
            $albums
                ->pluck('songs')
                ->flatten()
                ->unique('id')
        );

        $tracks->load(['album', 'artist']);

        return new SongCollection($tracks);
    }
}
