"""
Given a DIR set YAML front matter date based on file name.
Name format is: 2011-11-27-13194568920.md (or html; change the strip below)
(Which is from the jekyll tumblr importer)
"""

import sys, os, re

files_dir = ''
files = []
file_handle = ''
file_string = []

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
    file_string = file_handle.readlines()
    file_handle.close()

def write(file):
    global file_handle, file_string
    # Write contents to file.
    # Using mode 'w' truncates the file.
    file_string = "".join(file_string)
    file_handle = open(file, 'w')
    file_handle.write(file_string)
    file_handle.close()


def date():
    global file_string
    os.chdir(files_dir)
    print(os.getcwd())
    for file in files:
        print(file)
        if re.match('.*\.md$', file):
            # 2011-11-27-13194568920.md
            read(file)
            time = file.strip(".md")
            date = "date: " + time[:10] + " " + time[11:13] + ":"
            date += time[13:15] + ":00\n"
            file_string[5:5] = date
            write(file)

if __name__ == '__main__':
    setup()
    date()