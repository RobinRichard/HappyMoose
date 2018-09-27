# Photo Upload (Happy Moose Internship)

This project contains two applications. One is a server which stores the uploaded photos and serve api for react native application (develeoped using Django framework) another Mobile application that allows the user to select photos from their mobile and upload it to django server using api (developed using React Native)

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

First run django application and then use emulator to run the react native application in same system so that the api connection will work properly

## Built With

* [Django](https://docs.djangoproject.com/en/2.1/intro/) - Web framework for python
* [React Native](https://facebook.github.io/react-native/docs/getting-started.html) - Build native mobile apps using JavaScript and React

## Author

### Robin Richard Arulanantham 

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->


