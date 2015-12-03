import urllib.request
import json

from .Citizen import Citizen

CITIZENS_URL = "https://sheetsu.com/apis/64b5c3f8"
CHARACTERS_URL = CITIZENS_URL + "/column/character"
SIZES_URL = CITIZENS_URL + "/column/size"
HOMETOWNS_URL = CITIZENS_URL + "/column/hometown"

def get_all_citizens():
    x = urllib.request.urlopen(CITIZENS_URL).read().decode('utf-8')
    x = json.loads(x)

    citizens = []

    for each in x['result']:
        citizens.append(Citizen(each['id'],
                                each['name'],
                                each['character'],
                                each['size'],
                                each['hometown'],
                                each['year_acquired'],
                                each['description'],
                                each['image_url']))
    return citizens

def get_citizens_sorted_by(sort_key):
    unsorted_citizens = get_all_citizens()

    if sort_key == "name":
        sorted_citizens = sorted(unsorted_citizens, key=lambda x: x.name)
    elif sort_key == "id":
        sorted_citizens = sorted(unsorted_citizens, key=lambda x: x.id)
    elif sort_key == "year_acquired":
        sorted_citizens = sorted(unsorted_citizens, key=lambda x: x.year_acquired)

    return sorted_citizens

def filter_citizens_by_character(character_key, citizens):
    if character_key.lower() == 'all':
        return citizens
    else:
        return [c for c in citizens if c.character.lower() == character_key.lower()]

def filter_citizens_by_size(size_key, citizens):
    if size_key.lower() == 'all':
        return citizens
    else:
        return [c for c in citizens if c.size.lower() == size_key.lower()]

def filter_citizens_by_hometown(hometown_key, citizens):
    if hometown_key.lower() == 'all':
        return citizens
    else:
        return [c for c in citizens if c.hometown.lower() == hometown_key.lower()]

def get_unique_characters():
    x = urllib.request.urlopen(CHARACTERS_URL).read().decode('utf-8')
    x = json.loads(x)
    x = set(x['result'])
    return list(x)

def get_unique_sizes():
    x = urllib.request.urlopen(SIZES_URL).read().decode('utf-8')
    x = json.loads(x)
    x = set(x['result'])
    return list(x)

def get_unique_hometowns():
    x = urllib.request.urlopen(HOMETOWNS_URL).read().decode('utf-8')
    x = json.loads(x)
    x = set(x['result'])
    return list(x)


def encode_citizen(obj):
    if isinstance(obj, Citizen):
        return obj.__dict__
    return obj
