from PIL import Image

# Use the original image that had a pure white background
img = Image.open('C:/Users/Admin/.gemini/antigravity-ide/brain/2937620c-d24d-41e6-8581-07c2d97d445e/hot_cup_new_1785385760194.png')
img = img.convert('RGBA')
datas = img.getdata()

newData = []
# The image has a pure white background (255,255,255)
for item in datas:
    # If the pixel is very bright (close to white), make it transparent
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))
    else:
        # edge feathering
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((item[0], item[1], item[2], int((255 - item[0])*6)))
        else:
            newData.append(item)

img.putdata(newData)
img.save('public/images/ly-ca-phe-nong.png', 'PNG')
print('Done saving ly-ca-phe-nong.png')
