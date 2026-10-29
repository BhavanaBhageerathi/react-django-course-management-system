from django.urls import path
from .views import course_list, course_detail, course_fee


urlpatterns = [
    path('courses/', course_list),
    path('courses/<int:course_id>/', course_detail),
    path('courses/<int:course_id>/fee', course_fee),
]