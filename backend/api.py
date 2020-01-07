from flask import Flask, request
from flask_cors import CORS
from instagram_api import Instagram_API
from tools.get_access_token import get_oauth_url, get_access_token

# App
app = Flask('Instagreen API')
CORS(app)

# Routes
@app.route('/api/auth/window_url')
def get_auth_window_url():
    return {
        'data': {
            'url': get_oauth_url(),
        }
    }

@app.route('/api/auth/access_token', methods=['POST'])
def post_access_token():
    code = request.get_json()['code']
    try:
        token = get_access_token(code)
        return {
            'data': {
                'token': token,
            }
        }
    except BaseException as err:
        return {
            'error': {
                'message': err.args[0],
            }
        }, 400

@app.route('/api/infos', methods=['POST'])
def get_infos():
    token = request.get_json()['token']
    insta_api = Instagram_API(token)
    try:
        data = insta_api.get_user_infos()
        return { 'data': data }
    except BaseException as err:
        print('######## ERROR ########')
        print(err.args[0])
        return { 'error': err.args[0] }, 400

@app.route('/api/medias', methods=['POST'])
def get_medias():
    token = request.get_json()['token']
    insta_api = Instagram_API(token)
    try:
        data = insta_api.get_user_medias()
        return { 'data': data }
    except BaseException as err:
        print('######## ERROR ########')
        print(err.args[0])
        return { 'error': err.args[0] }, 400

@app.route('/api/media/<media_id>', methods=['POST'])
def get_media(media_id):
    token = request.get_json()['token']
    insta_api = Instagram_API(token)
    try:
        data = insta_api.get_media(media_id)
        return { 'data': data }
    except BaseException as err:
        print('######## ERROR ########')
        print(err.args[0])
        return { 'error': err.args[0] }, 400
