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
        Schema::table('dropout_repeaters', function (Blueprint $table) {
            if (Schema::hasColumn('dropout_repeaters', 'dropout_rate')) {
                $table->dropColumn('dropout_rate');
            }
            if (Schema::hasColumn('dropout_repeaters', 'repeater_rate')) {
                $table->dropColumn('repeater_rate');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dropout_repeaters', function (Blueprint $table) {
            $table->decimal('dropout_rate', 5, 2)->default(0);
            $table->decimal('repeater_rate', 5, 2)->default(0);
        });
    }
};
