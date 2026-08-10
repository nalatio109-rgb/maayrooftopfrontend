from PIL import Image

# Use the original image that had a pure black background
img = Image.open('C:/Users/Admin/.gemini/antigravity-ide/brain/2937620c-d24d-41e6-8581-07c2d97d445e/cold_cup_new_1785384568218.png')
img = img.convert('RGBA')
datas = img.getdata()

newData = []
# The image has a pure black background (0,0,0)
for item in datas:
    # If the pixel is very dark (close to black), make it transparent
    if item[0] < 15 and item[1] < 15 and item[2] < 15:
        newData.append((0, 0, 0, 0))
    else:
        # We can also add some feathering/semi-transparency for edges
        if item[0] < 40 and item[1] < 40 and item[2] < 40:
            # Dark but not black, maybe edge
            newData.append((item[0], item[1], item[2], item[0]*6))
        else:
            newData.append(item)

img.putdata(newData)
img.save('public/images/ly-ca-phe-lanh.png', 'PNG')
print('Done saving ly-ca-phe-lanh.png')

# Let's do the same for hot cup which had a white background
try:
    hot_img = Image.open('C:/Users/Admin/.gemini/antigravity-ide/brain/2937620c-d24d-41e6-8581-07c2d97d445e/bac_xiu_1785381714365.png')
    hot_img = hot_img.convert('RGBA')
    hdatas = hot_img.getdata()
    hnewData = []
    for item in hdatas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            hnewData.append((255, 255, 255, 0))
        else:
            hnewData.append(item)
    hot_img.putdata(hnewData)
    hot_img.save('public/images/ly-ca-phe-nong.png', 'PNG')
    print('Done saving ly-ca-phe-nong.png')
except Exception as e:
    print('Failed hot cup:', e)
