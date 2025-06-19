<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\TaskListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CalendarController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/sendprop', function () {
    return Inertia::render('tst', ["test" => 'ayudaa']);
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
    Route::delete('boards/{board}', [BoardController::class, 'destroy'])->name('boards.destroy');
    Route::post('boards/{board}/invite', [BoardController::class, 'invite'])->name('boards.invite');
    Route::put('boards/{board}/reorderLists', [BoardController::class, 'reorderLists'])->name('boards.reorderLists');
    Route::put('boards/{board}/reorderTasks', [BoardController::class, 'reorderTasks'])->name('boards.reorderTasks');

    // Ruta de listas
    Route::post('{board}/lists', [TaskListController::class, 'store'])->name('lists.store');
    Route::delete('lists/{taskList}', [TaskListController::class, 'destroy'])->name('lists.destroy');

    // Ruta de tareas
    Route::put('tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    Route::post('{taskList}/tasks', [TaskController::class, 'store'])->name('tasks.store');

    // Ruta de comentarios
    Route::post('tasks/{task}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    Route::get('calendar', [CalendarController::class, 'index'])->name('calendar');
});


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('admin.users');
    Route::delete('admin/users/{user}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
