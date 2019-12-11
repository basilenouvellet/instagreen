from instagram_api import InstagramAPI

if __name__ == "__main__":
    access_token = "IGQVJVaDhFZA1pCVDNFcWZAYa2QyQWxaS096TjVXQ1piNHNTRkgtQ3NpLWl6RTlaTkVCUmdoUnhxNXRXNTNJbUhBcnFWMTkwX0E0T0RNZA3NmWGZAEUG1haVkxV09STHdSTXRnYnZAHd0Q1MDhjV3MxRWNvdGE1c1lEQndYSWxn"
    
    api = InstagramAPI(access_token)

    fields = api.get_user_fields()
    medias = api.get_user_medias()

    print("Media count from fields: %d" % fields['media_count'])
    print("Media count from medias: %d" % len(medias['data']))
