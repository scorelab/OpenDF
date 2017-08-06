from flask import Flask, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from subprocess import PIPE
from keras.preprocessing import image as image_utils
from imagenet_utils import decode_predictions
from imagenet_utils import preprocess_input
from uuid import UUID
import os
import subprocess
import sys
import numpy as np
import argparse
import cv2

sys.path.append('../models')
sys.path.append('exceptions')

from vgg16 import VGG16
from vgg19 import VGG19
from resnet50 import ResNet50
from FileNotFound import FileNotFound
from InvalidUUID import InvalidUUID

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)

#images dictionary contains uuids and corresponding file path for each uuid
images = {}

#images dictionary must have at least one record
def get_actual_path(uuid):
	uuid= str(uuid)
	if(uuid in images):
	    return images[uuid]
	else:
	    return "File Not Found"

def is_valid_uuid(uuid):
	try:
		val = UUID(uuid, version=4)
		return True
	except ValueError:
		return False

def predict_image(modelType, imagePath):
	print("[INFO] loading and preprocessing image...")
	image = image_utils.load_img(imagePath, target_size=(224, 224))
	image = image_utils.img_to_array(image)

	image = np.expand_dims(image, axis=0)
	image = preprocess_input(image)

	print("[INFO] loading network...")
	if(modelType == "ResNet50"):
		model = ResNet50(weights="imagenet")
	elif(modelType == "VGG16"):
		model = VGG16(weights="imagenet")
	elif(modelType == "VGG19"):
		model = VGG19(weights="imagenet")
	else:
		raise InvalidUsage()
		exit()

	print("[INFO] classifying image...")
	preds = model.predict(image)
	(inID, label) = decode_predictions(preds)[0]
	return label

@app.errorhandler(FileNotFound)
def handle_fileNot_found(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.errorhandler(InvalidUUID)
def handle_invalid_uuid(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
	
@app.errorhandler(404)
def handle_invalid_usage(error):
    	response = jsonify({'message': 'Invalid Usage', 'code': 404})
	response.status_code = 404
	return response

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/analyze/<path:path>', methods=['GET'])
def analyze_image(path):
	if(is_valid_uuid(path)):
		IPath = get_actual_path(path)
		if(os.path.isfile(IPath)):
			value = predict_image("VGG16",IPath)
			response = jsonify({'message': value, 'code' : 200})
			response.status_code = 200
			return response
		elif(IPath=="File Not Found"):
			raise FileNotFound()
	else:
		raise InvalidUUID()



if __name__ == '__main__':
    app.run(debug=True)
