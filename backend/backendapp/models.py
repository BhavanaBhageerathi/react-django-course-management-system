
from django.db import models


class Course(models.Model):
    course_name = models.CharField(max_length=200)
    course_fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.course_name
