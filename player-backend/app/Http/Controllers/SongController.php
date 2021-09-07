<?php

namespace App\Http\Controllers;

use App\Http\Requests\SongStoreRequest;
use App\Http\Requests\SongUpdateRequest;
use App\Http\Resources\SongCollection;
use App\Http\Resources\SongResource;
use App\Models\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \App\Http\Resources\SongCollection
     */
    public function index(Request $request)
    {
        $songs = Song::with(['artist', 'album'])->orderBy('title')->get();

        return new SongCollection($songs);
    }

    /**
     * @param \App\Http\Requests\SongStoreRequest $request
     * @return \App\Http\Resources\SongResource
     */
    public function store(SongStoreRequest $request)
    {
        $song = Song::create($request->validated());

        $song->load(['album', 'artist']);

        return new SongResource($song);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Song $song
     * @return \App\Http\Resources\SongResource
     */
    public function show(Request $request, Song $song)
    {
        $song->load(['album', 'artist']);

        return new SongResource($song);
    }

    /**
     * @param \App\Http\Requests\SongUpdateRequest $request
     * @param \App\Models\Song $song
     * @return \App\Http\Resources\SongResource
     */
    public function update(SongUpdateRequest $request, Song $song)
    {
        $song->update($request->validated());
        $song->load(['album', 'artist']);

        return new SongResource($song);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Song $song
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Song $song)
    {
        $song->delete();

        return response()->noContent();
    }
}
