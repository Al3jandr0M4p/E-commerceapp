import smtplib
import ssl
import os

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.settings import EMAIL_PASSWORD, EMAIL_SENDER


def send_code(to: str, code: str):
    email_sender = EMAIL_SENDER
    email_password = EMAIL_PASSWORD

    subject = "Codigo de recuperacion"
    body = f"""
    <html>
        <body>
            <h2>Recuperación de contraseña</h2>
            <p>Hola,</p>
            <p>Este es tu código para recuperar tu contraseña:</p>
            <h3>{code}</h3>
            <p>Este código expira en 10 minutos.</p>
        </body>
    </html>
    """

    # preparar el mensaje
    msg = MIMEMultipart("alternative")
    msg["From"] = email_sender
    msg["To"] = to
    msg["subject"] = subject
    msg.attach(MIMEText(body, "html"))

    # Conexion segura con Gmail
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(email_sender, email_password)
        server.sendmail(email_sender, to, msg.as_string())
