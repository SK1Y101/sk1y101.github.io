# fetch modules
from PIL import Image
import os

# compile a list of images in this folder
def fetchNames():
    # fetch files
    files = [file for file in os.listdir() if os.path.isfile(file)]
    # Filter to only images
    files = [file for file in files if ((".png" in file) or (".jpg" in file))]
    # and return
    return files

# fetch the size of each image
def reSize(imgs):
    # itterate over each image
    for img in imgs:
        # Split the new name so it can be used later
        name = img.split(".")
        # Fetch the image
        im = Image.open(img)
        # Fetch it's size
        w, h = im.size
        # fetch the resizing widths
        size = [x for x in [480, 800, 1400, 1920] if x < w]
        # Resize
        for _w in size:
            # Compute new height
            _h = int(h * _w / w)
            # Resize
            im_resize = im.resize((_w, _h), Image.LANCZOS)
            # Compute the new name
            newname = name[0] + "-" + str(_w) + "x" + str(_h) + "." + name[1]
            # And save
            im_resize.save("../resized/"+newname)

# Fetch images and resize them
reSize(fetchNames())
