from rest_framework import serializers
from .models import Category, Book

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class BookSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'category', 'price', 'product_description', 'stock', 'title', 'thumbnail', 'upc')
