<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use GenTux\Jwt\JwtToken;
use GenTux\Jwt\GetsJwtToken;

class UserController extends Controller
{
    use GetsJwtToken;

    private $salt;
    public function __construct()
    {
        $this->salt="userloginregister";
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
        $user = new User;
        $user->username=$request->input('username');
        $user->password=sha1($this->salt.$request->input('password'));
        $user->email=$request->input('email');
        if($user->save()){
          $token = $jwt->createToken($user);
          return response(['token' => $token->token(), 'user' => $user], 201);
        } else {
          return response(['error' => 'Failed to create user'], 404);
        }
      } else {
        return response(['error' => 'Required username, email and password'], 422);
      }
    }

    public function get() {
      $token = $this->jwtToken();
      $email = $token->payload('context.email');

      $user = User:: where("email", "=", $email)->first();
      if ($user) {
        return response(['user' => $user]);
      } else {
        return response(['error' => 'User not found'], 404);
      }
    }
}