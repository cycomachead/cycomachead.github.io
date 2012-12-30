"""
Given a DIR set flickr values for photos.
"""

import sys, os, re

files_dir = ''
files = []
file_handle = ''
file_string = ''

sys.path.append('/Volumes/Macintosh HD/Users/Michael/Dropbox/Projects/FlickrTools')

try:
    from PhotoInfo import Photo
except ImportError as e:
    print("PhotoInfo script is required and cannot be found")
    print(sys.path)
    exit()

def setup():
    global files_dir, files
    try:
        files_dir = sys.argv[1]
        files = os.listdir(files_dir)
    except IndexError as e:
        print("Usage: FILE")
        print(e)
        exit()

def read(file):
    global file_handle, file_string
    # Read contents from file as a single string
    file_handle = open(file, 'r')
    file_string = file_handle.read()
    file_handle.close()
    pid_pat = re.compile("pid: ([0-9]{10})")
    try:
        return re.search(pid_pat, file_string).group(1)
    except:
        print("No PID found")
        return

def write(file):
    global file_handle, file_string
    # Write contents to file.
    # Using mode 'w' truncates the file.
    file_handle = open(file, 'w')
    file_handle.write(file_string)
    file_handle.close()


FARM = 'FARM'
SERVER = 'SERVER'
SECRET = 'SECRET'
TAGS = 'TAGS'

def replace_vals():
    global file_string
    os.chdir(files_dir)
    print(os.getcwd())
    for file in files:
        print(file)
        if not re.match('^\..*|\.py$', file):
            pid = read(file)
            if pid:
                img = Photo(pid)
                result = img.url_vals()
                tags = "[" + img.tags_as_string() + "]"
                file_string = (re.sub(TAGS, tags, file_string))
                file_string = (re.sub(FARM, result[0], file_string))
                file_string = (re.sub(SERVER, result[1], file_string))
                file_string = (re.sub(SECRET, result[2], file_string))
                write(file)

if __name__ == '__main__':
    setup()
    replace_vals()