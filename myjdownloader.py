#!/usr/bin/env python3

# http server with reverse proxy to jdownloader API at localhost:3128

# https://docs.aiohttp.org/en/stable/client_reference.html
# https://docs.aiohttp.org/en/stable/web_reference.html
# https://proxiesapi.com/articles/using-aiohttp-for-easy-and-powerful-reverse-proxying-in-python

import os
import re
import asyncio
import argparse
import nest_asyncio
import aiohttp
import aiohttp_cors



main_args = None
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

    remote_url = main_args.jdownloader + request.rel_url.path_qs
    if debug:
        print("remote_url", remote_url)
    client_session = request.app["client_session"]
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
        body = await response.read() # bytes
        #print("response body:", body[:1000])
        headers = dict(response.headers)
        remove_headers = [
            "Content-Encoding", # "deflate"
            "Transfer-Encoding", # "chunked"
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

    url = main_args.jdownloader + "/help"
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
    extra_routes = [
        "/help",
    ]
    for path in extra_routes:
        if path in seen:
            continue
        seen.add(path)
        yield path
    # html is simple enough to parse it with regex
    for match in re.finditer(r"<span class='value'>(/[0-9a-zA-Z/]+)(?:\?[0-9a-zA-Z:&]+)?</span>", html):
        path = match.group(1)
        if path in seen:
            continue
        seen.add(path)
        yield path



async def main():

    global main_args
    global debug

    # allow nesting multiple asyncio event loops
    # fix: RuntimeError: This event loop is already running
    # fix: RuntimeError: Cannot run the event loop while another loop is running
    nest_asyncio.apply()

    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-H',
        '--host',
        type=str,
        default="localhost",
        help='host to listen on (default: localhost)',
    )
    parser.add_argument(
        '-p',
        '--port',
        type=int,
        default=3129,
        help='port to listen on (default: 3129)',
    )
    parser.add_argument(
        '--jdownloader',
        type=str,
        default="http://localhost:3128",
        help='jdownloader API base URL (default: http://localhost:3128)',
    )
    parser.add_argument(
        '-v',
        '--verbose',
        action='store_true',
        help='show more output',
    )
    main_args = parser.parse_args()
    debug = main_args.verbose

    app = aiohttp.web.Application()

    # add default route handler
    # https://stackoverflow.com/questions/34565705
    app.router.add_route("*", "/{tail:.*}", handle_request)

    app["jd_routes"] = set()
    async for path in get_jd_api_routes():
        app["jd_routes"].add(path)

    async with aiohttp.ClientSession() as client_session:
        app["client_session"] = client_session

        print("forwarding JD API calls to", main_args.jdownloader)

        aiohttp_cors.setup(app)
        aiohttp.web.run_app(app, host=main_args.host, port=main_args.port)



if __name__ == "__main__":

    asyncio.run(main())
