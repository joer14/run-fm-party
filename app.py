#!/usr/bin/env python
from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api')
def hello_world2():
    return jsonify({'some':'json'})
    # return 'This going to be an API!'


if __name__ == "__main__":
    app.run()
