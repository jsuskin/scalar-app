# Scalar

A guitar scale generator application.

## **How it Works:**

### **Header**

* As a user, I can change the app's color scheme by selected from the colored squares in the rightmost part of the header
* As a user, I can click on the app title in the leftmost part of the header to revert the display below back to its initial state
* As a user, I can click `Sign In` to the left of the scheme selection buttons to open the sign-in modal and log in or click `Register an account` to register an account.
  * Submitting either of these forms will create and store a JWT to local storage and give users greater feature access.
* As a user who is logged in, to the left of the scheme selection buttons, I will have access to three user options buttons: `Favorites`, `Groups`, and `Sign Out`.
  * Clicking `Favorites` will open a modal dropdown displaying a list of my favorite scales.
    * Selecting a scale from this list will display that scale onto the diagram below.
  * Clicking `Groups` will open a modal dropdown displaying a list of my groups.
    * Selecting a group from this list will display a modal in the center of the page listing all scales included in that group
      * Selecting a scale from this list will display that scale onto the diagram below.
      * Clicking outside of this modal will close the modal and the group's name will appear in the header between the app title and the list of user options.
        * Clicking the group name displayed in the header will re-open the group modal
  * Clicking `Sign Out` will remove the stored JWT from local storage and log the user out.

### **Content**

* As a user, I can click on the fretboard diagram to select individual frets.
  * A list of notes corresponding to the frets selected in the fretboard diagram will be shown beneath the diagram, in alphabetical order.
  * When frets corresponding to two or more different notes are selected on the fretboard diagram, a list of compatible scales will be shown above the scale selection dropdowns, with buttons on either side of the list, which can be used to view more entries.
  * When the fretboard is not empty, all users will see two buttons appear directly beneath the list of notes corresponding to the selected frets: `Fill Octaves` and `Clear Fretboard`
    * Clicking the `Fill Octaves` button will select every fret corresponding to the currently selected notes
    * Clicking `Clear Fretboard` will clear the fretboard and reset the selected scale to `None`
    * Logged in users will see two more buttons below these: `Save Scale` and `Add To Group`
      * If no scale preset is selected, clicking `Save Scale` will open a modal prompting the user to enter a name for the scale; clicking `Save Scale` will save the scale to the user's list of favorites.
      * Clicking `Add To Group` will open a modal prompting the user to select a group name from a list of the user's existing groups with the last option being `Custom`
        * Selecting `Custom` will render a text input in place of the dropdown in which I can enter the name of the group I want to create
        * Clicking `Save Scale To Group` will either save the new group with the current scale or add the current scale to an existing group
* As a user, I can click on frets selected on the fretboard diagram to deselect them from the fretboard
* As a user, I can click on individual notes in the list below the fretboard diagram to deselect all instances of that note from the fretboard.
* As a user, I can click on the fret numbers displayed just below the fretboard to highlight all selected notes along the corresponding fret.
* As a user, I can use the dropdowns above the scale diagram to select a tuning preset, select a scale preset, or select the selected scale's tonal key.
* As a user, I can click on a compatible scale to view that scale in the fretboard diagram.
* As a user, I can change the tuning of an individual string by selecting an option from its corresponding dropdown and the frets selected along that string will change their positions accordingly.
* As a user, I can tune all strings up by one half-step by clicking on the arrow above the individual string tuning dropdowns and I can tune all strings down by one half-step by clicking on the arrow below the dropdowns.
* As a user, I can press the arrow at the bottom left to go back to the most immediate previous state and I can press the arrow at the bottom right to revert back