import sys
sys.path.append('/home/nishan/Documents/OpenDF/OpenDF-Describe-Image/src/models')
from keras.preprocessing import image as image_utils
from imagenet_utils import decode_predictions
from imagenet_utils import preprocess_input
from vgg16 import VGG16
from vgg19 import VGG19
from resnet50 import ResNet50
import numpy as np
import argparse
import cv2
import sys

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
	help="path to the input image")
ap.add_argument("-m", "--model", required=True,
	help="Pre-trained model to used")
args = vars(ap.parse_args())

orig = cv2.imread(args["image"])
modelType = (args["model"])

print("[INFO] loading and preprocessing image...")
image = image_utils.load_img(args["image"], target_size=(224, 224))
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

print("ImageNet ID: {}, Label: {}".format(inID, label))
cv2.putText(orig, "Label: {}".format(label), (10, 30),
	cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
cv2.imshow("Classification", orig)
cv2.waitKey(0)
