from dotenv import load_dotenv
from os import getenv


load_dotenv()


HOST = getenv("APP_HOST")
USER = getenv("APP_USER")
PASSWD = getenv("APP_PASSWORD")
DB = getenv("APP_DB")

EMAIL_SENDER = getenv("APP_EMAIL_SENDER")
EMAIL_PASSWORD = getenv("APP_EMAIL_PASSWORD")
