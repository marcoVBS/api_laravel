<?php

/**
 * Route::get('categories', 'Api\CategoryController@index');
 * Route::get('categories/{id}', 'Api\CategoryController@show');
 * Route::post('categories', 'Api\CategoryController@store');
 * Route::put('categories/{id}', 'Api\CategoryController@update');
 * Route::delete('categories/{id}', 'Api\CategoryController@destroy');
 */

/**
 * Chama todos os métodos padrão para categories, como mostrado acima
 */
Route::apiResource('categories', 'Api\CategoryController');

/**
 * Chama todos os métodos padrão para categories, como mostrado acima
 */
Route::apiResource('products', 'Api\ProductController');