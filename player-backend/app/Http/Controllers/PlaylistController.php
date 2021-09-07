<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSongToPlaylistRequest;
use App\Http\Requests\PlaylistStoreRequest;
use App\Http\Requests\PlaylistUpdateRequest;
use App\Http\Requests\RemoveSongFromPlaylistRequest;
use App\Http\Resources\PlaylistCollection;
use App\Http\Resources\PlaylistResource;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \App\Http\Resources\PlaylistCollection
     */
    public function index(Request $request)
    {
        $playlists = Playlist::all();

        return new PlaylistCollection($playlists);
    }

    /**
     * @param \App\Http\Requests\PlaylistStoreRequest $request
     * @return \App\Http\Resources\PlaylistResource
     */
    public function store(PlaylistStoreRequest $request)
    {
        $playlist = Playlist::create($request->validated());

        return new PlaylistResource($playlist);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Playlist $playlist
     * @return \App\Http\Resources\PlaylistResource
     */
    public function show(Request $request, Playlist $playlist)
    {
        return new PlaylistResource($playlist);
    }

    /**
     * @param \App\Http\Requests\PlaylistUpdateRequest $request
     * @param \App\Models\Playlist $playlist
     * @return \App\Http\Resources\PlaylistResource
     */
    public function update(PlaylistUpdateRequest $request, Playlist $playlist)
    {
        $playlist->update($request->validated());

        return new PlaylistResource($playlist);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Playlist $playlist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Playlist $playlist)
    {
        $playlist->delete();

        return response()->noContent();
    }

    /**
     * @param \App\Http\Requests\AddSongToPlaylistRequest $request
     * @param \App\Models\Playlist $playlist
     * @return \App\Http\Resources\PlaylistResource
     */
    public function add(AddSongToPlaylistRequest $request, Playlist $playlist)
    {
        $playlist->songs()->attach($request->songs);

        $playlist->load('songs');

        return new PlaylistResource($playlist);
    }

    /**
     * @param \App\Http\Requests\RemoveSongFromPlaylistRequest $request
     * @param \App\Models\Playlist $playlist
     * @return \App\Http\Resources\PlaylistResource
     */
    public function remove(RemoveSongFromPlaylistRequest $request, Playlist $playlist)
    {
        $playlist->songs()->detach($request->songs);

        $playlist->load('songs');

        return new PlaylistResource($playlist);
    }
}
