# management_site
A webapp that lets you turn a trading bot on and off, see what the trading bot returns, and update who has access to the site

# Setup
The management_site has two parts: the frontend and backend. These are divided into two directories. 

Step 1:
Open two different terminals.

Step 2:
In the first terminal, change your directory to "backend". 

Step 3:
In the second terminal, change your directory to "frontend"

Step 4:
In the first terminal (backend), enter "python manage.py runserver"

Step 5:
In the second terminal (frontend), enter "npm start"

Step 6:
Wait for the server to start. The server will serve to "http://localhost:3000" but you just need to wait as it will automatically open a new tab at that address.

# Notes
To stop the server, navigate to the frontend terminal. Enter "ctrl+c". When prompted if you want to terminate the server, type "y" and press enter.
Then, navigate to the backend terminal and enter "ctrl+c". This will terminate the backend server.

# Operation
When the server first starts, you'll be prompted to login to MetaMask. You will not be able to access the app if your MetaMask address is not whitelisted or you are not logged in.
The "MetaMask" page is where you can see all the addresses that are allowed access the web app. You can create a new one as well as edit or delete existing ones.
WARNING: if you delete your address, you won't be able to access the site.
If you navigate to the "Info" page, you'll see json data returned from the trading bot.
If you navigate to the "EditConfig" page, you'll see a form with three fields. You can edit any of the fields and click "submit".
If the "Running" attribute is true, the trading bot is "running" which means if you open the console log, you'll see "running..." every five seconds. If "Running" is not checked, you'll see "Trading bot is turned off" in the console log.
You can turn the "trading bot" on or off by checking the "Running" attribute and clicking submit.

