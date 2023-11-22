:- [ofs_parser_final].
:- [ofs_utils_final].
:- [ofs_generator_final].
:- use_module(library(readutil)).

test_parser(Filename) :-
    read_file_to_codes(Filename, Codes, []),
    ofs_program(Ast, Codes, []), !,
    format('~n*** ~s was correctly parsed. Yay!!!', [Filename]),
    format('~n*** AST = ~q', [Ast]),
    purifier(Ast, AstWithoutNulls),
    format('~n*** AST purified = ~q', [AstWithoutNulls]),
    atomic_list_concat([Filename, mjs], '.', JSFilename),
    generator(JSFilename, AstWithoutNulls)
.

test_parser(Filename) :-
    format('~n*** ~s was NOT correctly parsed. Booooo!!!!', [Filename])
.

purifier(Ast, AstWithoutNulls) :-
    eliminate_null(Ast, AstWithoutNulls)
.