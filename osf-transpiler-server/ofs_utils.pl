eliminate_null(program(SL), program(SLWithoutNulls)) :-
    eliminate_null_from_statementList(SL, SLWithoutNulls).

eliminate_null_from_statementList( [],  []).

eliminate_null_from_statementList( [null | SL], SLWithoutNulls) :- !,
    eliminate_null_from_statementList(SL, SLWithoutNulls)
.

eliminate_null_from_statementList( [S | SL], [S | SLWithoutNulls] ) :-
    eliminate_null_from_statementList(SL, SLWithoutNulls)
.