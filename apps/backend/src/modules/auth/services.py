from core.database import get_connection_db


conn = get_connection_db()


def get_user_by_email(email):
    with conn.cursor() as cursor:
        query = """
        select * from users where email = %s
        """
        cursor.execute(query, (email,))
        return cursor.fetchone()


def insert_user(username, email, rol, hashed_password):
    with conn.cursor() as cursor:
        query = """
        insert into users (username, email, password) values (%s, %s, %s, %s)
        """
        cursor.execute(query, (username, email, rol, hashed_password))
        conn.commit()

        return {
            "id": cursor.lastrowid,
            "username": username,
            "email": email,
            "rol": rol,
        }
