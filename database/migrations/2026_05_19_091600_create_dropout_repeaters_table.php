<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dropout_repeaters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_year_id')->constrained('school_years')->cascadeOnDelete();
            $table->string('grade_level');
            $table->unsignedInteger('dropouts')->default(0);
            $table->unsignedInteger('repeaters')->default(0);
            $table->unsignedInteger('total_students')->default(0);
            $table->decimal('dropout_rate', 5, 2)->default(0);
            $table->decimal('repeater_rate', 5, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dropout_repeaters');
    }
};
