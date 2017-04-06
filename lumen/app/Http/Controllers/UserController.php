<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
use GenTux\Jwt\JwtToken;
use GenTux\Jwt\GetsJwtToken;
use Validator;

class UserController extends Controller
{
    use GetsJwtToken;

    private $salt;
    public function __construct(User $user)
    {
        $this->user = $user;
        $this->salt = env('APP_SALT', "app_salt");
    }

    public function getProfile() {
      $token = $this->jwtToken();
      $email = $token->payload('context.email');

      $user = User:: where("email", "=", $email)->first();
      if ($user) {
        return response(['user' => $user]);
      } else {
        return response(['error' => 'User not found'], 404);
      }
    }

    public function saveProfile(Request $request, JwtToken $jwt) {
      $token = $this->jwtToken();
      $email = $token->payload('context.email');

      $user = User:: where("email", "=", $email)->first();
      if ($user) {
        $user2 = User:: where("email", "=", $request->input('email'))->where("id", "!=", $user->id)->first();
        if($user2) {
            return response(['error' => 'Your email has already been registered.'], 422);
        }
        else {
          $user->username = $request->input('username');
          $user->email = $request->input('email');
          if($user->save()){
            $token = $jwt->createToken($user);
            return response(['token' => $token->token(), 'user' => $user]);
          } else {
            return response(['error' => 'Failed to save profile'], 404);
          }
        }
      } else {
        return response(['error' => 'User not found'], 404);
      }
    }

    public function index() {
        $users = $this->user->query()->get();
        return response($users);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required'
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors()->all()], 422);
        }
        $user = User:: where("email", "=", $request->input('email'))->first();
        if($user) {
            return response(['error' => 'User email has already been registered.'], 422);
        }
        else {
          $role = $request->input('role') ? $request->input('role') : Role::MEMBER;
          $user = new $this->user;
          $user->username = $request->input('username');
          $user->email = $request->input('email');
          $user->role = $role;
          $user->password = sha1($this->salt.$request->input('password'));
          $user->save();
          
          return response($user, 201);
        }
    }

    public function get($id) {
        $user = $this->user->query()->find($id);
        if($user) {
            return response($user);
        }
        else {
            return response(['error' => 'Not found user for ID '. $id], 404);
        }
    }

    public function update(Request $request, $id) {
        $user = $this->user->query()->find($id);
        if($user) {
            $validator = Validator::make($request->all(), [
                'username' => 'required',
                'email' => 'required'
            ]);
            if ($validator->fails()) {
                return response(['error' => $validator->errors()->all()], 422);
            }
            $user2 = User:: where("email", "=", $request->input('email'))->where("id", "!=", $id)->first();
            if($user2) {
                return response(['error' => 'User email has already been registered.'], 422);
            }
            else {
              $role = $request->input('role') ? $request->input('role') : Role::MEMBER;
              $user->username = $request->input('username');
              $user->email = $request->input('email');
              $user->role = $role;
              if($request->input('password')) {
                  $user->password = sha1($this->salt.$request->input('password'));
              }
              $user->save();

              return response($user);
            }
        }
        else {
            return response(['error' => 'Not found user for ID '. $id], 404);
        }
    }

    public function delete($id) {
        $user = $this->user->query()->find($id);
        if($user) {
            $this->user->query()->findOrFail($id)->delete();
            return response(['id' => $id]);
        }
        else {
            return response(['error' => 'Not found user for ID '. $id], 404);
        }
    }
}