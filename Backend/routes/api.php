<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Admins API
Route::get('/admins', 'AuthController@index');
Route::delete('/admins/{id}', 'AuthController@destroy');
Route::put('/admins/{id}', 'AuthController@update');
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');

//Categories API
// Route::get('categories','CategoriesController@index');
// Route::get('categories/{id}','CategoriesController@show');
// Route::post('categories','CategoriesController@store');
// Route::put('categories/{id}','CategoriesController@update');
// Route::delete('categories/{id}','CategoriesController@destroy');
Route::resource('categories', 'CategoriesController');

//Income API
// Route::get('income','IncomeController@index');
// Route::get('income/{id}','IncomeController@show');
// Route::post('income','IncomeController@store');
// Route::put('income/{id}','IncomeController@update');
// Route::delete('income/{id}','IncomeController@destroy');
Route::resource('income', 'IncomeController');

//Expenses API
Route::resource('expenses', 'ExpensesController');

//Reports API
Route::get('reports/{times}', 'ReportsController@reports');

//Goals API
Route::resource('goals', 'GoalsController');
