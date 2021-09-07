<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Artist;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\ArtistController
 */
class ArtistControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_behaves_as_expected()
    {
        $artists = Artist::factory()->count(3)->create();

        $response = $this->get(route('artist.index'));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'image_path',
                    'albums' => [
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
                    ],
                    'songs' => [
                        '*' => [
                            'id',
                            'title',
                            'release_date',
                            'runtime',
                            'track_no'
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
            \App\Http\Controllers\ArtistController::class,
            'store',
            \App\Http\Requests\ArtistStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves()
    {
        $name = $this->faker->name;

        $response = $this->post(route('artist.store'), [
            'name' => $name,
        ]);

        $artists = Artist::query()
            ->where('name', $name)
            ->get();
        $this->assertCount(1, $artists);
        $artist = $artists->first();

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
    public function show_behaves_as_expected()
    {
        $artist = Artist::factory()->create();

        $response = $this->get(route('artist.show', $artist));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'image_path',
                'albums' => [
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
                ],
                'songs' => [
                    '*' => [
                        'id',
                        'title',
                        'release_date',
                        'runtime',
                        'track_no'
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
            \App\Http\Controllers\ArtistController::class,
            'update',
            \App\Http\Requests\ArtistUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_behaves_as_expected()
    {
        $artist = Artist::factory()->create();
        $name = $this->faker->name;

        $response = $this->put(route('artist.update', $artist), [
            'name' => $name,
        ]);

        $artist->refresh();

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'image_path',
                'albums' => [
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
                ],
                'songs' => [
                    '*' => [
                        'id',
                        'title',
                        'release_date',
                        'runtime',
                        'track_no'
                    ]
                ]
            ]
        ]);

        $this->assertEquals($name, $artist->name);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_responds_with()
    {
        $artist = Artist::factory()->create();

        $response = $this->delete(route('artist.destroy', $artist));

        $response->assertNoContent();

        $this->assertDeleted($artist);
    }
}
