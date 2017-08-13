from flask import jsonify

class FileNotFound(Exception):

    def __init__(self, payload=None):
        Exception.__init__(self)
        self.message = "File Not Found"
        self.status_code = 404
        self.payload = payload

    def to_dict(self):
        error = dict(self.payload or ())
        error['message'] = self.message
	error['code'] = self.status_code
        return error
