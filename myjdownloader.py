#!/usr/bin/env python3

# http server with reverse proxy to jdownloader API at localhost:3128

# https://docs.aiohttp.org/en/stable/client_reference.html
# https://docs.aiohttp.org/en/stable/web_reference.html
# https://proxiesapi.com/articles/using-aiohttp-for-easy-and-powerful-reverse-proxying-in-python

import os
import re
import asyncio
import nest_asyncio
import aiohttp
import aiohttp_cors

server_host = "localhost"
server_port = 3129

jd_api_url_base = "http://localhost:3128"

debug = False



async def handle_request(request):

    path = request.rel_url.path

    if path in request.app["jd_routes"]:
        if debug:
            print("handle_request", path, "-> call_jd_api")
        return await call_jd_api(request)

    if path == "/my/listdevices":
        if debug:
            print("handle_request", path, "-> handle_listdevices_request")
        return await handle_listdevices_request(request)

    if debug:
        print("handle_request", path, "-> handle_file_request")
    return await handle_file_request(request)



async def call_jd_api(request):

    # TODO remove "/"?
    #remote_url = jd_api_url_base + "/" + request.rel_url.path_qs
    remote_url = jd_api_url_base + request.rel_url.path_qs
    #print("remote_url", remote_url)
    client_session = request.app["client_session"]
    # FIXME this hangs...
    #async with client_session.request(request.method, remote_url) as response:
    """
    # FIXME request.body
    print("request dir", dir(request))
    print("request.has_body", request.has_body)
    print("request.body_exists", request.body_exists)
    print("request.can_read_body", request.can_read_body)
    print("request.charset", request.charset)
    print("request.read", await request.read())
    print("request.content.read()", await request.content.read())
    print("request.multipart()", await request.multipart())
    print("request.post", await request.post())
    print("request.text", await request.text())
    print("request.content_length", request.content_length)
    print("request.content_type", request.content_type)
    """
    headers = dict(request.headers)
    remove_headers = [
        "Host",
        # fix: http 403 from /update/isUpdateAvailable	
        "Origin",
    ]
    for key in remove_headers:
        try:
            del headers[key]
        except KeyError:
            pass
    body = await request.read()
    if debug:
        print("remote_url", remote_url, "request.headers", headers)
        print("remote_url", remote_url, "request.body", body)
    args = dict(
        method=request.method,
        url=remote_url,
        headers=headers,
        data=body,
    )
    async with aiohttp.client.request(**args) as response:
        #print("response", response)
        #text = await response.text() # str
        #print("reading body ...")
        body = await response.read() # bytes
        #print("reading body done:", body[:1000])
        headers = dict(response.headers)
        # Content-Encoding: deflate
        # Transfer-Encoding: chunked
        remove_headers = [
            "Content-Encoding",
            "Transfer-Encoding",
        ]
        for key in remove_headers:
            try:
                del headers[key]
            except KeyError:
                pass
        if debug:
            print("remote_url", remote_url, "response.headers", headers)
            print("remote_url", remote_url, "response.body", body)
        return aiohttp.web.Response(
            status=response.status,
            #text=text,
            body=body,
            headers=headers
        )



async def handle_listdevices_request(request):

    headers = {
        "Content-Type": "application/aesjson-server; charset=utf-8",
        #"Server": "AppWork GmbH NIO-Engine",
    }

    return aiohttp.web.Response(
        status=200,
        # some base64-encoded aes-encrypted data
        # TODO aes key?
        body=b"C0cFb1n1LOzhqCbJs86kOMtohrZaXsvJXZKr4DQlQP3t5lfN6lJG/0Zb37ZEOWyMZ8LhncFmkwpm9ciWrb6Pw9CezIgveZ7FaJG03x3o83Nc0bFF+povE9f0EEmFkSbbw9oCbHD2RwAX3lp0cMnki5WgcHT5X4kww+Y7rQkkj+3k4Lv6Z/xkY3ggXt/GQQSsKumNQs7baLzWwjABFjGHSTlqTwuW0bbIaeiO7eajyho=",
        headers=headers,
    )



async def handle_file_request(request):

    path = "my.jdownloader.org" + request.rel_url.path
    if os.path.isdir(path):
        if path[-1] == "/":
            path += "index.html"
        else:
            path += "/index.html"
    #print("path", path)
    if not os.path.exists(path):
        return aiohttp.web.Response(
            status=404,
            text="no such file",
            #body=body,
            #headers=resp.headers
        )
    return aiohttp.web.FileResponse(path)
    with open(path, "rb") as f:
        body = f.read()
    print("path", path, "->", len(body), "bytes")
    #print(body[:1000])
    headers = {
        "Content-Type": "text/html",
    }
    return aiohttp.web.Response(
        status=200,
        body=body,
        headers=headers,
    )



async def get_jd_api_routes():

    url = jd_api_url_base + "/help"
    html = None
    async with aiohttp.ClientSession() as client:
        async with client.get(url) as resp:
            assert resp.status == 200
            html = await resp.text()
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    # ...
    del soup
    del BeautifulSoup
    """
    seen = set()
    path = "/help"; seen.add(path); yield path
    # html is simple enough to parse it with regex
    for match in re.finditer(r"<span class='value'>(/[0-9a-zA-Z/]+)(?:\?[0-9a-zA-Z:&]+)?</span>", html):
        path = match.group(1)
        if path in seen:
            continue
        seen.add(path)
        yield path



async def main():

    # allow nesting multiple asyncio event loops
    # fix: RuntimeError: This event loop is already running
    # fix: RuntimeError: Cannot run the event loop while another loop is running
    nest_asyncio.apply()

    app = aiohttp.web.Application()

    # add default route handler
    # https://stackoverflow.com/questions/34565705
    #app.router.add_get("/{tail:.*}", handle_file_request)
    #app.router.add_get("/{tail:.*}", handle_request)
    app.router.add_route("*", "/{tail:.*}", handle_request)

    # not working... the default route handler is always used
    """
    async for path in get_jd_api_routes():
        #print("adding jd route", path)
        app.router.add_route("*", path, call_jd_api)
    """

    """
    #resolver = aiohttp.TCPConnector()
    #proxy_pool = aiohttp.ProxyConnector(resolver)
    proxy_pool = aiohttp.TCPConnector()
    app["proxy_pool"] = proxy_pool
    """

    app["jd_routes"] = set()
    async for path in get_jd_api_routes():
        app["jd_routes"].add(path)

    async with aiohttp.ClientSession() as client_session:
        app["client_session"] = client_session

        print("forwarding JD API calls to", jd_api_url_base)

        aiohttp_cors.setup(app)
        aiohttp.web.run_app(app, host=server_host, port=server_port)



if __name__ == "__main__":

    asyncio.run(main())
