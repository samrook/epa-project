<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Album;
use App\Models\Song;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\SongController
 */
class SongControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_behaves_as_expected()
    {
        $songs = Song::factory()->count(3)->create();

        $response = $this->get(route('song.index'));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'artist' => [
                        'id',
                        'name',
                        'image_path'
                    ],
                    'album' => [
                        'id',
                        'name',
                        'image_path',
                        'release_date',
                        'tracks' => [
                            '*' => [
                                'id',
                                'title',
                                'release_date'
                            ]
                        ]
                    ],
                    'release_date',
                    'runtime',
                    'track_no'
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
            \App\Http\Controllers\SongController::class,
            'store',
            \App\Http\Requests\SongStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves()
    {
        $title = $this->faker->sentence(4);
        $album = Album::factory()->has(Song::factory()->count(5))->create();

        $response = $this->post(route('song.store'), [
            'title' => $title,
            'album_id' => $album->id,
            'artist_id' => $album->artist_id
        ]);

        $songs = Song::query()
            ->where('album_id', $album->id)
            ->get();
        $this->assertCount(6, $songs);
        $song = Song::query()
            ->where('title', $title)
            ->first();

        $this->assertEquals($title, $song->title);
        $this->assertEquals($album->id, $song->album_id);

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'artist' => [
                    'id',
                    'name',
                    'image_path'
                ],
                'album' => [
                    'id',
                    'name',
                    'image_path',
                    'release_date',
                    'tracks' => [
                        '*' => [
                            'id',
                            'title',
                            'release_date'
                        ]
                    ]
                ],
                'release_date',
                'runtime',
                'track_no'
            ]
        ]);
    }


    /**
     * @test
     */
    public function show_behaves_as_expected()
    {
        $song = Song::factory()->create();

        $response = $this->get(route('song.show', $song));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'artist' => [
                    'id',
                    'name',
                    'image_path'
                ],
                'album' => [
                    'id',
                    'name',
                    'image_path',
                    'release_date',
                    'tracks' => [
                        '*' => [
                            'id',
                            'title',
                            'release_date'
                        ]
                    ]
                ],
                'release_date',
                'runtime',
                'track_no'
            ]
        ]);
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\SongController::class,
            'update',
            \App\Http\Requests\SongUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_behaves_as_expected()
    {
        $song = Song::factory()->create();
        $title = $this->faker->sentence(4);
        $album = Album::factory()->has(Song::factory()->count(5))->create();

        $response = $this->put(route('song.update', $song), [
            'title' => $title,
            'album_id' => $album->id,
        ]);

        $song->refresh();

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'artist' => [
                    'id',
                    'name',
                    'image_path'
                ],
                'album' => [
                    'id',
                    'name',
                    'image_path',
                    'release_date',
                    'tracks' => [
                        '*' => [
                            'id',
                            'title',
                            'release_date'
                        ]
                    ]
                ],
                'release_date',
                'runtime',
                'track_no'
            ]
        ]);

        $this->assertEquals($title, $song->title);
        $this->assertEquals($album->id, $song->album_id);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_responds_with()
    {
        $song = Song::factory()->create();

        $response = $this->delete(route('song.destroy', $song));

        $response->assertNoContent();

        $this->assertDeleted($song);
    }
}
