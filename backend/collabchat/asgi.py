"""
ASGI config for collabchat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack   # 👈 исправлено

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "collabchat.settings")

# стандартное ASGI приложение Django (для HTTP)
django_asgi_app = get_asgi_application()

# комбинируем HTTP и WebSocket
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter([
            # сюда позже добавим ws:// роуты для чата
        ])
    ),
})


