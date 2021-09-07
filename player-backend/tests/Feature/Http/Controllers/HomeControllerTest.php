<?php

namespace Tests\Feature\Http\Controllers;

use Tests\TestCase;

/**
 * @see \App\Http\Controllers\HomeController
 */
class HomeControllerTest extends TestCase
{
    /**
     * @test
     */
    public function index_redirects()
    {
        $response = $this->get(route('home'));

        $response->assertRedirect(route('song.index'));
    }
}
