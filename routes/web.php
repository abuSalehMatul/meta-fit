<?php

use Illuminate\Support\Facades\Route;

Route::get('/home', 'HomeController@index');

// Auth::routes();


Route::get('shopify/auth/callback', 'HomeController@callback')->name('redirect_url');
Route::any('uninstall', 'HomeController@uninstall')->name('unistallation_hook');



Route::get('/getEmbedded','HomeController@getEmbedded');

Route::get('test', 'HomeController@test');