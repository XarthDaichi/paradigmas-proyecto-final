:- [ofs_parser].
:- [ofs_utils].
:- [ofs_generator].
:- use_module(library(readutil)).

parser_executor(Filename) :-
    read_file_to_codes(Filename, Codes, []),
    ofs_program(Ast, Codes, []), !,
    purifier(Ast, AstWithoutNulls),
    atomic_list_concat([Filename, mjs], '.', JSFilename),
    generator(JSFilename, AstWithoutNulls)
.

purifier(Ast, AstWithoutNulls) :-
    eliminate_null(Ast, AstWithoutNulls)
.