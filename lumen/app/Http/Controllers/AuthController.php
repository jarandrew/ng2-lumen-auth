<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
use GenTux\Jwt\JwtToken;
use GenTux\Jwt\GetsJwtToken;

class AuthController extends Controller
{
    use GetsJwtToken;

    private $salt;
    public function __construct()
    {
        $this->salt = env('APP_SALT', "app_salt");
    }

    public function login(Request $request, JwtToken $jwt) {
      if ($request->has('email') && $request->has('password')) {
        $user = User:: where("email", "=", $request->input('email'))
                      ->where("password", "=", sha1($this->salt.$request->input('password')))
                      ->first();
        if ($user) {
          $token = $jwt->createToken($user);
          return response(['token' => $token->token(), 'user' => $user]);
        } else {
          return response(['error' => 'Incorrect email or password'], 404);
        }
      } else {
        return response(['error' => 'Required email and password'], 422);
      }
    }

    public function signup(Request $request, JwtToken $jwt) {
      if ($request->has('username') && $request->has('password') && $request->has('email')) {
        $user = User:: where("email", "=", $request->input('email'))->first();
        if($user) {
            return response(['error' => 'Your email has already been registered.'], 422);
        }
        else {
            $user = new User;
            $user->username=$request->input('username');
            $user->password=sha1($this->salt.$request->input('password'));
            $user->email=$request->input('email');
            $user->role=Role::MEMBER;

            if($user->save()){
                $token = $jwt->createToken($user);
                return response(['token' => $token->token(), 'user' => $user], 201);
            } else {
                return response(['error' => 'Failed to create user'], 404);
            }
        }
      } else {
        return response(['error' => 'Required username, email and password'], 422);
      }
    }
}