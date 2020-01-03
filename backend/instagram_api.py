import requests

BASE_URL = 'https://graph.instagram.com'

class Instagram_API():
    def __init__(self, access_token):
        self.access_token = access_token

    def get(self, endpoint, fields, converter):
        full_url = BASE_URL + endpoint

        r = requests.get(full_url, params={
            'access_token': self.access_token,
            'fields': ','.join(fields),
        })

        try:
            response = r.json()
            return converter(response)
        except:
            raise 'Something went wrong when doing a GET request on `%s`' % full_url

    def get_user_fields(self):
        return self.get(
            '/me',
            ['id', 'username', 'media_count'],
            lambda response: {
                'user_id': response['id'],
                'username': response['username'],
                'media_count': response['media_count'],
            })

    def get_user_medias(self):
        return self.get(
            '/me/media',
            ['id', 'media_type'],
            lambda response: response) # TODO: write converter
