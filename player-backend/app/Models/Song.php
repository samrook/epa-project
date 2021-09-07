<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property int $album_id
 * @property int $artist_id
 * @property int $track_no
 * @property int $runtime
 * @property \Carbon\Carbon $release_date
 * @property string $song_path
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin IdeHelperSong
 */
class Song extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'album_id',
        'artist_id',
        'track_no',
        'runtime',
        'release_date',
        'song_path',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'album_id' => 'integer',
        'artist_id' => 'integer',
        'track_no' => 'integer',
        'runtime' => 'integer',
        'release_date' => 'date',
    ];

    /**
     * The relationships that should be automatically loaded with this model.
     *
     * @var array
     */
    protected $with = [
        // 'album',
        // 'artist'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function playlists()
    {
        return $this->belongsToMany(\App\Models\Playlist::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function album()
    {
        return $this->belongsTo(\App\Models\Album::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function artist()
    {
        return $this->belongsTo(\App\Models\Artist::class);
    }
}
