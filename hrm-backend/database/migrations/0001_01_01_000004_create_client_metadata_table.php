<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientMetadataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_metadata', function (Blueprint $table) {
            // Use UUID as the primary key
            $table->uuid('id')->primary();

            // Foreign key referencing clients table
            $table->uuid('client_id');
            
            // Other fields from your model
            $table->date('admission_date');
            $table->string('department');
            $table->string('diagnosis');
            $table->string('status');
            $table->string('contact');
            $table->string('email');
            $table->text('address');
            $table->string('insurance_provider');
            $table->string('insurance_number');

            // Timestamps for created_at and updated_at
            $table->timestamps();

            // Foreign key constraint to the clients table
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_metadata');
    }
}
