# do the work to actually push a post to gh.

cd ~/Dropbox/Projects/michaelballphoto.com
git checkout source
git add *
gca -m "Added new post"
gp
git checkout gh-pages
mv -r _site/* .
gca -m "Added new post to complied branch"
gp
git checkout source