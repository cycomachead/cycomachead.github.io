"""
Given a DIR, search for FIND in each file and replace it with REPLACE:
"""

import sys, fileinput, glob, os, re
from os.path import join

files_dir = ''
inp_str = ''
out_str = ''
files = []

def setup():
    global files_dir, rep_str, out_str, files
    try:
        files_dir = sys.argv[1]
        rep_str = sys.argv[2]
        out_str = open(sys.argv[3], 'r').read()
        files = os.listdir(files_dir)
    except IndexError:
        print("Usage: FILE FIND REPLACE")
        exit()

def replace(file, pattern, subst):
    # Read contents from file as a single string
    file_handle = open(file, 'r')
    file_string = file_handle.read()
    file_handle.close()

    # Use RE package to allow for replacement (also allowing for (multiline) REGEX)
    file_string = (re.sub(pattern, subst, file_string))

    # Write contents to file.
    # Using mode 'w' truncates the file.
    file_handle = open(file, 'w')
    file_handle.write(file_string)
    file_handle.close()

if __name__ == '__main__':
    setup()
    print(out_str, "\n")
    os.chdir(files_dir)
    print(os.getcwd(), "\n")
    rep_str = "flickrurl: FLICKRURL"
    for file in files:
        if not re.match('^\..*|\.py$', file):
            print(file)
            replace(file, rep_str, out_str)
