<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['name' => 'saeedjurdi', 'password' => '12345'],
            ['name' => 'manal', 'password' => '12345678']
        ]);
    }
}
