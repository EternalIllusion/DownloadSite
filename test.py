from widgets.common import *
from widgets.icons import UtilityIcons

content = f"<!DOCTYPE html><html>{header()}<body>{searchInit()}"

content += searchBar('sb1',data_id='sl1')

l1 = ul(id='sl1',style='max-height:30rem;overflow-y: scroll!important;border-bottom: .125rem solid #000;',_class='searchlist')

for i in range(100):
    if i%5==0:kwg={'style':'color:red !important;'}
    else:kwg={}
    l1.attach(f'-=item{i}=-',**kwg)

content += l1()

l3 = ul(id='sl3',style='max-height:30rem;overflow-y: scroll!important;border-bottom: .125rem solid #000;',_class='searchlist-nogrid')

for i in range(100):
    if i%5==0:kwg={'style':'color:red !important;'}
    else:kwg={}
    l3.attach(f'-=item{i}=-:Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui autem optio soluta magnam modi eveniet!{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui autem optio soluta magnam modi eveniet!"*2 if i%6==0 else ""}',**kwg)

content += l3()

content += searchBar('sb3',data_id='sl3')

l2 = ul(id='sl2',style='max-height:30rem;',_class='searchlist')
for i in range(20):
    l2.attach(card(f'sl2-carditem-{i}',f'Card Sample {i}',f'Subtitle {i}',p('This is an info line.','Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui autem optio soluta magnam modi eveniet!'),'./assets/icon.png',f'<span>{UtilityIcons.Computer}Computer Icon</span>',f'<span>{UtilityIcons.Download}Download Icon</span>'))
    
for i in range(10):
    l2.attach(card_gallery(f'sl2-carditem-{i}',f'Card Sample {i}',f'Subtitle {i}',p('This is an info line.','Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui autem optio soluta magnam modi eveniet!'),'aqua','./assets/bg.jpg','./assets/icon.png',f'<span>{UtilityIcons.Computer}Computer Icon</span>',f'<span>{UtilityIcons.Download}Download Icon</span>'))

content += l2()

with open('./html/pytest.html','w',encoding='utf-8') as fh:
    fh.write(content)