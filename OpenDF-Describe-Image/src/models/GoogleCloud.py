import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

def GoogleCloudAPI(ImagePath):
	print(ImagePath)
	# Instantiates a client
	client = vision.ImageAnnotatorClient()

	# The name of the image file to annotate
	#file_name = os.path.join(os.path.dirname(__file__),'resources/wakeupcat.jpg')
	file_name = os.path.join(os.path.dirname(ImagePath),ImagePath)

	# Loads the image into memory
	with io.open(file_name, 'rb') as image_file:
		content = image_file.read()

	image = types.Image(content=content)

	# Performs label detection on the image file
	response = client.label_detection(image=image)
	labels = response.label_annotations
	
	#print('Labels:')
	#index = 0
	predictions = []
	for label in labels:
		predictions.append(label)
	print(predictions)
	return predictions
