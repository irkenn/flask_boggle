from calendar import c
from crypt import methods
from flask_logic import game_handler_keywords
from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify


app = Flask(__name__)
app.config['SECRET KEY'] = "there's_no_spoon"
app.config['SECRET_KEY'] = "there's_no_spoon" #apparently this is for the session
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False



@app.route('/', methods=['POST','GET'])
def homepage():
    """This is the homepage route.
    To prevent the use of any logic in here, everything is done
    through keywords as part of a JSON request and the type of request method."""
    
    return game_handler_keywords(request_method=request.method, json_post=request.json)
