from mysql.connector import connect, Error
from config import settings

def get_connection_db():
    try:
        conn = connect(
            host=settings.HOST,
            username=settings.USER,
            password=settings.PASSWD,
            db=settings.DB,
            port=settings.PORT
        )
        return conn
    
    except Error as e:
        print(f"[-] Connection refused: {e}")
        return []