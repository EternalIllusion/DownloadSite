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

def searchBar(input_id,base_color='2c2e31',default_text='',data_id=''):
    return f'<div style="display:flex !important;margin:.25rem .5rem .25rem .5rem;box-sizing:border-box;align-items:center;position:relative;margin-bottom:.25rem;margin-top:.25rem;margin-left:.5rem;margin-right:.5rem;line-height:1.15;"><svg style="color:#{base_color};height:1.25rem;left:.75rem;opacity:.6;position:absolute;width:1.25rem;z-index:1;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0"></path></svg><input style="padding:0 .5rem 0 3rem !important;width:100%;appearance:none !important;background-color:#f5f5f5;border:none;border-radius:0.75rem;box-shadow:0px -1px 2px rgba(17, 24, 39, .15);color:#{base_color};outline:2px solid transparent !important;min-height:2.25rem !important;font-size:.875rem;line-height:1.25rem;margin:0;padding-block:1px;padding-inline:2px;overflow-clip-margin:0px !important;overflow:clip !important;box-sizing:border-box;" id="{input_id}" value="{default_text}" class="searchbar-input" type="text" placeholder="Search..." autocomplete="off"></div>{f"<script>document.addEventListener('DOMContentLoaded',function(){'{'}searchAttach(document.getElementById('{input_id}'), document.getElementById('{data_id}'));{'}'})</script>" if data_id else ''}'

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