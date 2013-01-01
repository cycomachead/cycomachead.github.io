"""
Given a DIR set YAML front matter date based on file name.
Name format is: 2011-11-27-13194568920.md (or html; change the strip below)
(Which is from the jekyll tumblr importer)
"""

import sys, os, re

files_dir = ''
files = []

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
    # Read contents from file as a single string
    # Return the post title as a hyphenated string
    file_handle = open(file, 'r')
    file_string = file_handle.read()
    file_handle.close()
    title = re.compile("title: (.*)")
    try:
        return re.search(title, file_string).group(1)
    except:
        print("No title found")
        return



def name():
    os.chdir(files_dir)
    print(os.getcwd())
    for file in files:
        print(file)
        if re.match('.*\.md$', file):
            # 2011-11-27-13194568920.md
            # PASS 1 (Commented)
            # title = read(file)
            # title = re.sub("\\s", "-", title)
            # new_name = file[:11] + title + ".md"
            # Pass 2 Fix ugly chars.
            # new_name = re.sub("…|!|'|\?|the|The", "", file)
            # Pass 3 fix -- and also "a"
            new_name = re.sub(".*\\-A\\-.*", "-", file)
            new_name = re.sub("--", "-", file)
            os.rename(file, new_name)


if __name__ == '__main__':
    setup()
    name()