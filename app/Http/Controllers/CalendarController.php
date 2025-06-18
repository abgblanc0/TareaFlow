<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;

class CalendarController extends Controller
{
    public function index()
    {
        $tasks = auth()->user()
            ->boards()
            ->with('lists.tasks')
            ->get()
            ->pluck('lists')
            ->flatten()
            ->pluck('tasks')
            ->flatten()
            ->filter(fn($task) => $task->due_date)
            ->values();

        $tasks = Task::with(['comments.user'])->whereNotNull('due_date')->get();
        return Inertia::render('CalendarPage', [
            'tasks' => $tasks,
        ]);
    }

}
