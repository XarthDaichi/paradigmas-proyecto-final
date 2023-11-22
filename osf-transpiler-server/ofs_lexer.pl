/*
    ident -> [a-zA-Z0-9_$]
    number -> [+-]?[0-9][0-9]*
    boolean -> "true" | "false"
    string -> "'" [^']* "'"
    relational_operator -> "==" | "!=" | "<" | "<=" | ">" | ">="
    boolean_operator -> "&&" | "||"
    arith_operator -> "*" | "%" | "/" | "+" | "-"
*/

ident( id([I | RI]) ) --> ident_starter(I), ident_letters(RI).

% letters and accepted_chars
ident_starter(I) --> [X], {member(X, [36, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 95, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]), atom_codes(I, [X])}.

ident_letters([I | RI]) --> ident_char(I), ident_letters(RI).
ident_letters( [] ) --> [].

ident_char(I) --> ident_starter(I).
ident_char(D) --> decimal(D).


% numbers
number( num([S | Int]) ) --> sign(S), number_rest(Int).
number( num([D | Int]) ) --> decimal(D), number_rest(Int).

number_rest([D | Int]) --> decimal(D), number_rest(Int).
number_rest([]) --> [].

decimal(D) --> [X], {code_type(X, decimal), atom_codes(D, [X])}.
sign(S) --> [X], {member(X, [43, 45]), atom_codes(S, [X])}.

% boolean
boolean('true') --> "true".
boolean('false') --> "false".

% string
string( str(S) ) --> "'", string_content(S), "'".

string_content([C | RS]) --> any_char(C), string_content(RS).
string_content([]) --> [].

any_char(C) --> [X], {code_type(X, csym), atom_codes(C, [X])}.
any_char(C) --> [X], {code_type(X, prolog_symbol), atom_codes(C, [X])}.
any_char(C) --> [X], {code_type(X, space), atom_codes(C, [X])}.

% relational_operator
relational_operator( rel_opr('==') ) --> "==".
relational_operator( rel_opr('!=') ) --> "!=".
relational_operator( rel_opr('<') ) --> "<".
relational_operator( rel_opr('<=') ) --> "<=".
relational_operator( rel_opr('>') ) --> ">".
relational_operator( rel_opr('>=') ) --> ">=".

% boolean_operator
boolean_operator( bool_op('&&') ) --> "&&".
boolean_operator( bool_op('||') ) --> "||".

% arith_operator
arith_operator( arith_opr('*') ) --> "*".
arith_operator( arith_opr('%') ) --> "%".
arith_operator( arith_opr('/') ) --> "/".
arith_operator( arith_opr('+') ) --> "+".
arith_operator( arith_opr('-') ) --> "-".

% unary_operator
unary_operator( unary_opr('-') ) --> "-".
unary_operator( unary_opr('!') ) --> "!".

% whitespaces
spaces --> space, spaces.
spaces --> [].

space --> [X], {code_type(X, space)}.
space --> comment.

% comment
comment --> "//", comment_content, "\n".
comment --> "/*", comment_content, "*/".

comment_content --> any_char, comment_content.
comment_content --> [].

any_char --> [X], {code_type(X, csym)}.
any_char --> [X], {code_type(X, prolog_symbol)}.
any_char --> [X], {code_type(X, space)}.