from database.database_pipeline import DataManager
from database.database_updater import DatabaseUpdater
import time


g = DataManager("waddlewafflesbackend", "UJVkE6GCHQrokIhM")
k = DatabaseUpdater(g)

start = time.time()
k.update_database()
end = time.time()
print("TIME TAKENNNNNN")
print(end - start)