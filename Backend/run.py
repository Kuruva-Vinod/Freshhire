from app import create_app

app = create_app()

print(app.url_map)   # 👈 ADD THIS LINE

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)