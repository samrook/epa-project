<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property int $artist_id
 * @property \Carbon\Carbon $release_date
 * @property string $image_path
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin IdeHelperAlbum
 */
class Album extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'artist_id',
        'release_date',
        'image_path',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'artist_id' => 'integer',
        'release_date' => 'date',
    ];

    /**
     * The relationships that should be automatically loaded with this model.
     *
     * @var array
     */
    protected $with = [
        'artist',
        'songs'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function songs()
    {
        // specifying not to load artist relationship on song model to avoid recursive call error
        return $this->hasMany(\App\Models\Song::class)->without('artist')->orderBy('track_no');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function artist()
    {
        // specifying not to load albums or songs relationships on artist model to avoid recursive call error
        return $this->belongsTo(\App\Models\Artist::class)->without(['albums', 'songs']);
    }
}
