# myjdownloader

selfhosted webinterface for jdownloader



## status

works for me



### history

initial version created by [webapps-scraper](https://github.com/milahu/webapps-scraper)
from [my.jdownloader.org](https://my.jdownloader.org/)



## why

remove dependency on the centralized tunneling service
[my.jdownloader.org](https://my.jdownloader.org/)



## tunneling services

alternatives to my.jdownloader.org

- [ngrok.com](https://ngrok.com/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
- [boringproxy.io](https://boringproxy.io/)
- [github.com/anderspitman/awesome-tunneling](https://github.com/anderspitman/awesome-tunneling)

[my.jdownloader.org](https://my.jdownloader.org/)
is just a tunneling service,
needed for port-forwarding through closed firewalls,
to expose a listening port to the internet

the tunneling service also serves as a [cors proxy](https://github.com/topics/cors-proxy),
otherwise the webapp could not connect to jdownloader at http://localhost:3128/,
so even with the "direct connection" mode, the connection is still routed through my.jdownloader.org



### no need for tunneling service

a tunneling service is not needed when accessing jdownloader
behind a firewall with enabled port-forwarding for jdownloader's port 3128

to check if a port is reachable from the internet, you can use

- online port checker services
  - https://canyouseeme.org/
  - https://portchecker.co/
- portscanner apps
  - `nmap -p 3128 $your_public_ip_address`
  - `nmap -p 3128 your-public-domain-name.duckdns.org`



## how

jdownloader has a hidden `Deprecated API` feature

```
dst="$HOME/.config/jdownloader"
cfg="$dst"/cfg/org.jdownloader.api.RemoteAPIConfig.json
if [ "$(cat "$cfg" | jq -r .deprecatedapienabled)" = "false" ]; then
  cat "$cfg" | jq -c '. * { "deprecatedapienabled": true }' | sponge "$cfg"
fi
```

[my.jdownloader.org/developers](https://my.jdownloader.org/developers/)

<blockquote>

My.JDownloader API Documentation

Pro Tip: It's possible to access the JDownloader API directly (Bypass our server)
by enabling the so called 'Deprecated API' in the Advanced Options.

</blockquote>

when the `Deprecated API` is enabled,
jdownloader will listen on port 3128

see [localhost:3128/help](http://localhost:3128/help) for the API docs



## related

- https://github.com/RomanBelic/ClientWebJDownloader
- https://github.com/coxifred/PimpMyJDownloader - JDownloader private web server and chrome extension



## mirrors

since jdownloader is ruled by idiots (they still use SVN, Core.jar is still closed-source, ...)
i expect that this repo will be censored on github.com
so im creating consorship-resistant mirrors in advance

- [github.com/milahu/myjdownloader](https://github.com/milahu/myjdownloader)
- [darktea.onion/milahu/myjdownloader](http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/myjdownloader)
- [righttoprivacy.onion/milahu/myjdownloader](http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/milahu/myjdownloader)



### archives

- https://web.archive.org/web/*/https://github.com/milahu/myjdownloader
  - https://web.archive.org/web/20240918070605/https://github.com/milahu/myjdownloader
- https://archive.is/https://github.com/milahu/myjdownloader
  - https://archive.is/r8d9Y



## keywords

- jdownloader
- jdownloader-webinterface
- jdownloader-webui
- jdownloader-web
- selfhosted
- webinterface
- web interface
- webui
- filesharing
- webscraping
- filehosters
- oneclickhosters
