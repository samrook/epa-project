<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\PlaylistController
 */
class PlaylistControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_behaves_as_expected()
    {
        $playlists = Playlist::factory()->has(Song::factory()->count(5))->count(3)->create();

        $response = $this->get(route('playlist.index'));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'image_path',
                    'tracks' => [
                        '*' => [
                            'id',
                            'title',
                            'release_date'
                        ]
                    ]
                ]
            ]
        ]);
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\PlaylistController::class,
            'store',
            \App\Http\Requests\PlaylistStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves()
    {
        $name = $this->faker->name;

        $response = $this->post(route('playlist.store'), [
            'name' => $name,
        ]);

        $playlists = Playlist::query()
            ->where('name', $name)
            ->get();
        $this->assertCount(1, $playlists);
        $playlist = $playlists->first();

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'image_path'
            ]
        ]);
    }


    /**
     * @test
     */
    public function add_to_playlist_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\PlaylistController::class,
            'add',
            \App\Http\Requests\AddSongToPlaylistRequest::class
        );
    }


    /**
     * @test
     */
    public function can_add_songs_to_a_playlist()
    {
        $playlist = Playlist::factory()->create();
        $songs = Song::factory()->count(5)->create();
        $song_ids = $songs->pluck('id')->toArray();

        $response = $this->put(route('playlist.add-songs', $playlist), [
            'songs' => $song_ids
        ]);

        $playlists = Playlist::all();
        $this->assertCount(1, $playlists);
        $playlist = $playlists->first();

        $this->assertEquals(5, $playlist->songs->count());

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'image_path',
                'tracks' => [
                    '*' => [
                        'id',
                        'title',
                        'release_date'
                    ]
                ]
            ]
        ]);
    }


    /**
     * @test
     */
    public function remove_from_playlist_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\PlaylistController::class,
            'remove',
            \App\Http\Requests\RemoveSongFromPlaylistRequest::class
        );
    }


    /**
     * @test
     */
    public function can_remove_songs_from_a_playlist()
    {
        $songs = Song::factory()->count(5)->create();
        $playlist = Playlist::factory()->hasAttached($songs)->create();
        $song_ids = $songs->pluck('id')->toArray();

        $response = $this->put(route('playlist.remove-songs', $playlist), [
            'songs' => $song_ids
        ]);

        $playlists = Playlist::all();
        $this->assertCount(1, $playlists);
        $playlist = $playlists->first();

        $this->assertEquals(0, $playlist->songs->count());

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'image_path',
                'tracks' => [
                    '*' => [
                        'id',
                        'title',
                        'release_date'
                    ]
                ]
            ]
        ]);
    }


    /**
     * @test
     */
    public function show_behaves_as_expected()
    {
        $playlist = Playlist::factory()->create();

        $response = $this->get(route('playlist.show', $playlist));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'image_path',
                'tracks' => [
                    '*' => [
                        'id',
                        'title',
                        'release_date'
                    ]
                ]
            ]
        ]);
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\PlaylistController::class,
            'update',
            \App\Http\Requests\PlaylistUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_behaves_as_expected()
    {
        $playlist = Playlist::factory()->create();
        $name = $this->faker->name;

        $response = $this->put(route('playlist.update', $playlist), [
            'name' => $name,
        ]);

        $playlist->refresh();

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'image_path',
                'tracks' => [
                    '*' => [
                        'id',
                        'title',
                        'release_date'
                    ]
                ]
            ]
        ]);

        $this->assertEquals($name, $playlist->name);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_responds_with()
    {
        $playlist = Playlist::factory()->create();

        $response = $this->delete(route('playlist.destroy', $playlist));

        $response->assertNoContent();

        $this->assertDeleted($playlist);
    }
}
