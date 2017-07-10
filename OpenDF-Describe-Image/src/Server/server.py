import os
from flask import Flask, request, redirect, url_for, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask import send_from_directory
import subprocess
from subprocess import PIPE
import sys
sys.path.append('../models')
sys.path.append('../main')
from keras.preprocessing import image as image_utils
from imagenet_utils import decode_predictions
from imagenet_utils import preprocess_input
from vgg16 import VGG16
from vgg19 import VGG19
from resnet50 import ResNet50
import numpy as np
import argparse
import cv2

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

#de get_actual_path(uuid):
#	images = {'cfgvhbjnmk':'uploded/image1.jpg'}
#	retu iimags[uuid]

def predictImage(modelType, imagePath):
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
		print("Invalid Usage!- Model Name doesnot exist")
		exit()

	print("[INFO] classifying image...")
	preds = model.predict(image)
	(inID, label) = decode_predictions(preds)[0]
	return label

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/analyze/<path:path>', methods=['GET'])
def uploadImage(path):
	IPath = "/"+path
	#print(IPath)
	if(os.path.isfile(IPath)):
		#return jsonify({"predicted" : IPath})
		#process = subprocess.call("python ../main/main.py --model VGG16 --image " + IPath, shell=True)
		value = predictImage("VGG16",IPath)
		#print(process)
	return jsonify({"predicted" : value})
	
	


@app.route('/api/analyze/<path:path>', methods=['POST'])
def returnPrediction(path):
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        #return redirect(url_for('uploaded_file',filename=filename))
        return jsonify({"predicted" : "House"})

if __name__ == '__main__':
    app.run(debug=True)
