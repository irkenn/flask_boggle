from boggle import Boggle
from flask import Flask, request, render_template, redirect 

app = Flask(__name__)

boggle_game = Boggle()

@app.route("/")
def homepage():
    
    """This is the homepage and where the board is presnted"""
    return ""