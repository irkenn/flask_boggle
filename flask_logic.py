from unittest import result
from boggle import Boggle
from flask import Flask, session, render_template, jsonify, redirect

app = Flask(__name__)
app.config['SECRET KEY'] = "there's_no_spoon"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
curr_game = Boggle()


def start_game():
    """This calls the class (Boggle) and sets or resets the board""" 
    global curr_board 
    curr_board = curr_game.make_board()
    global guessed_words_set
    guessed_words_set = set()
    session["board"] = []
    session["board"] = curr_board
    session["score"] = 0
    

def game_handler_keywords(request_method=None, json_post=None):
    """This function has all the logic to decide what to return to the browser.
    That will return a render templat of home.html in case it's the first attempt
    to access the page through a GET request. 

    In the case of POST methods it will respond with a respective JSON depending
    on the Boggle.py class functions."""
    
    """Section to handle POST requests, will trigger the the start of game or give back a JSON response"""
    if request_method == 'POST':

        if json_post['keyword'] == "start-game":
            print("Start game has been selected?")
            start_game()
            return render_template('home.html')

            """ "check-word" is the keyword used when the user uploads a guess 
            from the form in the browser. The output from here is a JSON response with
            information about the status of the word"""
        elif json_post['keyword'] == "check-word":
            curr_word = json_post['argument']
            output_dict = {}
            
            """ check_valid_word has three result "ok", "not-on-board" or "not-word"
            this is the response to the browser."""
            result_output = curr_game.check_valid_word(curr_board, curr_word)
            output_dict["result"] = result_output
            
            """In the case of "ok" it will also add the amount of points
            that the word is worth"""
            if result_output == "ok":

                    """this prevents from submitting the same word more than once"""
                    if  curr_word not in guessed_words_set:
                        guessed_words_set.add(curr_word)
                        output_dict["wordPoints"] = len(curr_word)
                    else: 
                        output_dict["result"] = "already-guessed"
            return jsonify(output_dict)
            
        """for GET requests will return the corresponding HTML file"""
    elif request_method == 'GET':
        start_game()
        return render_template('home.html')
