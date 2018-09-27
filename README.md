# Photo Upload Application

This project is a client-server application. The server develeoped using Django framework stores the uploaded photos and provides an API for react native client. The mobile application developed using React Native is the client that allows the user to select photos from their mobile phone and uploads it to server. To run the project please see the instructions given below the screenshots. 

## Screenshots

<img src="/screenshot/screenshot.PNG" width="800" height="500" />

## Getting Started


```
1. Clone the repo
2. cd HappyMoose
```
## To run the django server
```
1. cd happyMoose (Django web application)
2. pip install -r requirements.txt
3. python manage.py runserver
```
## To run react native app in android emulator
```
1. cd Moose (Native mobile application)
2. npm install
3. react-native run-android
```
## Dependencies

```
    native-base
    react-native-image-gallery
    react-native-image-picker
    react-navigation
    rn-fetch-blob
```


## Deployment

First run the Django application (server) and then use the Android emulator to run the react native application (cliemt) in same system so that the API connection will work properly.

## Built With

* [Django](https://docs.djangoproject.com/en/2.1/intro/) - Web framework for python
* [React Native](https://facebook.github.io/react-native/docs/getting-started.html) - Build native mobile apps using JavaScript and React

## Author

### Robin Richard Arulanantham 

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->


