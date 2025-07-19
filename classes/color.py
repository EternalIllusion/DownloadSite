class color:
    def __init__(self,r:int,g:int,b:int,a:int=255):
        self.r,self.g,self.b,self.a = r,g,b,a
    
    def HEX(self):
        return hex(16777216*self.r+65536*self.g+256*self.b+self.a)[2:]
    
    def SHEX(self):
        return '#'+self.HEX()
    
    def __str__(self, *args, **kwds):
        return self.HEX()
    
class hexcolor(color):
    def __init__(self,hexcode:str):
        l =len(hexcode)
        if l==8:
            pass
        elif l==6:
            hexcode = hexcode+'FF'
        elif l==3:
            hexcode = ''.join(i * 2 for i in hexcode) + 'FF'
        elif l==4:
            hexcode = ''.join(i * 2 for i in hexcode)
        else:
            raise ValueError('Unexcepted value: {hexcode}')
        c = int(hexcode.lower(), 16)
        r = c//16777216
        g = c%16777216
        b = g%65536
        a = b%256
        g,b = g//65536,b//256
        super().__init__(r, g, b, a)
    
if __name__ == '__main__':
    c1 = color(102,51,255,66)
    print(c1,f'{c1}')
    print(str(c1))
    c2 = hexcolor(str(c1))
    print(c2.r,c2.g,c2.b,c2.a)