from core.database import get_connection_db


conn = get_connection_db()


def get_user_by_email(email):
    with conn.cursor(dictionary=True) as cursor:
        query = """
        select * from users where email = %s
        """
        cursor.execute(query, (email,))
        return cursor.fetchone()


def insert_user(username, email, hashed_password):
    with conn.cursor(dictionary=True) as cursor:
        query = """
        insert into users (username, email, password, type_account) values (%s, %s, %s, %s)
        """
        type_account_id = 1  # id de las cuentas sin rol 'user'
        cursor.execute(query, (username, email, hashed_password, type_account_id))
        conn.commit()

        return {
            "id": cursor.lastrowid,
            "username": username,
            "email": email,
        }


def save_reset_code(email, code):
    with conn.cursor(dictionary=True) as cursor:

        query = """
        INSERT INTO password_reset_codes (email, code, created_at)
        VALUES (%s, %s, NOW())
        ON DUPLICATE KEY UPDATE code = %s, created_at = NOW()
        """
        cursor.execute(query, (email, code, code))
        conn.commit()


def verify_reset_code(email, code):
    with conn.cursor(dictionary=True) as cursor:

        query = """
        SELECT * FROM password_reset_codes
        WHERE email = %s AND code = %s AND created_at > NOW() - INTERVAL 10 MINUTE
        """
        cursor.execute(query, (email, code))
        return cursor.fetchone() is not None


def update_password(email, hashed_password):
    with conn.cursor(dictionary=True) as cursor:

        query = "UPDATE users SET password = %s WHERE email = %s"
        cursor.execute(query, (hashed_password, email))
        conn.commit()
