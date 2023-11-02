/*
 Demo for consuming service from prolog
author: loriacarlos@gmail.com
since: 2023
*/
:- use_module(library(http/http_client)).


post(Reply) :-
       http_post('http://localhost:8000/add', 
                 atom('application/json', '{"a":10, "b":666}'), 
                 Reply, 
                 [method(post)]
                 )
.

:- initialization
     post(Reply),
     writeln(Reply),
     halt
.
