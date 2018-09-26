from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse,JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import *

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt
def apiuploads(request):
    try:
        if request.method == 'POST' and request.FILES['image']:
            myfile = request.FILES['image']
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            uploaded_file_url = fs.url(filename)

            f = Photo.objects.create(file_name=myfile.name,
                                    Actual_name=uploaded_file_url,
                                    )
            
            response_data = {}
            response_data['flag'] = "1"
            response_data['result'] = "worked"
            return HttpResponse(json.dumps(response_data), content_type="application/json")
    except:
        response_data = {}
        response_data['flag'] = "0"
        response_data['result'] = "Error in getting Date"
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def photoList(request):
    if request.method == "GET":
        rest_list = {}
        ph = Photo.objects.all().order_by('-uploadDate')
        phSer = serializer.PhotoSerializer(ph, many=True)

        rest_list['photos'] = phSer.data

        return JsonResponse(rest_list, safe=False)
    