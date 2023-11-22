:- [ofs_parser].
:- [ofs_utils].
:- [ofs_generator].
:- use_module(library(readutil)).

parser_executor(Filename) :-
    read_file_to_codes(Filename, Codes, []),
    ofs_program(Ast, Codes, []), !,
    format('~n*** ~s was correctly parsed. Yay!!!', [Filename]),
    format('~n*** AST = ~q', [Ast]),
    purifier(Ast, AstWithoutNulls),
    format('~n*** AST purified = ~q', [AstWithoutNulls]),
    atomic_list_concat([Filename, mjs], '.', JSFilename),
    generator(JSFilename, AstWithoutNulls)
.

parser_executor(Filename) :-
    format('~n*** ~s was NOT correctly parsed. Booooo!!!!', [Filename])
.

purifier(Ast, AstWithoutNulls) :-
    eliminate_null(Ast, AstWithoutNulls)
.