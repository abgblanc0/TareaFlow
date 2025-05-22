<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Board;   
use App\Models\TaskList;
use App\Models\Task;

class BoardSeeder extends Seeder
{
    public function run()
    {
        Board::factory()->count(3)->create()->each(function ($board) {
            $board->lists()->saveMany(TaskList::factory()->count(4)->make())->each(function ($lista) {
                $lista->tasks()->saveMany(Task::factory()->count(3)->make());
            });
        });
    }
}
