<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Article;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Lets truncate our existing records to start from scratch
        Article::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            Article::create([
                'title' => $faker->sentence(),
                'body' => $faker->paragraph(),
                'user_id' => $i+1
            ]);
        }
    }
}
