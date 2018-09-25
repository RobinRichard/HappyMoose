from django.db import models
from datetime import datetime

class Photo(models.Model):
    file_name = models.CharField(max_length=200)
    Actual_name = models.CharField(max_length=200,default='Actualname')
    uploadDate = models.DateTimeField(default=datetime.now, blank=True)