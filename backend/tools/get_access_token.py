# See https://developers.facebook.com/docs/instagram-basic-display-api/getting-started

import re
import requests

REDIRECT_URI = 'https://www.facebook.com/' # need to be added in the Facebook Developers admin page
APP_ID = '972774756439258'
APP_SECRET = '0011738c8eb6a5b92fa25ec1b5b252de'

def get_oauth_url():
    return ('https://api.instagram.com/oauth/authorize'
        '?app_id=%s'
        '&redirect_uri=%s'
        '&scope=user_profile,user_media'
        '&response_type=code'
        ) % (APP_ID, REDIRECT_URI)

def extract_code_from_url(url):
    regex_pattern = re.escape(REDIRECT_URI) + r'\?code=(.+)#_'
    m = re.search(regex_pattern, url)

    if m:
        found = m.group(1)
        return found
    else:
        raise 'Invalid URL'

def start_flow():
    oauth_url = get_oauth_url()
    print('Open this link in your browser, log in and copy the URL you are redirected to\n\n%s\n' % oauth_url)

    url_with_code = input('Paste it here: ')
    
    code = extract_code_from_url(url_with_code)
    print('\n\nYour code is:\n\n%s\n\n' % code) 

    r = requests.post('https://api.instagram.com/oauth/access_token', data={
        'app_id': APP_ID,
        'app_secret': APP_SECRET,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': REDIRECT_URI,
    })

    try:
        response = r.json()
        print(response)
        return response['access_token']
    except:
        raise 'NOT A JSON'
        print(r.text)

if __name__ == '__main__':
    start_flow()
