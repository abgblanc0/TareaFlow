<?php

namespace App\Http\Controllers;

use App\Models\TaskList;
use App\Models\Board;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board)
    {
        $lists = $board->lists()->get();
        return Inertia::render('Lists/Index', [
            'lists' => $lists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // Asignamos el board_id automáticamente
        $board->lists()->create($data);

        return redirect()->back()->with('success', 'Lista creada');
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskList $taskList)
    {
        return response()->json($taskList);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TaskList $taskList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskList $taskList)
    {
        $data = $request->validate([
            'title'=> 'required|string|max:255',
        ]);

        $taskList->update($data);
        return response()->json($taskList);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskList $taskList)
    {
        $taskList->delete();
        return redirect()->back()->with('success', 'Lista eliminada');
    }
}
