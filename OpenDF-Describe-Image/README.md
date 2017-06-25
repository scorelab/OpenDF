# image classification using pre-trained models

This contains code and weights files for the following Keras models:

- VGG16
- VGG19
- ResNet50

This source can be used with both Theano and Tensoflow backends, and upon instantiation the models will be built according to the image dimension ordering set in your Keras configuration file at `~/.keras/keras.json`. For instance, if you have set `image_dim_ordering=tf`, then any model loaded from this repository will get built according to the TensorFlow dimension ordering convention, "Width-Height-Depth".

Weights will be automatically loaded upon instantiation. If weights are unavailable in the source it will be automatically downloaded, and cached locally in `~/.keras/models/`.

## Requirements 
1. Install TensorFlow
```sh
$ pip install tensorflow
```

2. Install Keras.
```sh
$ pip install keras
```

3. Install pillow
```sh
$ pip install pillow
```

4. Install numpy
```sh
$ pip install numpy
```

## Usage
For image classification just run the following command
`python test_imagenet.py --image "Path to image"`

## References

- [Very Deep Convolutional Networks for Large-Scale Image Recognition](https://arxiv.org/abs/1409.1556)
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)
- [ImageNet classification with Python and Keras](http://www.pyimagesearch.com/2016/08/10/imagenet-classification-with-python-and-keras/)






