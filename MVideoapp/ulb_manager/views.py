from django.shortcuts import render

# Create your views here.
from user.models import UserMessage
from django.http import JsonResponse


def apisView(request):
    if request.method == "POST":
        name = request.POST.get("name", "")
        all_messages = UserMessage.objects.filter(name=name)
    else:
        # 例子
        name = request.GET.get("name", "")
        all_messages = UserMessage.objects.all()
    resultList = []
    for message in all_messages:
        resultList += [{
            "username": message.name,
            "address": message.address,
        }]
    # 返回值
    response = JsonResponse(resultList, safe=False)
    # response.status_code = 500  自定义响应码
    return render(request, 'login.wxml')
