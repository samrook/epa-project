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
class SearchControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_behaves_as_expected()
    {
        $title = $this->faker->sentence(3);
        $song = Song::factory()->create(['title' => $title]);

        $search = explode(' ', $title)[1];

        $response = $this->get(route('search', $search));

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
        $response->assertJsonFragment(['title' => $title]);
    }
}
