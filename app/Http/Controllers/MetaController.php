<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MetaField;

class MetaController extends Controller
{
    public function getMeta()
    {
        return MetaField::where('status', 'active')->get();
    }
}
