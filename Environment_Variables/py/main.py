from dotenv import load_dotenv #, dotenv_values
import os

load_dotenv()
print(os.getenv("API_KEY"))


from dotenv import dotenv_values

config = dotenv_values(".env")
print(config["API_KEY"])