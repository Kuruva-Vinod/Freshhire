from app import create_app

app = create_app()

print(app.url_map)   # 👈 ADD THIS LINE

if __name__ == "__main__":
    app.run(debug=True)