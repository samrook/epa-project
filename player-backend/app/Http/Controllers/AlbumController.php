<?php

namespace App\Http\Controllers;

use App\Http\Requests\AlbumStoreRequest;
use App\Http\Requests\AlbumUpdateRequest;
use App\Http\Resources\AlbumCollection;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \App\Http\Resources\AlbumCollection
     */
    public function index(Request $request)
    {
        $albums = Album::all();

        return new AlbumCollection($albums);
    }

    /**
     * @param \App\Http\Requests\AlbumStoreRequest $request
     * @return \App\Http\Resources\AlbumResource
     */
    public function store(AlbumStoreRequest $request)
    {
        $album = Album::create($request->validated());

        $album->load('artist');

        return new AlbumResource($album);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Album $album
     * @return \App\Http\Resources\AlbumResource
     */
    public function show(Request $request, Album $album)
    {
        return new AlbumResource($album);
    }

    /**
     * @param \App\Http\Requests\AlbumUpdateRequest $request
     * @param \App\Models\Album $album
     * @return \App\Http\Resources\AlbumResource
     */
    public function update(AlbumUpdateRequest $request, Album $album)
    {
        $album->update($request->validated());

        return new AlbumResource($album);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Album $album
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Album $album)
    {
        $album->delete();

        return response()->noContent();
    }
}
