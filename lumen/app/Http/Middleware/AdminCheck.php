<?php

namespace App\Http\Middleware;

use App\Role;
use Closure;
use GenTux\Jwt\GetsJwtToken;

class AdminCheck
{
	use GetsJwtToken;

	public function handle($request, Closure $next)
	{
		$payload = $this->jwtPayload();
		
		if($payload['context']['role'] == Role::ADMIN) {
			return $next($request);
		} else {
			abort(401, 'Admin role required');
		}
	}
}
