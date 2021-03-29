<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response($users, 200);
    }

    public function register(Request $request)
    {
        if (!request('name') && !request('password')) {
            return response()->json(['status' => 'Both fields are required']);
        } elseif (!request('name') || !request('password')) {
            return response()->json(['status' => 'One of the fields was left empty']);
        } else {
            $check = User::where(['name' => request('name')])->get();
            if (empty($check[0]->name)) {
                $user = User::create([
                    'name' => $request->name,
                    'password' => $request->password,
                ]);
                $token = auth()->login($user);
                return response()->json(['token' =>$this->respondWithToken($token),'status'=>"Admin was added successfully !",'code' => 200]);
            } else {
                return response()->json(['status' => 'Admin with this username already exists !']);
            }
        }

    }

    public function login()
    {
        $credentials = request(['name', 'password']);

        error_log('start');
        error_log(request('name'));
        error_log(request('password'));
        error_log('end');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expire_in' => auth()->factory()->getTTL() * 60,
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response('Admin deleted successfully');
    }

    public function update($id)
    {
        $admin = User::findOrFail($id);
        $checkAdmin = User::where(['name' => request('name')])->get();
        if (empty(request('name')) && empty(request('password'))) {
            return response()->json(['msg' => 'No new information was entered', 'status' => 404]);
        } else {
            if (empty($checkAdmin[0]->name)) {
                error_log($admin->name);
                error_log($admin->password);
                error_log(request('name'));
                error_log(request('password'));
                $admin->update(['name' => request('name') ?? $admin->name]);
                $admin->update(['password' => request('password') ?? $admin->password]);
                $credentials = request(['name', 'password']);
                $token = auth()->attempt($credentials);
                return response()->json(['msg' => 'User was edited successfully', 'status' => 200, 'token' => $this->respondWithToken($token)]);
            } else {
                return response()->json(['msg' => 'User with this username already exists', 'status' => 404]);
            }
        }
    }

}