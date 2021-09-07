<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;

class SongFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Song::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(4),
            'album_id' => Album::factory(),
            'artist_id' => Artist::factory(),
            'track_no' => $this->faker->randomNumber(),
            'runtime' => $this->faker->randomNumber(),
            'release_date' => $this->faker->date(),
            'song_path' => $this->faker->text,
        ];
    }
}
