<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\User;
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
        $shared = $user->sharedBoards()->get();
        return Inertia::render('Boards/Index', [
            'boards' => $boards,
            'shared' => $shared
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

        $board = $request->user()->boards()->create($data);
        $board->users()->attach(auth()->id());
        return redirect()->back()->with('success', 'Tablero creado');
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board)
    {
        $this->authorize('view', $board);
        $board->load('lists.tasks.comments.user');
        $board->load('users');
        return Inertia::render('Boards/Show', [
            'board' => $board,
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

    public function addUser(Request $request, Board $board)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$board->users->contains($user->id)) {
            $board->users()->attach($user->id);
        }

        return back()->with('success', 'Colaborador añadido');
    }

    public function invite(Request $request, Board $board)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $data['email'])->first();

        // Evita duplicados
        if (!$board->users()->where('user_id', $user->id)->exists()) {
            $board->users()->attach($user->id);
        }

        return redirect()->back()->with('success', 'Usuario invitado');
    }

    public function reorder(Request $request, Board $board)
    {
        $data = $request->validate([
            'lists' => 'required|array',
        ]);

        foreach ($data['lists'] as $listData) {
            $list = $board->lists()->find($listData['id']);
            if ($list) {
                $list->update(['position' => $listData['position']]);
            }
        }

        return redirect()->back()->with('success', 'Listas reordenadas');
    }
}
