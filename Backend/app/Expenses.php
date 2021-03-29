<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    protected $table = 'expenses';
    protected $fillable = [
        'title', 'description', 'currency', 'amount', 'category_id', 'fixed_recurring', 'starting_date', 'finishing_date', 'recurring_frequency'
    ];
}
