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
    # fetch all files, looping through subfolders
    files = nested_to_linear([[(root+"/").replace(os.getcwd()+"/", "")+f for f in file] \
                                for root, dir, file in os.walk(os.getcwd())])
    # Filter to only images
    files = [file for file in files if contains(file, ".png", ".jpg", ".svg", ".gif")]
    print("found {} files".format(len(files)), files, sep="\n")
    # and return
    return files

# check that we have a folder to save the image into
def checkFolder(dir):
    # if it exists, we're good
    if os.path.exists(dir):
        return True
    # otherwise, fetch all the directory components
    dirsplit = dir.split("/")
    # loop over them
    for x in range(1, len(dirsplit)):
        # get this directory
        thisfolder = "/".join(dirsplit[:x])
        # check if it exists
        if os.path.exists(thisfolder):
            continue
        # otherwise, create it
        os.mkdir(thisfolder)

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
        try:
            h, w = tonum(search(m, "height", "width"))
        except:
            h, w = 200, 200
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
    # ensure we have the resized folder
    if not os.path.exists("../resized/"):
        os.mkdir("../resized/")
    svg = []
    # itterate over each image
    for img in imgs:
        # don't work on svg's yet
        if ".svg" in img:
            svg.append(img)
            continue
        print("Resizing {}".format(img), end=", ")
        # Split the new name so it can be used later
        name = img.split(".")
        # Fetch the image
        im = Image.open(img)
        # Fetch it's size
        w, h = im.size
        # fetch the resizing widths
        size = [x for x in [480, 800, 1400, 1920] if x < w]
        print("to sizes", size, end=", ")
        # Resize
        for _w in size:
            # Compute new height
            _h = int(h * _w / w)
            # Resize
            im_resize = im.resize((_w, _h), Image.LANCZOS)
            # Compute the new name
            newname = name[0] + "-" + str(_w) + "x" + str(_h) + "." + name[1]
            # check we have the folder to save into
            checkFolder("../resized/"+".".join(name))
            # And save
            im_resize.save("../resized/"+newname)
        print("Complete")
    #do the final work on the svg images
    reName(svg)

# Fetch images and resize them
reSize(fetchNames())
