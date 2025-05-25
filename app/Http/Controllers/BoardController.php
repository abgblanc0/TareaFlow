<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class BoardController extends Controller
{
    use AuthorizesRequests;
    /**
     * Muestra todos los boards del usuario
     */
    public function index()
    {
        $user = auth()->user();
        $boards = $user->boards()->get();

        return Inertia::render('Boards/Index', [
            'boards' => $boards,
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
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $request->user()->boards()->create($data);
        return redirect()->route('boards');
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board)
    {
        $this->authorize('view', $board);
        $board->load('lists.tasks');
        return Inertia::render('Boards/Show', [
            'board'=> $board,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Board $board)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Board $board)
    {
        $this->authorize('update', $board);
        $data = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
        ]);

        $board->update($data);
        return response()->json($board);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board)
    {
        $this->authorize('delete', $board);
        $board->delete();
        return redirect()->route('boards');
    }
}
