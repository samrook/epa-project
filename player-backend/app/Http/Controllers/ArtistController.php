<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArtistStoreRequest;
use App\Http\Requests\ArtistUpdateRequest;
use App\Http\Resources\ArtistCollection;
use App\Http\Resources\ArtistResource;
use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \App\Http\Resources\ArtistCollection
     */
    public function index(Request $request)
    {
        $artists = Artist::all();

        return new ArtistCollection($artists);
    }

    /**
     * @param \App\Http\Requests\ArtistStoreRequest $request
     * @return \App\Http\Resources\ArtistResource
     */
    public function store(ArtistStoreRequest $request)
    {
        $artist = Artist::create($request->validated());

        return new ArtistResource($artist);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Artist $artist
     * @return \App\Http\Resources\ArtistResource
     */
    public function show(Request $request, Artist $artist)
    {
        return new ArtistResource($artist);
    }

    /**
     * @param \App\Http\Requests\ArtistUpdateRequest $request
     * @param \App\Models\Artist $artist
     * @return \App\Http\Resources\ArtistResource
     */
    public function update(ArtistUpdateRequest $request, Artist $artist)
    {
        $artist->update($request->validated());

        return new ArtistResource($artist);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Artist $artist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Artist $artist)
    {
        $artist->delete();

        return response()->noContent();
    }
}
