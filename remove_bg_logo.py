from PIL import Image

def make_transparent(img_path, is_white_bg):
    img = Image.open(img_path).convert('RGBA')
    datas = img.getdata()
    newData = []
    
    for item in datas:
        if is_white_bg:
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                if item[0] > 200 and item[1] > 200 and item[2] > 200:
                    newData.append((0, 0, 0, int((255-item[0]))))
                else:
                    newData.append((0, 0, 0, 255))
        else:
            if item[0] < 15 and item[1] < 15 and item[2] < 15:
                newData.append((0, 0, 0, 0))
            else:
                if item[0] < 50 and item[1] < 50 and item[2] < 50:
                    newData.append((255, 255, 255, int(item[0]*5)))
                else:
                    newData.append((255, 255, 255, 255))
                    
    img.putdata(newData)
    img.save(img_path, 'PNG')
    print(f'Done {img_path}')

try:
    make_transparent('public/images/logo-maay-black.png', True)
    make_transparent('public/images/logo-maay-white.png', False)
except Exception as e:
    print('Failed:', e)
