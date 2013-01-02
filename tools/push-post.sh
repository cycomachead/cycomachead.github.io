# do the work to actually push a post to gh.

cd ~/Dropbox/Projects/Website
jekyll
git add *
git commit -a -m "Added new post"
git push
cp -r _site/* ../michaelballphoto.com/
cd ../michaelballphoto.com
git add *
git commit -a -m "Added new post to complied repo"
git push