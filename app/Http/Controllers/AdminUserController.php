<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;

class AdminUserController extends Controller
{
    public function index() {
        $users = User::paginate(10);

        return Inertia::render('Admin/Index', [
            'users' => $users,
        ]);
    }

    public function destroy(User $user) {
        if (auth()->id() == $user->id) {
            abort(403, "No puedes borrarte");
        }
        $user->delete();

        return redirect()->back()->with("success","Usuario borrado");
    }
}
