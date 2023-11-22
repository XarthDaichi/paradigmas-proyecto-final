:- [ofs_lexer_final].

/*
/////////////////////////////////////// SOBRE WHITESPACES /////////////////////////
Se asumen whitespaces eliminables de la manera usual: espacio en blanco, tab, \n \r
El lexer los ignora cuando deba para diferenciar tokens
Deben ser respetados en el caso especial de string (Ejemplo 'hola\nque tal\t' se conservan)
Hay comentarios los cuales el lexer elimina. Pueden ser de una línea o multlínea (estilo JS)

///////////////////////////////// SOBRE PRECEDENCIAS IMPLICITAS ///////////////////////
 * Orden por precedencias de operadores es, en general :
 flecha < pipe < booleano < relacional < aritmetico < parentizado
 La precedencia es transitiva

 * El operador >> asocia izquierda
 * Ejemplo
 x >> y >> z se lee (x >> y) >> z

 * El operador flecha -> tiene menos precedencia que operador pipe <<
 Ejemplo
 x -> y >> z se lee x -> (y >> z)

 * El operador >> es de menor prioridad que los booleanos
 Ejemplo
 x >> y || z se lee x >> (y || z)

 * Los operadores booleanos || y && tienen menor precedencia que los relacionales y || menos que && menos que !
 Ejemplo
 a || x != y && z se lee a || ((x != y) && z)

 * Los relacionales, =, ==, != <= tienen menor precedencia que los aritméticos (todos tienen igual precedencia)
 Ejemplo
 x = x + y == x * y + 1 se lee como (x = (x + y)) == ((x * y) + 1)

 * Los aritméticos + - (igual precedencia) menos que * y / % (igual precedencia) todos menos que ** este menos que - unario
 - x ** 2 + 3/4 se lee ((- x) ** 2) + (3 / 4)

/////////////////////////// GRAMMAR ////////////////////////////////////
 ofs_program -> import_statement* (statement)*

 import_statement -> "import" imported_symbols "from" string
 imported_symbols -> "{" ident (",", ident)* "}" | ident

 statement -> declaration | expression | empty

 declaration -> let_declaration | const_declaration

 empty -> ";"

 let_declaration -> "let" ident ("=" expression)?
 const_declaration -> "const" ident ("=" expression)?

 expression -> pipe_expression

 pipe_expression -> ofs_expression (">>" ofs_expression)*

 ofs_expression -> iterate_expression
                    | map_expression
                    | filter_expression
                    | cut_expression
                    | es6_expression

 iterate_expression -> "[*" expression "," expression "]"

 map_expression -> "[>" expression "]"

 filter_expression -> "[?" expression "]"

 cut_expression -> "[!" expression "]"

 es6_expression -> boolean_expression
                    | lambda_expression
                    | conditional_expression

 boolean_expression -> relational_expression ( boolean_operator relational_expression)*

 relational_expression -> arith_expression (relational_operator arith_expression)*

 conditional_expression -> relational_expression "?" expression ":" expression

 arith_expression -> factor_expression (arith_operator factor_expression)*

 factor_expression -> literal_expression
                        |simple_expression
                        | unary_expresion
                        | parenthesis_expression

 literal_expression -> number | string | boolean

 simple_expression -> qualifiable_id ( ( "=" expression) | args_expression )?

 unary_expression -> ("-" | "!") expression

 parenthesis_expression -> "(" expression ")"

 qualifiable_id -> access_expression ("." access_expression)*

 args_expression -> "(" ( expression ("," expression)* )? ")"

 access_expression -> ident | "[" expression "]"

 array_expression -> "[" (expression ("," expression))? "]" ( "+" expression)*

 lambda_expression -> params_expression "->" expression

 params_expression -> ident | "(" (ident ("," ident)*) ")"
*/

ofs_program( program([ISL, SL]) ) --> import_statement_list(ISL), statement_list(SL).

% imports
import_statement_list( [Import | ISL] ) --> import_statement(Import), import_statement_list(ISL).
import_statement_list( [] ) --> [].

import_statement( import(I, Path) ) --> spaces, "import", spaces, imported_symbols(I), spaces, "from", spaces, string(Path), spaces.

imported_symbols( symbols([I | RI]) ) --> "{", spaces, ident(I), spaces, imported_symbols_rest(RI), spaces, "}".
imported_symbols( symbols([I]) ) --> ident(I).

imported_symbols_rest( [I, RI] ) --> ",", spaces, ident(I), spaces, imported_symbols_rest(RI).
imported_symbols_rest( [] ) --> [].

% statements
statement_list( [S | SL] ) --> statement(S), statement_list(SL).
statement_list( [] ) --> [].

statement( D ) --> spaces, declaration(D), spaces.
statement( E ) --> spaces, expression(E), spaces.
statement( null ) --> spaces, empty, spaces.

% declarations
declaration( LetD ) --> let_declaration(LetD).
declaration( ConstD ) --> const_declaration(ConstD).

let_declaration( let(I, RD) ) --> spaces, "let", spaces, ident(I), spaces, right_declaration(RD).
const_declaration( const(I, RD) ) --> spaces, "const", spaces, ident(I), spaces, right_declaration(RD).

right_declaration(E) --> spaces, "=", spaces, expression(E).
right_declaration( undefined ) --> [].

% expressions
expression(PE) --> pipe_expression(PE).

%% pipe_expressions
pipe_expression( [OE | PER] ) --> ofs_expression(OE), pipe_expression_rest(PER).

pipe_expression_rest( [OE | PER] ) --> spaces, ">>", spaces, ofs_expression(OE), spaces, pipe_expression_rest(PER).
pipe_expression_rest( [] ) --> [].

%% ofs_expressions
ofs_expression(iterate_expr(IE)) --> iterate_expression(IE).
ofs_expression(map_expr(ME)) --> map_expression(ME).
ofs_expression(filter_expr(FE)) --> filter_expression(FE).
ofs_expression(cut_expr(CE)) --> cut_expression(CE).
ofs_expression(es6_expr(EE)) --> es6_expression(EE).

iterate_expression([starting_value(Left), iterator(Right)]) --> "[*", spaces, expression(Left), spaces, ",", spaces, expression(Right), spaces, "]".

map_expression(mapper(E)) --> "[>", spaces, expression(E), spaces, "]".

filter_expression(filter(E)) --> "[?", spaces, expression(E), spaces, "]".

cut_expression(cut(E)) --> "[!", spaces, expression(E), spaces, "]".

%%% es6_expressions 
es6_expression(boolean_expr(BE)) --> boolean_expression(BE).
es6_expression(lambda_expr(LE)) --> lambda_expression(LE).
es6_expression(conditional_expr(CE)) --> conditional_expression(CE).
es6_expression(array_expr(AE)) --> array_expression(AE).

%%%% boolean_expressions
boolean_expression([RE | RBE]) --> spaces, relational_expression(RE), spaces, boolean_expression_rest(RBE).

boolean_expression_rest([BO, RE | RBE]) --> spaces, boolean_operator(BO), spaces, relational_expression(RE), spaces, boolean_expression_rest(RBE).
boolean_expression_rest([]) --> [].

%%%%% relational_expressions
relational_expression([AE | RRE]) --> spaces, arith_expression(AE), spaces, relational_expression_rest(RRE).

relational_expression_rest([RO, AE | RRE]) --> spaces, relational_operator(RO), spaces, arith_expression(AE), spaces, relational_expression_rest(RRE).
relational_expression_rest([]) --> [].

%%%% conditional_expressions
conditional_expression([RE, true_then(TE), false_then(FE)]) --> spaces, relational_expression(RE), spaces, "?", spaces, expression(TE), spaces, ":", expression(FE).

%%%% arith_expressions
arith_expression(arith_expr([FE | RAE])) --> spaces, factor_expression(FE), spaces, arith_expression_rest(RAE).

arith_expression_rest([AO, FE | RAE]) --> spaces, arith_operator(AO), spaces, factor_expression(FE), spaces, arith_expression_rest(RAE).
arith_expression_rest([]) --> [].

%%%%% factor_expressions
factor_expression(literal_expr(LE)) --> literal_expression(LE).
factor_expression(simple_expr(SE)) --> simple_expression(SE).
factor_expression(unary_expr(UE)) --> unary_expression(UE).
factor_expression(parenthesis_expr(PE)) --> parenthesis_expression(PE).

%%%%%% literal_expressions
literal_expression(N) --> spaces, number(N), spaces.
literal_expression(S) --> spaces, string(S), spaces.
literal_expression(B) --> spaces, boolean(B), spaces.

%%%%%% simple_expressions
simple_expression([QI | RSE]) --> spaces, qualifiable_id(QI), spaces, simple_expression_right(RSE).

simple_expression_right(assign(E)) --> spaces, "=", spaces, expression(E).
simple_expression_right(AE) --> spaces, args_expression(AE), spaces.
simple_expression_right(null) --> [].

%%%%%% unary_expressions
unary_expression([UO | E]) --> spaces, unary_operator(UO), spaces, expression(E).

%%%%%% parenthesis_expression
parenthesis_expression(E) --> "(", spaces, expression(E), spaces, ")".

%%%%%%% qualifiable_ids
qualifiable_id(quali_id([AE | RQI])) --> spaces, access_expression(AE), spaces, qualifiable_id_rest(RQI).

qualifiable_id_rest([AE | RQI]) --> spaces, ".", spaces, access_expression(AE), qualifiable_id_rest(RQI).
qualifiable_id_rest([]) --> [].

%%%%%%% args_expressions
args_expression(args_expr(AEC)) -->"(", spaces, args_expression_contents(AEC), spaces, ")".

args_expression_contents([E | RAEC]) --> spaces, expression(E), spaces, args_expression_contents_rest(RAEC).
args_expression_contents([]) --> [].

args_expression_contents_rest([E | RAEC]) --> ",", spaces, expression(E), spaces, args_expression_contents_rest(RAEC).
args_expression_contents_rest([]) --> [].

%%%%%%%% access_expressions
access_expression(access_expr([I])) --> spaces, ident(I), spaces.
access_expression(access_expr([E | MAE])) --> "[", spaces, expression(E), spaces, "]", access_expression_more(MAE).

access_expression_more([E | MAE]) --> "[", spaces, expression(E), spaces, "]", access_expression_more(MAE).
access_expression_more([]) --> [].

%%%% lambda_expression
lambda_expression([variables(PE), lambda(E)]) --> spaces, params_expression(PE), spaces, "->", spaces, expression(E).

%%%%% params_expressions
params_expression([I]) --> spaces, ident(I), spaces.
params_expression([I | RPE]) --> spaces, "(", spaces, ident(I), spaces, params_expression_rest(RPE), spaces, ")".

params_expression_rest([I | RPE]) --> spaces, ",", spaces, ident(I), spaces, params_expression_rest(RPE).
params_expression_rest([]) --> [].

%%%% array_expressions
array_expression([contents(AC), operation(AO)]) --> spaces, "[", spaces, array_contents(AC), spaces, "]", spaces, array_operation(AO).

array_contents([E | RAC]) --> spaces, expression(E), spaces, array_contents_rest(RAC).

array_contents_rest([E | RAC]) --> spaces, ",", spaces, expression(E), spaces, array_contents_rest(RAC).
array_contents_rest([]) --> [].

array_operation([E | AO]) --> spaces, "+", spaces, expression(E), spaces, array_operation(AO).
array_operation([]) --> [].

% empty
empty --> spaces, ";", spaces.