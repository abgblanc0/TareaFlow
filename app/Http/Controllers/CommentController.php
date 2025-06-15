<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Task $task)
    {
        $comments = $task->comments()->get();
        return response()->json($comments);
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
    public function store(Request $request, Task $task)
    {
        $data = $request->validate(['content' => 'required|string']);

        $task->comments()->create([
            'content' => $data['content'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Comentario creado');
    }


    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $data = $request->validate(['content' => 'required|string']);
        $comment->update($data);
        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        // (opcional) puedes verificar si el usuario es el dueño o es admin
        if (auth()->id() !== $comment->user_id && !auth()->user()?->is_admin) {
            abort(403);
        }

        $comment->delete();

        return redirect()->back()->with('success', 'Comentario eliminado');
    }

}
