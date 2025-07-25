 #              _____                _____                    _____                    _____          
 #             /\    \              /\    \                  /\    \                  /\    \         
 #            /::\    \            /::\    \                /::\    \                /::\    \        
 #           /::::\    \           \:::\    \              /::::\    \              /::::\    \       
 #          /::::::\    \           \:::\    \            /::::::\    \            /::::::\    \      
 #         /:::/\:::\    \           \:::\    \          /:::/\:::\    \          /:::/\:::\    \     
 #        /:::/__\:::\    \           \:::\    \        /:::/__\:::\    \        /:::/  \:::\    \    
 #       /::::\   \:::\    \          /::::\    \       \:::\   \:::\    \      /:::/    \:::\    \   
 #      /::::::\   \:::\    \        /::::::\    \    ___\:::\   \:::\    \    /:::/    / \:::\    \  
 #     /:::/\:::\   \:::\    \      /:::/\:::\    \  /\   \:::\   \:::\    \  /:::/    /   \:::\ ___\ 
 #    /:::/__\:::\   \:::\____\    /:::/  \:::\____\/::\   \:::\   \:::\____\/:::/____/     \:::|    |
 #    \:::\   \:::\   \::/    /   /:::/    \::/    /\:::\   \:::\   \::/    /\:::\    \     /:::|____|
 #     \:::\   \:::\   \/____/   /:::/    / \/____/  \:::\   \:::\   \/____/  \:::\    \   /:::/    / 
 #      \:::\   \:::\    \      /:::/    /            \:::\   \:::\    \       \:::\    \ /:::/    /  
 #       \:::\   \:::\____\    /:::/    /              \:::\   \:::\____\       \:::\    /:::/    /   
 #        \:::\   \::/    /    \::/    /                \:::\  /:::/    /        \:::\  /:::/    /    
 #         \:::\   \/____/      \/____/                  \:::\/:::/    /          \:::\/:::/    /     
 #          \:::\    \                                    \::::::/    /            \::::::/    /      
 #           \:::\____\                                    \::::/    /              \::::/    /       
 #            \::/    /                                     \::/    /                \::/____/        
 #             \/____/                                       \/____/                  ~~ 
 # 
 # EternalIllusion's Download Site - [ETSD]
 # Github.com/EternalIllusion/DownloadSite
 # 
 # A Python library to build a website in one-time generation.
 # Capable for most CI/CD+Pages services such as GitHub & Cloudflare.
 # 
 # Created by EternalIllusion and all codes with [ETSD] sign 
 # are not allowed to upload to GitCode/GitLab/CSDN 
 # or any platform requires login to view contents.

def header():
    return """<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Widgets Test</title>
    <link rel="shortcut icon" href="./assets/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="./css/index.css">
    <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/moon-stars-kai/dist/MoonStarsKaiHW-Bold/result.css' media="none" onload="this.media='all'">
    <style>* {font-family: 'Moon Stars Kai HW';font-weight: '700'};</style>
</head>"""

def widgetsInit():
    return '<script src="./js/widgets.js"></script>'

def searchBar(data_id='',placeholder=None,input_id=None,base_color=None,shadow_color=None,default_text=None):
    return f'<div is="search-bar" target="{data_id}"{f' inputid="{input_id}"' if input_id else ''}{f' color="{base_color}"' if base_color else ''}{f' shadowcolor="{shadow_color}"' if shadow_color else ''}{f' default="{default_text}"' if default_text else ''}{f' placeholder="{placeholder}"' if placeholder else ''}></div>{f"<script>document.addEventListener('DOMContentLoaded',function(){'{'}searchAttach(document.getElementById('{input_id}'), document.getElementById(''));{'}'})</script>" if data_id else ''}'

def s(s,*args):
    if args:
        rtvl = []
        for i in [s]+args:
            rtvl.append(i.replace(' ','&nbsp;'))
        return rtvl
    else:return s.replace(' ','&nbsp;')

class p:
    def __init__(self,*args:str,**kwargs):
        self.args = kwargs
        self.texts = args
    def __call__(self, *args:str):
        if args:self.__init__(*args)
        return self.__str__()
    def __parg(self):
        rtv = ' '
        for i in self.args:
            rtv+=f'{i}="{self.args[i]}" '
        return rtv
    def __str__(self):
        rtvl = []
        for i in self.texts:
            #print('i:',i)
            rtvl.append(i.replace(' ','&nbsp;'))
        #print(rtvl)
        return f'<p>{'</p><p>'.join(rtvl)}</p>'

class ul:
    def __init__(self,**kwargs):
        self.data = []
        self.args = kwargs
        self.args = {
            (k[1:] if k.startswith('_') else k): v
            for k, v in self.args.items()
        }
    def attach(self,innerHTML,**kwargs):
        self.data.append({**{'innerHTML': innerHTML}, **kwargs})
    def __listr(self):
        rtv=""
        for i in self.data:
            stri='<li '
            for j in i:
                if j=='innerHTML':continue
                stri+=f'{j}="{i[j]}" ' if j in ["width","height","style","class","id"] else f'data-{j}="{i[j]}" '
            stri+=f'>{i['innerHTML']}</li>'
            rtv+=stri
        return rtv
    def __liarg(self):
        rtv = ' '
        for i in self.args:
            rtv+=f'{i}="{self.args[i]}" '
        return rtv
    def __str__(self):
        return f'<ul{self.__liarg()}>{self.__listr()}</ul>'
    def __call__(self, *args, **kwds):
        return self.__str__()

def card_gallery(id,title,subtitle,description,gallery_color,gallery_url,icon_url,tags,stats):
    return f"""<div class="card-gallery" id="{id}">
            <div class="title" id="{id}-title"><h2>{title}</h2>{f"<p>{subtitle}</p>" if subtitle else ""}</div>
            <div class="gallery" style="background-color: #{gallery_color};{f"background-image:url('{gallery_url}');" if gallery_url else ""}" id="{id}-gallery"></div>
            <div class="icon" id="{id}-icon"><img src="{icon_url}" alt="" width="100%" height="100%"></div>
            <div class="description" id="{id}-desc">{description}</div>
            <div class="tags" id="{id}-tags">{tags}</div>
            <div class="stats" id="{id}-stats">{stats}</div>
            </div>
            """
            
def card(id,title,subtitle,description,icon_url,tags,stats):
    return f"""<div class="card" id="{id}">
            <div class="title" id="{id}-title"><h2>{title}</h2>{f"<p>{subtitle}</p>" if subtitle else ""}</div>
            <div class="icon" id="{id}-icon"><img src="{icon_url}" alt="" width="100%" height="100%"></div>
            <div class="description" id="{id}-desc">{description}</div>
            <div class="tags" id="{id}-tags">{tags}</div>
            <div class="stats" id="{id}-stats">{stats}</div>
            </div>
            """
            
class sidebar:
    def __init__(self):
        self.user_main=''
        self.main=''
        self.sub={}
    def __sub(self):
        rtv = ""
        for i in self.sub:
            rtv += f'<div id="nav-sidebar-sub-{i}" class="nav-sidebar-group auto-breakword">{self.sub[i]}</div>'
        return rtv
    def __str__(self):
        f'<div id="nav-sidebar" class="nav-sidebar-collapsed"><div id="nav-sidebar-wrapper"> {self.main}</div></div><div id="nav-sidebar-sub"><div id="nav-sidebar-sub-wrapper">{self.__sub()}</div></div></div><script>closeSidebarSub();if (getCookieBool("navsidebar")) {"{"}toggleSidebar();{"}"}refreshSidebarBtn();</script>'