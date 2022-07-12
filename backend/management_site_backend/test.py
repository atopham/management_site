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

f = open('backend/management_site_backend/json/config.json', 'w')
f.write('[{\"thingy\":\"Something\"}]')
f.close()

f = open('backend/management_site_backend/json/config.json', 'r')
print(f.read())
# data = json.load(f)
# print(data)

# print(os.listdir())
