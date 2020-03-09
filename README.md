# Scalar

A guitar scale generator application.

TODO:  
[] Create user accounts
  [] As a logged in user, I should be able to:
    [] Save a scale to my favorites
    [] Create and save custom scales
    [] Save a scale to a group
    [] View my groups and their associated scales in a modal

BUGS:
  [X] Issues with tuning select
    [X] C Major Scale selected --> Select tuning from tuning select --> Selected notes: A# C C# D# F G
    [X] Drop D selected from tuning select --> C Major Scale selected --> Selected notes are correct, A-E strings show correct notes/frets, (dropped) D string shows A A# C D D# F G
    [X] Open C selected from tuning select --> C Major Scale selected --> all strings are wrong
  [X] Issues with tuning single strings
    [X] C Major Scale selected --> tune string 6 (E) to D --> Selected notes are correct (A B C D E F G), notes shown on changed string are correct, all other strings are wrong (A B C# D E F# G)
      [X] Selecting C Major Pentatonic from Compatible Scales shows correct notes
      