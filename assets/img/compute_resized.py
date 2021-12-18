# fetch modules
from PIL import Image
import os

# search for any object within a string
def contains(string, *args, search_and=False):
    # search for the strings in the main string
    search = [(arg in string) for arg in args]
    # if we only want to return when all are present
    if search_and:
        # then return false is False is within the serahc
        return not (False in search)
    # otherwise, return if any is true
    return True in search

# search for a set of attributes in an xml file
def search(xml, *args):
    # split at the location of the argument, and then return whatever is within the quotations
    return [xml.split(arg)[1].split('"')[1] for arg in args]

# convert a nested list to a single list
def nested_to_linear(lis):
    out = []
    for x in lis:
        if isinstance(x, list):
            for y in nested_to_linear(x):
                out.append(y)
            continue
        out.append(x)
    return out

# convert a list of strings to only numeric
def tonum(*args):
    return [float("".join((x for x in string if (x.isdigit() or (x=="."))))) for string in nested_to_linear(args)]

# compile a list of images in this folder
def fetchNames():
    # fetch files
    files = [file for file in os.listdir() if os.path.isfile(file)]
    # Filter to only images
    files = [file for file in files if contains(file, ".png", ".jpg", ".svg")]
    # and return
    return files

# rename svg's so they work
def reName(imgs):
    # itterate over each image
    for img in imgs:
        # Split the new name so it can be used later
        name = img.split(".")
        # fetch the file details
        with open(img, "r") as file:
            m = file.read()
        # and read the dimensions
        h, w = tonum(search(m, "height", "width"))
        # list of sizes
        size = [480, 800, 1400]
        # itterate over the sizes
        for _w in size:
            # compute new height
            _h = int(h * _w / w)
            # Compute the new name
            newname = name[0] + "-" + str(_w) + "x" + str(_h) + "." + name[1]
            # and save as new
            os.popen("cp "+img+" ../resized/"+newname)

# fetch the size of each image and resize to our format
def reSize(imgs):
    svg = []
    # itterate over each image
    for img in imgs:
        # don't work on svg's yet
        if ".svg" in img:
            svg.append(img)
            continue
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
    #do the final work on the svg images
    reName(svg)

# Fetch images and resize them
reSize(fetchNames())
