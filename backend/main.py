from flask import Flask,request,jsonify
from dotenv import load_dotenv
import os
import mysql.connector
from mysql.connector import Error
import jwt
from flask_cors import CORS

load_dotenv()

db_host=os.getenv("DB_HOST")
db_port=os.getenv("DB_PORT")
db_user=os.getenv("DB_USER")
db_password=os.getenv("DB_PASSWORD")
db_name=os.getenv("DB_NAME")

def create_connection():
    connection=None
    try:
        connection=mysql.connector.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password,
            database=db_name
        )
        print("connection successful")
    except Error as e:
        print(e)
    return connection

app=Flask(__name__)
CORS(app)

sec_key=os.getenv("SECRET_KEY")

@app.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    username= data.get("userName")
    password= data.get("password")

    if not username or not password:
        return jsonify({"message":"Username and Password are required"}),400
    connection=create_connection()
    cursor =connection.cursor(dictionary=True)
    cursor.execute("select * from users where name =%s",(username,))

    user=cursor.fetchone()

    if user and user["password"]== password:
        token=jwt.encode({
            'sub':user['id'],
            'role':user['role'],
            'name':user['name'],

        },sec_key,algorithm='HS256')

        return jsonify({"token":token})
    return jsonify({"message":"Invalid Credentials"}),401


if __name__ =="__main__":
    app.run(debug=True)