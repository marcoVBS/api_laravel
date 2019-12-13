<?php
use Illuminate\Support\Facades\Route;

/**
 * Chama todos os métodos padrão resource para categories
 */
Route::apiResource('categories', 'Api\CategoryController');
Route::get('categories/{id}/products', 'Api\CategoryController@products');

/**
 * Chama todos os métodos padrão resource para produtos
 */
Route::apiResource('products', 'Api\ProductController');

/**
 * Exemplo: Versionamento de rotas de API
 * Interessante mover os controllers para uma pasta v1 dentro da pasta Api
 */

// Route::group(['prefix' => 'v1'], function () {
//     Route::apiResource('categories', 'Api\CategoryController');
//     Route::get('categories/{id}/products', 'Api\CategoryController@products');
    
//     Route::apiResource('products', 'Api\ProductController');
// });

/**
 * Autenticação JWT
 */
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'Auth\AuthApiController@login');
    Route::post('logout', 'Auth\AuthApiController@logout');
    Route::post('refresh', 'Auth\AuthApiController@refresh');
    Route::get('me', 'Auth\AuthApiController@me');

    Route::post('register', 'Auth\AuthApiController@register');
    Route::put('update', 'Auth\AuthApiController@update');
});