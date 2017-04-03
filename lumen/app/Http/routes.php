<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->post('login', 'AuthController@login');

$app->post('signup', 'AuthController@signup');

$app->group(['middleware' => 'jwt', 'namespace' => 'App\Http\Controllers'], function($app)  {
    /* Profile API */
    $app->get('me', 'UserController@getProfile');
    $app->post('me', 'UserController@saveProfile');

    /* Admin API */
    $app->group(['middleware' => 'checkAdmin', 'namespace' => 'App\Http\Controllers'], function($app) {
        /* Users API */
        $app->get('users', 'UserController@index');
        $app->post('users', 'UserController@create');
        $app->get('users/{id}', 'UserController@get');
        $app->patch('users/{id}', 'UserController@update');
        $app->delete('users/{id}', 'UserController@delete');

        /* Customers API */
        $app->get('customers', 'CustomerController@index');
        $app->post('customers', 'CustomerController@create');
        $app->get('customers/{id}', 'CustomerController@get');
        $app->patch('customers/{id}', 'CustomerController@update');
        $app->delete('customers/{id}', 'CustomerController@delete');
    });
});