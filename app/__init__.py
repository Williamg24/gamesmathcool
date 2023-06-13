from flask import Flask, render_template, request, session, redirect, url_for 
import random

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/brick_break')
def brick_break():
    return render_template('brick_break.html')

@app.route('/level1')
def level1():
    return render_template('level1.html')

@app.route('/level2')
def level2():
    return render_template('level2.html')

@app.route('/level3')
def level3():
    return render_template('level3.html')

@app.route('/tic_tac_toe')
def tic_tac_toe():
    return render_template('tic.html')

@app.route('/connect4')
def connect4():
    return render_template('connect4.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# HANGMAN STUFF 
app.secret_key = 'mysecretkey'

words = ['bok choy','burger','monkey', 'mykolyk', 'computer', 'basketball', 'tiger', 'explosion', 'kitten', 'poker', 'glue', 'alarm', 'car', 'bmw', 'google']

def get_random_word():
    return random.choice(words)

def initialize_session():
    if 'guessed_letters' not in session:
        session['guessed_letters'] = []

    session['word'] = get_random_word()
    session['chances'] = 6

@app.route('/hangman', methods=['GET', 'POST'])
def hangman():
    if 'word' not in session:
        initialize_session()

    if request.method == 'POST':
        letter = request.form['letter']
        session['guessed_letters'] += letter

        if letter not in session['word']:
            session['chances'] -= 1

    word_display = ''
    for char in session['word']:
        if char in session['guessed_letters']:
            word_display += char + ' '
        else:
            word_display += '_ '

    if '_' not in word_display:
        return render_template('hangman_win.html', word=session['word'])

    if session['chances'] == 0:
        return render_template('hangman_lose.html', word=session['word'])

    return render_template('hangman.html', word_display=word_display, chances=session['chances'], guessed_letters=session['guessed_letters'])

@app.route('/hangman_reset')
def hangman_reset():
    session.clear()
    return redirect(url_for('hangman'))

@app.route('/memory')
def memory():
    return render_template('memory.html')

@app.route('/snake')
def snake():
    return render_template('snake.html')

#rock paper scissors stuff
results = []
player_score = 0
computer_score = 0

@app.route('/rps', methods=['GET', 'POST'])
def rps():
    global player_score, computer_score
    if request.method == 'POST':
        player_choice = request.form['choice']
        computer_choice = random.choice(['rock', 'paper', 'scissors'])
        result, player_choice_img, computer_choice_img = get_winner(player_choice, computer_choice)
        results.append((player_choice, computer_choice, result))
        if result == "You win!":
            player_score += 1
        elif result == "Computer wins!":
            computer_score += 1
        return render_template('rps.html', result=result, player_choice=player_choice, computer_choice=computer_choice, player_choice_img=player_choice_img, computer_choice_img=computer_choice_img, results=results, player_score=player_score, computer_score=computer_score)

    return render_template('rps.html', results=results, player_score=player_score, computer_score=computer_score)

def get_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        return "It's a tie!", f"{player_choice}.jpg", f"{computer_choice}.jpg"
    elif (
        (player_choice == 'rock' and computer_choice == 'scissors') or
        (player_choice == 'paper' and computer_choice == 'rock') or
        (player_choice == 'scissors' and computer_choice == 'paper')
    ):
        return "You win!", f"{player_choice}.jpg", f"{computer_choice}.jpg"
    else:
        return "Computer wins!", f"{player_choice}.jpg", f"{computer_choice}.jpg"

@app.route('/2048')
def S2048():
    return render_template('2048.html')


@app.route('/flappy_bird')
def flappy_bird():
    return render_template('flappy_bird.html')


@app.route('/connect4')
def C4():
    return render_template('connect4.html')


if __name__ == '__main__':
    app.run(debug=True)
