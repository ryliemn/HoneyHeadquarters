class Citizen():
    def __init__(self, id, name, character, size, hometown, year_acquired, description, image_url):
        self.id = id
        self.name = name
        self.character = character
        self.size = size
        self.hometown = hometown
        self.year_acquired = int(year_acquired)
        self.description = description
        self.image_url = image_url

    def __repr__(self):
        return str(self.__dict__)
