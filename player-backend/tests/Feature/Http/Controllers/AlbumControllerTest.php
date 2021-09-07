<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\AlbumController
 */
class AlbumControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_behaves_as_expected()
    {
        $albums = Album::factory()->count(3)->has(Song::factory()->count(5))->create();

        $response = $this->get(route('album.index'));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'artist' => [
                        'name',
                        'image_path'
                    ],
                    'tracks' => [
                        '*' => [
                            'id',
                            'title',
                            'release_date'
                        ]
                    ],
                    'release_date',
                    'image_path'
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
            \App\Http\Controllers\AlbumController::class,
            'store',
            \App\Http\Requests\AlbumStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves()
    {
        $name = $this->faker->name;
        $artist = Artist::factory()->create();

        $response = $this->post(route('album.store'), [
            'name' => $name,
            'artist_id' => $artist->id,
        ]);

        $albums = Album::query()
            ->where('name', $name)
            ->where('artist_id', $artist->id)
            ->get();
        $this->assertCount(1, $albums);
        $album = $albums->first();

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'artist' => [
                    'name',
                    'image_path'
                ],
                // 'tracks' => [
                //     '*' => [
                //         'id',
                //         'title',
                //         'release_date'
                //     ]
                // ],
                'release_date',
                'image_path'
            ]
        ]);
    }


    /**
     * @test
     */
    public function show_behaves_as_expected()
    {
        $album = Album::factory()->create();

        $response = $this->get(route('album.show', $album));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'artist' => [
                    'name',
                    'image_path'
                ],
                'tracks' => [
                    '*' => [
                        'id',
                        'title',
                        'release_date'
                    ]
                ],
                'release_date',
                'image_path'
            ]
        ]);
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\AlbumController::class,
            'update',
            \App\Http\Requests\AlbumUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_behaves_as_expected()
    {
        $album = Album::factory()->create();
        $name = $this->faker->name;
        $artist = Artist::factory()->create();

        $response = $this->put(route('album.update', $album), [
            'name' => $name,
            'artist_id' => $artist->id,
        ]);

        $album->refresh();

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'artist' => [
                    'name',
                    'image_path'
                ],
                // 'tracks' => [
                //     '*' => [
                //         'id',
                //         'title',
                //         'release_date'
                //     ]
                // ],
                'release_date',
                'image_path'
            ]
        ]);

        $this->assertEquals($name, $album->name);
        $this->assertEquals($artist->id, $album->artist_id);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_responds_with()
    {
        $album = Album::factory()->create();

        $response = $this->delete(route('album.destroy', $album));

        $response->assertNoContent();

        $this->assertDeleted($album);
    }
}
