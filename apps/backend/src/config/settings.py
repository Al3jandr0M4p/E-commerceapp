from dotenv import load_dotenv
from os import getenv


load_dotenv()


HOST=getenv("APP:HOST")
USER=getenv("APP:USER")
PASSWD=getenv("APP:PASSWD")
DB=getenv("APP:DB")
PORT=getenv("APP:PORT")
