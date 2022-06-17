Technical requirements:

    1. Should display game in browser
    2. Should have two players or obstacles
    3. Should have a logical winning goal
    4. Display when the player win or losses
    5. Include:
        - HTML
        - CSS
        - JS
    6. Should have the priniples:
        -KISS = Keep It Simple Stupid
        -DRY = Dont Reapet Yourself
    7. Use the JS to do DOM manipulation
    8. Should deploy online and be able to be playeble by other playes online
    9. Semantic markup for HTML and CSS

Game: Gladiator - Modern Era

Type: 2d platform, Canvas

User Story:

    1. Have a Title page with a "Enter arena" button
    2. Background should simulate a desert or arena from Greece
    3.Pressing the start button takes you to main menu
    4. Main menu shows 2 buttons:
        -Play as Gladiator button -> allows th eplayer to play as a human and defeat the enemies
        -Play as Lion Button -> allows the player to play as the Lion and defeat the humans
    5. Depending of the choice of the player should take you to the level and start the game.
    6. The player should survive a certain amount of time to win
    7. If the player health goes to 0 before the time, "Game Over"
    8. Only 3 level should happen
    9. If the player choosed the human and wins the game a "freedom" message should appear
    10. If player choosed the Lion and wins the game should show a "Stomach is full" 
    11. After winning and the winning message appears a button to go back to main menu and refresh the game

Game Mechanics:

    1. Goal:
        -Stay alive the amount of time to win the level
        -Final level will be more time and the enemies will move faster

    2. Player Character:
        - Should move up, down, left and right around the whole gaming canvas
        -Depending on the character:
            -Human = Moves average, normal health , should show spear in front, deals damage in front only, Takes damage from behind and sides
            -Lion = moves slight faster, better health, deals damage in front , takes damge from side and behind
            - Health should go down 5 or 10 at a time when hit

    3. Enemies:
        - Enemies should appears from all over the borders of the canvas and move towards the player
         - Have diferent dificulty of enemies
            -Difficulty(at least 2):
                -Easy = 2 shots to kill
                -Hard = 3 or more to kill
        - Dissapear when hit at according kill rate

    4. Player Death:
        - Should display an "Game Over" message
        - Display according buttons
        - Display the time reached in level

Feature adding and upcoming updates:

    1. More enemies varity
    2. More level
    3. Frenzy Mode = Harder Level
    4. More Character selection
    5. Gear for Human - offer protection
    6. Meat booster for Lion - offer slight buff for a certain time
    7. Save progress and continue feature