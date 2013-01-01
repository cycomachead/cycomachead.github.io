# do the work to actually push a post to gh.

cd ~/Dropbox/Projects/michaelballphoto.com
git checkout source
jekyll
git add *
git commit -a -m "Added new post"
git push
git checkout gh-pages
mv -r _site/* .
git commit -a -m "Added new post to complied branch"
git push
git checkout source