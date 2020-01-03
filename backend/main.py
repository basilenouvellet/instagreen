from instagram_api import Instagram_API

if __name__ == '__main__':
    access_token = 'PUT_IT_HERE'
    
    api = Instagram_API(access_token)

    fields = api.get_user_fields()
    medias = api.get_user_medias()

    print('Media count from fields: %d' % fields['media_count'])
    print('Media count from medias: %d' % len(medias['data']))
