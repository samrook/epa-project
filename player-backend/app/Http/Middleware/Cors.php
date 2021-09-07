<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $request->headers->set('Access-Control-Allow-Origin', '*');
        $request->headers->set('Access-Control-Allow-Headers', 'X-Requested-With, X-Auth-Token, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding, X-Login-Origin');
        $request->headers->set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

        return $next($request);
    }
}
