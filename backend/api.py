from flask import Flask
from flask_cors import CORS
from instagram_api import Instagram_API

# App
app = Flask('Instagreen API')
CORS(app)

# Instagram API
ACCESS_TOKEN_TO_DELETE = 'IGQVJVSU5GblBqQ05sME1FSjgwNEZAtTnlERENBT1EtaVpkWVUtZAEhxcUdZAcjVIdWZArVEdRYWJSNWVoMGdnUE16dHo1dW5ma1lDYy1yZAHZALOEhyVTVzSHA3SmctVFVsbmNISzZAGX2RmNEpZAWDVvakl3aW1JTTVDenJSRkdj'
insta_api = Instagram_API(ACCESS_TOKEN_TO_DELETE)

# Routes
@app.route('/api/infos')
def get_infos():
    return {
        'data': insta_api.get_user_infos(),
    }

@app.route('/api/medias')
def get_medias():
    return {
        'data': insta_api.get_user_medias(),
    }
