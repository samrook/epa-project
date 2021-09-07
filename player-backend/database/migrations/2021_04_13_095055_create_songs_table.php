<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->foreignId('album_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('artist_id')->nullable()->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->unsignedInteger('track_no')->nullable();
            $table->unsignedInteger('runtime')->nullable();
            $table->date('release_date')->nullable();
            $table->text('song_path')->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('songs');
    }
}
