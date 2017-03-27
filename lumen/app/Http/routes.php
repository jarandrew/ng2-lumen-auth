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

$app->post('login', 'UserController@login');

$app->post('signup', 'UserController@signup');

$app->group(['middleware' => 'jwt', 'namespace' => 'App\Http\Controllers'], function($app)  {
    $app->get('me', 'UserController@get');

		$app->get('customers', 'CustomerController@index');
		$app->post('customers', 'CustomerController@create');
		$app->get('customers/{id}', 'CustomerController@get');
		$app->patch('customers/{id}', 'CustomerController@update');
		$app->delete('customers/{id}', 'CustomerController@delete');
});