<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('meta-fields', 'MetaController@getMeta');
Route::get('get-product', 'ProductController@getProduct');
Route::get('get-app-product', 'ProductController@getAppProduct');
Route::post('update-meta', 'ProductController@updateMeta');
Route::post('delete-meta', 'ProductController@deleteMeta');