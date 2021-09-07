<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('cors')->group(function() {
    Route::apiResource('song', App\Http\Controllers\SongController::class);

    Route::apiResource('album', App\Http\Controllers\AlbumController::class);

    Route::apiResource('artist', App\Http\Controllers\ArtistController::class);

    Route::put('/playlist/{playlist}/add', [App\Http\Controllers\PlaylistController::class, 'add'])->name('playlist.add-songs');
    Route::put('/playlist/{playlist}/remove', [App\Http\Controllers\PlaylistController::class, 'remove'])->name('playlist.remove-songs');
    Route::apiResource('playlist', App\Http\Controllers\PlaylistController::class);

    Route::get('/search/{query}', [App\Http\Controllers\SearchController::class, 'index'])->name('search');
});
