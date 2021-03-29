<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goals extends Model
{
    protected $table = 'goals';
    protected $fillable = [
        'yearly'
    ];
}
