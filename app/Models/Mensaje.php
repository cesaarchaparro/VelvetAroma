<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    protected $fillable = ['nombre', 'telefono', 'email', 'mensaje'];
}
