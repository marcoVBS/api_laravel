<?php

/**
 * Route::get('categories', 'Api\CategoryController@index');
 * Route::post('categories', 'Api\CategoryController@store');
 * Route::put('categories/{id}', 'Api\CategoryController@update');
 * Route::delete('categories/{id}', 'Api\CategoryController@destroy');
 */

/**
 * Chama todos os métodos padrão, como mostrado acima
 */
Route::resource('categories', 'Api\CategoryController');