<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncomeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('income', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('currency');
            $table->float('amount');
            $table->foreignId('category_id');
            $table->boolean('fixed_recurring');
            $table->date('starting_date');
            $table->date('finishing_date');
            $table->string('recurring_frequency');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('income');
    }
}
