<?php

use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            ['category_name' => 'Salary'],
            ['category_name' => 'Sales'],
            ['category_name' => 'Interest'],
            ['category_name' => 'Accounts Receivable'],
            ['category_name' => 'Stocks Fairs'],
            ['category_name' => 'Return on Investment']
        ]);
    }
}
