<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Admin;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admin::all();

        return response($admins);
    }

    public function create()
    {

        if (!request('username') && !request('password')) {
            return response('Both fields are required');
        } elseif (!request('username') ?? !request('password')) {
            return response('You left one of the fields empty');
        } else {
            $newAdmin = new Admin();
            $newAdmin->username = request('username');
            $newAdmin->password = request('password');
            $newAdmin->save();
            return response('Admin was added successfully');
        }
    } 




    public function destroy($id) 
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response('des');
    }
    public function update($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->update(['username'=> request('username') ?? $admin->username]);
        $admin->update(['password'=> request('password' ?? $admin->password)]);

        return redirect('/api/admins');
    }
}
