<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SongStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required', 'string'],
            'album_id' => ['required', 'integer', 'exists:albums,id'],
            'artist_id' => ['integer', 'exists:artists,id'],
            'track_no' => ['integer', 'gt:0'],
            'runtime' => ['integer', 'gt:0'],
            'release_date' => ['date'],
            'song_path' => ['string'],
        ];
    }
}
