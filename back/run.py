from app.main import app, DB

if __name__ == '__main__':
    with app.app_context():
        DB.create_all()
        DB.session.close()
        app.run(debug=True)