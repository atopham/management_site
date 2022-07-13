# import json


# coso = '{"some":"data"}'
# cosa = json.loads(coso)
# print(cosa['some'])

# from .models import Config

# print("hey")
# conf = Config.objects.get(pk=1)
# print(conf)

import json
import os

# f = open('backend/management_site_backend/json/config.json', 'w')
# f.write('[{\"thingy\":\"Something\"}]')
# f.close()

f = open('backend/management_site_backend/json/login.json', 'r')
datos = f.read()
data = json.loads(datos)
for obj in data:
    if obj['address'] == '0x8bab6e76a9c584beee70aeb0c88bee9d24193bd1':
        print("0x8bab6e76a9c584beee70aeb0c88bee9d24193bd1 is whitelisted" )
    else:
        print(obj['address'])
f.close()
# print(datos)
# data = json.load(f)
# print(data)

# print(os.listdir())
