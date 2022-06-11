# python modules
import os
import uuid
from datetime import date

# django modules
from django.conf import settings
from django.core.exceptions import ValidationError

# drf modules
from rest_framework import serializers

# models
from users.models import (
    User
)

from feeds.models import (
    Feed,
    FeedImage
)

class FeedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'pk',
            'username',
            'profile'
        )

class FeedSerializer(serializers.ModelSerializer):
    user = FeedUserSerializer(read_only=True)
    images = serializers.SerializerMethodField()

    class Meta:
        model = Feed
        fields = (
            'pk',
            'user',
            'images',
            'like',
            'description',
            'created',
            'updated',
        )

    def get_images(self, feed):
        images = feed.feed_images.all()
        return [self.context['request'].build_absolute_uri(image.image.url) for image in images]

    def create(self, validated_data):
        today = date.today()

        image_files = self.content['request'].FILES.getlist('images', None)

        if image_files is None:
            raise ValidationError("이미지 파일이 없습니다.")

        feed = Feed.objects.create(**validated_data)
        
        images = []
        for image_file in image_files:
            if 'image' not in image_file.content_type:
                for image in images:
                    image.image.delete()
                raise ValidationError("이미지 파일이 아닙니다. 이미지 파일을 업로드해주세요")

            ext = image_file.content_type.split("/")[-1]

            while True:
                filename = f"{uuid.uuid4()}.{ext}"
                date_str = today.strftime("%Y/%m/%d")
                filepath = os.path.join(
                    settings.MEDIA_ROOT, 
                    f"feeds/{date_str}/{filename}"
                )
                if os.path.isfile(filepath):
                    break

            image = FeedImage(feed=feed)
            image.image.save(f"{uuid.uuid4()}.{ext}", image_file)
            image.save()

        return feed