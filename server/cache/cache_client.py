class CacheClient:
    def __init__(self):
        self.cache = {}
    
    def retrieve(self, key):
        return self.cache.get(key, False)
    
    def update(self, key, value):
        self.cache[key] = value
        return
    
    def reset(self):
        self.cache = {}
        return
    
    def generate_key(self, type, args):
        return f"{type}: + {''.join(map(str, args))}"