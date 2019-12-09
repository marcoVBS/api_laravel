<?php
use Illuminate\Support\Facades\Route;

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
Route::get('categories/{id}/products', 'Api\CategoryController@products');

/**
 * Chama todos os métodos padrão para categories, como mostrado acima
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

});