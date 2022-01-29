from rest_framework import viewsets
from .models import Students
from .serializer import StudentSerializer


class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Students.objects.all()
