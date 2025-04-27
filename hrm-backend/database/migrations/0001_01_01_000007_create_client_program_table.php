<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientProgramTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_program', function (Blueprint $table) {
            // Foreign keys for clients and programs (both UUIDs)
            $table->uuid('client_id');
            $table->uuid('program_id');

            
            $table->timestamp('enrolled_at')->nullable();

            // Timestamps for the pivot table
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('program_id')->references('id')->on('programs')->onDelete('cascade');

            // Primary key for the pivot table is a combination of client_id and program_id
            $table->primary(['client_id', 'program_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_program');
    }
}
