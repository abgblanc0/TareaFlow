<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Board;
use App\Models\TaskList;
use App\Models\Task;

class BoardSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();

        Board::factory()
            ->count(3)
            ->for($user)
            ->has(
                TaskList::factory()
                    ->count(3)
                    ->state(new Sequence(
                        ['position' => 0],
                        ['position' => 1],
                        ['position' => 2],
                    ))
                    ->has(
                        Task::factory()
                            ->count(5)
                            ->state(new Sequence(
                                ['position' => 0],
                                ['position' => 1],
                                ['position' => 2],
                                ['position' => 3],
                                ['position' => 4],
                            )),
                        'tasks'
                    ),
                'lists'
            )
            ->create();
    }
}
