from django.db import models

# Create your models here.

class FeedImage(models.Model):
    feed = models.ForeignKey(
        'feeds.Feed',
        related_name='feed_images',
        on_delete=models.CASCADE
    )

    image = models.ImageField(
        null=True,
        upload_to='feeds/%Y/%m/%d'
    )

class FeedManager(models.Manager):
    pass

class Feed(models.Model):
    user = models.ForeignKey(
        'users.User',
        related_name='user_feeds',
        on_delete=models.PROTECT
    )

    description = models.CharField(max_length=512, blank=True)
    like = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    feeds = FeedManager()

    class Meta:
        ordering = ['created']

    def __str__(self):
        """admin page에서 사용"""
        return f"{self.pk}"
    
    def __repr__(self):
        return f"<Feed {self.pk}>"