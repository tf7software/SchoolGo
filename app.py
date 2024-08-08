from flask import Flask, render_template, request, redirect, url_for, Response
import requests
from urllib.parse import urlparse

app = Flask(__name__)

def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        query = request.form.get('url')
        if query:
            search_url = f"https://www.google.com/search?q={query}"
            return redirect(url_for('proxy', url=search_url))
    return render_template('index.html')

@app.route('/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return 'No URL provided', 400

    try:
        response = requests.get(url)
        content_type = response.headers.get('Content-Type')
        if 'text/html' in content_type:
            content = response.text
            return Response(content, content_type=content_type)
        elif 'image' in content_type:
            return send_file(response.raw, mimetype=content_type)
        else:
            return Response(response.content, content_type=content_type)
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
