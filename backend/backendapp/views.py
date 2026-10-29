from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Course
from .serializers import CourseSerializer


@api_view(['GET', 'POST']) #to view all courses and add courses
@permission_classes([IsAuthenticated])
def course_list(request):

    if request.method == 'GET':

        courses = Course.objects.all()

        serializer = CourseSerializer(courses, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = CourseSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE']) #to edit and delete a course by id
@permission_classes([IsAuthenticated])
def course_detail(request, course_id):

    try:
        course = Course.objects.get(id=course_id) #get the course id
    except Course.DoesNotExist:
        return Response(
            {"detail": "Course not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'PUT': #for editing

        serializer = CourseSerializer(
            course,
            data=request.data #get new edited data
        )

        if serializer.is_valid(): #validate it
            serializer.save()#save it
            return Response(serializer.data)

        return Response(  #return response
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == 'DELETE': #for delete

        course.delete() #delete that course

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def course_fee(request, course_id):

    try:
        course = Course.objects.get(id=course_id) #get courseid
    except Course.DoesNotExist:
        return Response(
            {"detail": "Course not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    course_fee = request.data.get('course_fee')#get data ie new course fee

    if course_fee is None:
        return Response(
            {"detail": "course_fee is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    course.course_fee = course_fee #update only course feild
    course.save()

    serializer = CourseSerializer(course)

    return Response(serializer.data) #return it