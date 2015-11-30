import json

from flask import request
from flask import render_template

from app import app
from HoneyHeadquarters import honeyheadquarters as HH

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/citizen")
def get_citizens():
    sort_key = request.args.get('sort')
    character_key = request.args.get('character')
    size_key = request.args.get('size')
    hometown_key = request.args.get('hometown')

    if sort_key:
        citizens = HH.get_citizens_sorted_by(sort_key)
    else:
        citizens = HH.get_all_citizens()

    if character_key:
        citizens = HH.filter_citizens_by_character(character_key, citizens)

    if size_key:
        citizens = HH.filter_citizens_by_size(size_key, citizens)

    if hometown_key:
        citizens = HH.filter_citizens_by_hometown(hometown_key, citizens)

    citizens = json.dumps(citizens, default=HH.encode_citizen)

    return citizens

@app.route("/character")
def get_characters():
    return json.dumps(HH.get_unique_characters())

@app.route("/size")
def get_sizes():
    return json.dumps(HH.get_unique_sizes())

@app.route("/hometown")
def get_hometowns():
    return json.dumps(HH.get_unique_hometowns())
