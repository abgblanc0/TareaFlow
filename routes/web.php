<?php

use App\Http\Controllers\TaskListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/sendprop',function(){
    return Inertia::render('tst',["test"=>'ayudaa']);
})->name('sendprop');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {

    // Rutas de tableros
    Route::get('boards', [BoardController::class, 'index'])->name('boards');
    Route::get('boards/{board}', [BoardController::class, 'show'])->name('boards.show');
    Route::post('boards', [BoardController::class, 'store'])->name('boards.store');
    Route::delete('boards/{board}', [BoardController::class,'destroy'])->name('boards.destroy');

    // Ruta de listas
    Route::post('{board}/lists', [TaskListController::class, 'store'])->name('lists.store');
    Route::delete('lists/{taskList}', [TaskListController::class, 'destroy'])->name('lists.destroy');

    // Ruta de tareas
    Route::put('tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    Route::post('{taskList}/tasks', [TaskController::class, 'store'])->name('tasks.store');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
