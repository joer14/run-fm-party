#!/usr/bin/env python
from flask import Flask, jsonify
app = Flask(__name__,  static_url_path='', static_folder='frontend/build')

# this is super janky - but we can just serve the html and all static assets through lambda.
# this is a bad practice. I want to eventually setup s3 to host these files, ideally with
# cloudfront in front of them. See: https://github.com/Miserlou/Zappa/issues/444
@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/v1/')
def api_root():
    return jsonify({'some':'json'})
    # return 'This going to be an API!'


if __name__ == "__main__":
    app.run()
