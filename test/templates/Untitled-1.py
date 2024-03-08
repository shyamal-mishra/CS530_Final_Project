from collections import defaultdict, deque

class RecordDatabase:
    def __init__(self):
        self.records = defaultdict(dict)
        self.locks = defaultdict(lambda: {"locked": False, "queue": deque()})
    
    def SET_OR_INC(self, key, field, value):
        if key not in self.records:
            self.records[key][field] = value
        elif field not in self.records[key]:
            self.records[key][field] = value
        else:
            self.records[key][field] += value
    
    def DELETE(self, key, field):
        if key in self.records and field in self.records[key]:
            del self.records[key][field]
            if not self.records[key]:
                del self.records[key]
    
    def GET(self, key, field):
        if key in self.records and field in self.records[key]:
            return self.records[key][field]
        return ""
    
    def SET_OR_INC_BY_CALLER(self, key, field, value, callerId):
        if key not in self.locks or not self.locks[key]["locked"] or self.locks[key]["locked_by"] == callerId:
            self.SET_OR_INC(key, field, value)
        elif key in self.records and field in self.records[key]:
            return self.GET(key, field)
        return ""
    
    def DELETE_BY_CALLER(self, key, field, callerId):
        if key in self.records and (not self.locks[key]["locked"] or self.locks[key]["locked_by"] == callerId):
            self.DELETE(key, field)
            return "true"
        return "false"
    
    def LOCK(self, callerId, key):
        if key not in self.records:
            return "invalid_request"
        if not self.locks[key]["locked"]:
            self.locks[key]["locked"] = True
            self.locks[key]["locked_by"] = callerId
            return "acquired"
        elif self.locks[key]["locked_by"] == callerId:
            return ""
        else:
            self.locks[key]["queue"].append(callerId)
            return "wait"
    
    def UNLOCK(self, key):
        if key in self.locks and self.locks[key]["locked"]:
            self.locks[key]["locked"] = False
            if self.locks[key]["queue"]:
                next_user = self.locks[key]["queue"].popleft()
                self.locks[key]["locked"] = True
                self.locks[key]["locked_by"] = next_user
                return "released"
            return "released"
        elif key in self.locks and not self.locks[key]["locked"]:
            return ""
        return "invalid_request"

# Sample usage
db = RecordDatabase()
queries = [
    ["SET_OR_INC", "A", "B", 4],
    ["UNLOCK", "A"],
    ["LOCK", "user1", "A"],
    ["LOCK", "user2", "A"],
    ["LOCK", "user3", "B"],
    ["UNLOCK", "B"],
    ["SET_OR_INC", "A", "C", 5],
    ["DELETE", "A", "B"],
    ["SET_OR_INC_BY_CALLER", "A", "B", 3, "user2"],
    ["GET", "A", "B"],
    ["DELETE_BY_CALLER", "A", "B", "user3"],
    ["SET_OR_INC_BY_CALLER", "A", "B", 5, "user1"],
    ["UNLOCK", "A"],
    ["SET_OR_INC_BY_CALLER", "A", "B", 2, "user1"],
    ["SET_OR_INC_BY_CALLER", "A", "B", 1, "user2"],
    ["LOCK", "user3", "A"],
    ["DELETE_BY_CALLER", "A", "B", "user2"],
    ["UNLOCK", "A"]
]

for query in queries:
    if query[0] == "SET_OR_INC":
        db.SET_OR_INC(query[1], query[2], query[3])
    elif query[0] == "UNLOCK":
        result = db.UNLOCK(query[1])
        print(result)
    elif query[0] == "LOCK":
        result = db.LOCK(query[1], query[2])
        print(result)
    elif query[0] == "SET_OR_INC_BY_CALLER":
        result = db.SET_OR_INC_BY_CALLER(query[1], query[2], query[3], query[4])
        print(result)
    elif query[0] == "DELETE":
        db.DELETE(query[1], query[2])
    elif query[0] == "DELETE_BY_CALLER":
        result = db.DELETE_BY_CALLER(query[1], query[2], query[3])
        print(result)
    elif query[0] == "GET":
        result = db.GET(query[1], query[2])
        print(result)

print(result)
