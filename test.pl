current_timestamp(Timestamp) :-
    get_time(Timestamp).

timestamp_diff(Timestamp1, Timestamp2, Diff) :-
    Diff is Timestamp2 - Timestamp1.

format_timestamp(Timestamp, DateTimeString) :-
    stamp_date_time(Timestamp, DateTime, local),
    format_time(atom(DateTimeString), '%Y-%m-%d %T', DateTime, posix).

current_timestamp(Timestamp1).
current_timestamp(Timestamp2).

% Calculate the difference between the two timestamps in seconds.
Diff is Timestamp2 - Timestamp1.

% Convert the difference to a human-readable string.
DiffString is format('%d seconds', [Diff]).

% Format the current timestamp as a human-readable string.
CurrentDateTimeString is format('%Y-%m-%d %T', [Timestamp2]).

% Display the results.
write('The difference between the two timestamps is: '), writeln(DiffString).
write('The current timestamp is: '), writeln(CurrentDateTimeString).