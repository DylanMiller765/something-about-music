import sqlite3

def get_all_posts():
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT title, content FROM posts')
    posts = cursor.fetchall()
    conn.close()
    return [{'title': post[0], 'content': post[1]} for post in posts]