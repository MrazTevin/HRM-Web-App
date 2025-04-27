<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramMetadataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_metadata', function (Blueprint $table) {
            // UUID as the primary key
            $table->uuid('id')->primary();

            // Foreign key for the program_id
            $table->uuid('program_id');

            // Fields for the metadata
            $table->string('duration');
            $table->string('department');
            $table->integer('max_capacity');
            $table->integer('current_enrollment');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('status');
            $table->decimal('cost', 8, 2);

            // Timestamps for created_at and updated_at
            $table->timestamps();

            // Foreign key constraint linking program_metadata to programs table
            $table->foreign('program_id')->references('id')->on('programs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('program_metadata');
    }
}
